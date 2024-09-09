import React, { createContext, useState } from 'react';

// Create a Context
const ExpenseContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    editItem: (id, updatedItem) => { }
});

// Create a Provider component
const ExpenseProvider = ({ children }) => {
    const [items, setItems] = useState([]);

    const addItem = (item) => {
        setItems((prevItems) => [...prevItems, item]);
    };

    const removeItem = (id) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    const editItem = (id, updatedItem) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === id ? updatedItem : item))
        );
    };

    return (
        <ExpenseContext.Provider
            value={{ items, addItem, removeItem, editItem }}
        >
            {children}
        </ExpenseContext.Provider>
    );
};

export { ExpenseProvider, ExpenseContext };
