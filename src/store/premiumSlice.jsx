import { createSlice } from '@reduxjs/toolkit';

// Retrieve the initial state from localStorage or default to false
const initialState = {
    isPremium: localStorage.getItem('isPremium') === 'true',
};

const premiumSlice = createSlice({
    name: 'premium',
    initialState,
    reducers: {
        setPremiumStatus(state, action) {
            state.isPremium = action.payload;
            localStorage.setItem('isPremium', action.payload);
        },
        clearPremiumStatus(state) {
            state.isPremium = false;
            localStorage.removeItem('isPremium');
        },
    },
});

export const { setPremiumStatus, clearPremiumStatus } = premiumSlice.actions;
export default premiumSlice.reducer;
