import React, { useState, useEffect } from "react";
import { Container, Form, Button, Alert, FloatingLabel, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UpdateProfile = () => {
    const navigate = useNavigate();
    const firebaseApiKey = import.meta.env.VITE_FIREBASE_API_KEY;
    const [profile, setProfile] = useState({
        displayName: "",
        email: "",
        photoUrl: "",
        emailVerified: false,
    });
    const [updatedProfile, setUpdatedProfile] = useState(profile);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const userIdToken = localStorage.getItem("token");

    // Fetch user data on mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(
                    `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebaseApiKey}`,
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            idToken: userIdToken,
                        }),
                    }
                );
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error?.message || "Failed to fetch user data.");
                }
                const userData = data.users[0];
                setProfile({
                    displayName: userData.displayName || "",
                    email: userData.email || "",
                    photoUrl: userData.photoUrl || "",
                    emailVerified: userData.emailVerified || false,
                });
                setUpdatedProfile({
                    displayName: userData.displayName || "",
                    photoUrl: userData.photoUrl || "",
                    email: userData.email || "",
                });
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, [userIdToken, firebaseApiKey]);

    // Handle form submission
    const handleUpdate = async (e) => {
        e.preventDefault();

        // Validation
        if (
            !updatedProfile.displayName.trim() ||
            !updatedProfile.photoUrl.trim() ||
            !updatedProfile.email.trim()
        ) {
            setError("All fields are required.");
            return;
        }

        // Check if profile is actually updated
        if (
            profile.displayName === updatedProfile.displayName &&
            profile.email === updatedProfile.email &&
            profile.photoUrl === updatedProfile.photoUrl
        ) {
            setError("No changes detected.");
            return;
        }

        try {
            setIsLoading(true);
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebaseApiKey}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        idToken: userIdToken,
                        displayName: updatedProfile.displayName,
                        photoUrl: updatedProfile.photoUrl,
                        returnSecureToken: true,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || "Failed to update profile.");
            }
            setProfile(updatedProfile);
            navigate("/"); // Redirect to home page after successful update
            alert("Profile updated successfully!");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    // Send email verification
    const sendEmailVerification = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(
                `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${firebaseApiKey}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        requestType: "VERIFY_EMAIL",
                        idToken: userIdToken,
                    }),
                }
            );
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.error?.message || "Failed to send verification email.");
            }
            toast("Verification email sent!");
        } catch (error) {
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    return (
        <Container className="mt-4">
            <h2>Update Profile</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleUpdate}>
                <Row>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="displayName">
                            <FloatingLabel label="Name" className="mb-3">
                                <Form.Control
                                    type="text"
                                    name="displayName"
                                    value={updatedProfile.displayName}
                                    onChange={handleChange}
                                    placeholder="Enter your name"
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col xs={12} md={6}>
                        <Form.Group controlId="photoUrl">
                            <FloatingLabel label="Photo URL" className="mb-3">
                                <Form.Control
                                    type="url"
                                    name="photoUrl"
                                    value={updatedProfile.photoUrl}
                                    onChange={handleChange}
                                    placeholder="Enter your photo URL"
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Form.Group controlId="email">
                            <FloatingLabel
                                controlId="floatingInput"
                                label="Email address"
                                className="mb-3"
                            >
                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={updatedProfile.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    disabled
                                />
                            </FloatingLabel>
                        </Form.Group>
                    </Col>
                    <Col className="d-flex align-items-center">
                        {profile.emailVerified ? (
                            <small className="text-success">Email Verified</small>
                        ) : (
                            <Button
                                variant="warning"
                                size="sm"
                                className="mt-2"
                                onClick={sendEmailVerification}
                                disabled={isLoading}
                            >
                                Verify Email
                            </Button>
                        )}
                    </Col>
                </Row>

                <Button variant="primary" type="submit" className="mt-3" disabled={isLoading}>
                    {isLoading ? "Updating..." : "Update Profile"}
                </Button>
            </Form>
        </Container>
    );
};

export default UpdateProfile;
