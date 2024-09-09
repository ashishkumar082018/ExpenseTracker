import React, { useState, useContext } from "react";
import { Form, Button, Row, Col, FloatingLabel, Container } from "react-bootstrap";
import { ExpenseContext } from "../../context/ExpenseContext";

const ExpenseForm = () => {
    const [amount, setAmount] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");

    const { addItem } = useContext(ExpenseContext);

    const handleSubmit = (e) => {
        e.preventDefault();
        const newItem = {
            id: Date.now().toString(),
            amount,
            description,
            category,
        };
        addItem(newItem);
        setAmount("");
        setDescription("");
        setCategory("Food");
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