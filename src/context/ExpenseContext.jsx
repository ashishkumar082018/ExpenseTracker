import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthContext from './AuthContext'; // Assuming you have an AuthContext

const ExpenseContext = createContext({
    items: [],
    addItem: (item) => { },
    removeItem: (id) => { },
    editItem: (id, updatedItem) => { },
    fetchExpenses: () => { }
});

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const ExpenseProvider = ({ children }) => {
    const { userId } = useContext(AuthContext); // Get user ID from AuthContext
    const [items, setItems] = useState([]);

    useEffect(() => {
        async function fetchExpenses() {
            if (!userId) return; // Exit if no user ID
            try {
                const response = await fetch(`${API_ENDPOINT}/${userId}/expenses.json`);
                const data = await response.json();

                if (response.ok) {
                    const fetchedData = [];
                    for (const key in data) {
                        fetchedData.push({
                            id: key,
                            amount: data[key].amount,
                            description: data[key].description,
                            category: data[key].category,
                        });
                    }
                    setItems(fetchedData);
                } else {
                    throw new Error('Failed to fetch expenses.');
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        fetchExpenses();
    }, [userId]); // Re-run when userId changes

    const addItem = async (item) => {
        if (!userId) return; // Exit if no user ID
        try {
            const response = await fetch(`${API_ENDPOINT}/${userId}/expenses.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(item),
            });
            const data = await response.json();
            if (response.ok) {
                setItems((prevItems) => [...prevItems, { id: data.name, ...item }]);
            } else {
                throw new Error('Failed to add expense.');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const removeItem = async (id) => {
        if (!userId) return; // Exit if no user ID
        try {
            const response = await fetch(`${API_ENDPOINT}/${userId}/expenses/${id}.json`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setItems((prevItems) => prevItems.filter((item) => item.id !== id));
            } else {
                throw new Error('Failed to remove expense.');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    const editItem = async (id, updatedItem) => {
        if (!userId) return; // Exit if no user ID
        try {
            const response = await fetch(`${API_ENDPOINT}/${userId}/expenses/${id}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedItem),
            });
            if (response.ok) {
                setItems((prevItems) =>
                    prevItems.map((item) => (item.id === id ? { ...item, ...updatedItem } : item))
                );
            } else {
                throw new Error('Failed to update expense.');
            }
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <ExpenseContext.Provider value={{ items, addItem, removeItem, editItem }}>
            {children}
        </ExpenseContext.Provider>
    );
};

export { ExpenseProvider, ExpenseContext };
