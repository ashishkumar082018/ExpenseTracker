import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';
import expirationMiddleware from './expirationMiddleware';
import themeReducer from './themeSlice';
import premiumReducer from './premiumSlice';

export const store = configureStore({
    reducer: { authState: authReducer, expense: expenseReducer, theme: themeReducer, premium: premiumReducer, },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(expirationMiddleware),
});