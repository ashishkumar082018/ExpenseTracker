// expenseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
    name: 'expense',
    initialState: {
        expenses: [],
        totalExpenseAmount: 0,
    },
    reducers: {
        fetchedExpense(state, action) {
            state.expenses = action.payload.fetchedData;
            state.totalExpenseAmount = action.payload.totalExpenseAmount;
        },
        addExpense(state, action) {
            state.expenses.push(action.payload);
            state.totalExpenseAmount += action.payload.amount;
        },
        editExpense(state, action) {
            const index = state.expenses.findIndex(exp => exp.id === action.payload.id);
            if (index !== -1) {
                state.totalExpenseAmount -= state.expenses[index].amount;
                state.expenses[index] = action.payload;
                state.totalExpenseAmount += action.payload.amount;
            }
        },
        deleteExpense(state, action) {
            const { delId, amount } = action.payload;
            state.expenses = state.expenses.filter(exp => exp.id !== delId);
            state.totalExpenseAmount -= amount;
        },
    },
});

export const { fetchedExpense, addExpense, editExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
