import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { toast } from 'react-toastify';

const NavBar = () => {
    const authCtx = useContext(AuthContext);

    const buttonHandler = () => {
        authCtx.logout();
        toast("Logout successful");
    };

    const linkStyle = ({ isActive }) => ({ color: isActive ? 'lightblue' : 'white' });

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Expense Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {!authCtx.isLoggedIn && <>
                            <Nav.Link as={NavLink} to="/login" style={linkStyle}>Login</Nav.Link>
                            <Nav.Link as={NavLink} to="/signup" style={linkStyle}>Sign Up</Nav.Link>
                        </>}

                        {authCtx.isLoggedIn && (
                            <>
                                <Nav.Link as={NavLink} to="/dashboard" style={linkStyle}>Dashboard</Nav.Link>
                                <Button variant="outline-light" onClick={buttonHandler}>Logout</Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
