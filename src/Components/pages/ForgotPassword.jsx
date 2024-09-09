import React, { useState } from "react";
import { Form, Button, Alert, Container, FloatingLabel } from "react-bootstrap";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);
    const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;

    const handleResetPassword = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);
        setError(null);

        try {
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestType: "PASSWORD_RESET",
                        email: email,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                let newError = "Failed to send password reset email.";
                if (data && data.error && data.error.message) {
                    newError = data.error.message;
                }
                throw new Error(newError);
            }

            // Show toast for success
            toast.success("Password reset link has been sent to your email. Please check your inbox.");
            setMessage("Password reset link sent.");
            setEmail(""); // Clear the email field
        } catch (error) {
            // Show toast for error
            toast.error(error.message || "Failed to send password reset email.");
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <div>
                    <h2>Forgot Password</h2>
                    {message && <Alert variant="success">{message}</Alert>}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleResetPassword}>
                        <Form.Group controlId="email">
                            <FloatingLabel label="Email address" className="mb-3">
                                <Form.Control
                                    type="email"
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </FloatingLabel>
                        </Form.Group>

                        <Button variant="primary" type="submit" disabled={isLoading}>
                            {isLoading ? "Sending..." : "Send Password Reset Link"}
                        </Button>
                    </Form>
                </div>
            </Container>
        </>
    );
};

export default ForgotPassword;
