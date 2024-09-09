import React, { useContext, useState } from "react";
import { Table, Button, Form, Container } from "react-bootstrap";
import { ExpenseContext } from "../../context/ExpenseContext";

const Expenses = () => {
    const { items, removeItem, editItem } = useContext(ExpenseContext);
    const [editId, setEditId] = useState(null);
    const [editData, setEditData] = useState({
        amount: "",
        description: "",
        category: "Food",
    });

    const handleEdit = (id) => {
        const item = items.find((item) => item.id === id);
        setEditId(id);
        setEditData(item);
    };

    const handleSave = () => {
        editItem(editId, { ...editData, id: editId });
        setEditId(null);
    };

    return (
        <Container className="mt-4">
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
                    {items.map((item) =>
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
                                    </Button>{" "}
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={() => removeItem(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        )
                    )}
                </tbody>
            </Table>
        </Container>
    );
};

export default Expenses;