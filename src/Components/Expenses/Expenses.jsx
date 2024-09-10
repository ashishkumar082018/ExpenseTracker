import React, { useState, useEffect } from "react";
import { Table, Button, Form, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deleteExpense, editExpense, fetchedExpense, addExpense } from "../../store/expenseSlice";
import { toast } from "react-toastify";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

const Expenses = () => {
    const dispatch = useDispatch();
    const expenses = useSelector((state) => state.expense.expenses) || [];
    const userId = useSelector((state) => state.authState.userId);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({
        amount: "",
        description: "",
        category: "Food",
    });

    useEffect(() => {
        const fetchExpenses = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/expenses.json`);
                const data = await response.json();

                if (response.ok) {
                    const fetchedData = Object.entries(data)
                        .filter(([key, value]) => value.userId === userId)
                        .map(([key, value]) => ({
                            id: key,
                            ...value
                        }));

                    dispatch(fetchedExpense({
                        fetchedData,
                        totalExpenseAmount: fetchedData.reduce((acc, curr) => acc + parseFloat(curr.amount || 0), 0)
                    }));
                } else {
                    throw new Error('Failed to fetch expenses.');
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchExpenses();
    }, [dispatch, userId]);

    const handleEdit = (id) => {
        const item = expenses.find((item) => item.id === id);
        setEditId(id);
        setEditData(item);
    };

    const handleSave = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/expenses/${editId}.json`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...editData, amount: parseFloat(editData.amount) }),
            });
            if (response.ok) {
                dispatch(editExpense({ ...editData, id: editId }));
                setEditId(null);
                setEditData({ amount: "", description: "", category: "Food" });
                toast.success('Expense updated successfully');
            } else {
                throw new Error('Failed to update expense.');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDelete = async (id, amount) => {
        try {
            const response = await fetch(`${API_ENDPOINT}/expenses/${id}.json`, {
                method: 'DELETE',
            });
            if (response.ok) {
                dispatch(deleteExpense({ delId: id, amount }));
                toast.success('Expense deleted successfully');
            } else {
                throw new Error('Failed to delete expense.');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleAdd = async () => {
        try {
            const response = await fetch(`${API_ENDPOINT}/expenses.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...editData, amount: parseFloat(editData.amount), userId }),
            });
            const data = await response.json();
            if (response.ok) {
                dispatch(addExpense({ id: data.name, ...editData }));
                setEditData({ amount: "", description: "", category: "Food" });
                toast.success('Expense added successfully');
            } else {
                throw new Error('Failed to add expense.');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Container className="mt-4">
            {expenses.length === 0 ? (
                <div className="text-center">
                    <h5>No expenses found. Please add something.</h5>
                </div>
            ) : (
                <Table responsive bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((item) =>
                            editId === item.id ? (
                                <tr key={item.id}>
                                    <td>
                                        <Form.Control
                                            type="number"
                                            value={editData.amount}
                                            onChange={(e) =>
                                                setEditData((prev) => ({
                                                    ...prev,
                                                    amount: e.target.value,
                                                }))
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Form.Control
                                            type="text"
                                            value={editData.description}
                                            onChange={(e) =>
                                                setEditData((prev) => ({
                                                    ...prev,
                                                    description: e.target.value,
                                                }))
                                            }
                                        />
                                    </td>
                                    <td>
                                        <Form.Select
                                            value={editData.category}
                                            onChange={(e) =>
                                                setEditData((prev) => ({
                                                    ...prev,
                                                    category: e.target.value,
                                                }))
                                            }
                                        >
                                            <option value="Food">Food</option>
                                            <option value="Fuel">Fuel</option>
                                            <option value="Entertainment">Entertainment</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </td>
                                    <td>
                                        <Button size="sm" variant="success" onClick={handleSave}>
                                            Save
                                        </Button>
                                    </td>
                                </tr>
                            ) : (
                                <tr key={item.id}>
                                    <td>{item.amount}</td>
                                    <td>{item.description}</td>
                                    <td>{item.category}</td>
                                    <td>
                                        <Button
                                            size="sm"
                                            variant="info"
                                            onClick={() => handleEdit(item.id)}
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="danger"
                                            onClick={() => handleDelete(item.id, item.amount)}
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            )
                        )}
                    </tbody>
                </Table>
            )}
        </Container>
    );
};

export default Expenses;
