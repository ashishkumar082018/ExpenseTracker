import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: localStorage.getItem('token') || null,
    email: localStorage.getItem('email') || '',
    userId: localStorage.getItem('userId') || '',
    isLoggedIn: !!localStorage.getItem('token'),
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCredentials(state, action) {
            const { token, email, userId } = action.payload;
            localStorage.setItem('token', token);
            localStorage.setItem('email', email);
            localStorage.setItem('userId', userId);
            state.token = token;
            state.email = email;
            state.userId = userId; 
            state.isLoggedIn = true;
        },
        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('email');
            localStorage.removeItem('userId');
            state.token = null;
            state.email = '';
            state.userId = ''; 
            state.isLoggedIn = false;
        },
    },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
