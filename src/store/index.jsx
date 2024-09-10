import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import expenseReducer from './expenseSlice';
import expirationMiddleware from './expirationMiddleware';

export const store = configureStore({
    reducer: { authState: authReducer, expense: expenseReducer },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(expirationMiddleware),
});