import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
    const linkStyle = ({ isActive }) => ({ color: isActive ? 'lightblue' : 'white' });

    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Expense Tracker</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/login" style={linkStyle}>Login</Nav.Link>
                        <Nav.Link as={NavLink} to="/signup" style={linkStyle}>SignUp</Nav.Link>
                        <Nav.Link as={NavLink} to="/dashboard" style={linkStyle}>Dashboard</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;
