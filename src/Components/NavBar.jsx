import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const NavBar = () => {
    const authCtx = useContext(AuthContext);

    const buttonHandler = () => {
        authCtx.logout();
        toast("Logout successful");
    };

    const linkStyle = ({ isActive }) => ({
        color: isActive ? '#00bfff' : '#f8f9fa',
        textDecoration: 'none',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
        transition: 'color 0.3s ease, background-color 0.3s ease',
        fontWeight: 'bold'
    });

    const linkHoverStyle = ({ isActive }) => ({
        backgroundColor: isActive ? '#0056b3' : 'transparent',
        color: isActive ? '#ffffff' : '#f8f9fa'
    });

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                    Expense Tracker
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {!authCtx.isLoggedIn && (
                            <>
                                <Nav.Link as={NavLink} to="/login" style={linkStyle} className="nav-link" end>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/signup" style={linkStyle} className="nav-link">
                                    Sign Up
                                </Nav.Link>
                            </>
                        )}

                        {authCtx.isLoggedIn && (
                            <>
                                <Nav.Link as={NavLink} to="/dashboard" style={linkStyle} className="nav-link">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/profile" style={linkStyle} className="nav-link">
                                    Profile
                                </Nav.Link>
                                <Button
                                    variant="outline-light"
                                    onClick={buttonHandler}
                                    style={{
                                        marginLeft: '1rem',
                                        borderRadius: '0.25rem',
                                        padding: '0.5rem 1rem',
                                        fontWeight: 'bold'
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
