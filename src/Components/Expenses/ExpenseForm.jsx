import React, { useState } from "react";
import { Form, Button, Row, Col, FloatingLabel, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addExpense } from "../../store/expenseSlice";
import { toast } from "react-toastify";

const ExpenseForm = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Food");

    const dispatch = useDispatch();
    const userId = useSelector((state) => state.authState.userId);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newItem = {
            amount: parseFloat(amount),
            description,
            category,
            userId,
        };

        try {
            const response = await fetch(`${import.meta.env.VITE_API_ENDPOINT}/expenses.json`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newItem),
            });
            const data = await response.json();

            if (response.ok) {
                dispatch(addExpense({ id: data.name, ...newItem }));
                toast.success('Expense added successfully');
                setAmount("");
                setDescription("");
                setCategory("Food");
            } else {
                throw new Error('Failed to add expense.');
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <Container className="mt-4">
            <h3 className="text-center mt-5 mb-5">Add/Manage Your Expenses</h3>
            <Form onSubmit={handleSubmit} className="mb-4">
                <Row className="g-3">
                    <Col md>
                        <FloatingLabel controlId="floatingAmount" label="Amount">
                            <Form.Control
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingDescription" label="Description">
                            <Form.Control
                                type="text"
                                placeholder="Enter description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </FloatingLabel>
                    </Col>
                    <Col md>
                        <FloatingLabel controlId="floatingCategory" label="Category">
                            <Form.Select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                <option value="Food">Food</option>
                                <option value="Fuel">Fuel</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                        </FloatingLabel>
                    </Col>
                    <Col md="auto">
                        <Button variant="primary" type="submit" size="lg">
                            Add
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default ExpenseForm;
