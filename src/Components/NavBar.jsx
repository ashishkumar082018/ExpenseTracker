import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { toast } from 'react-toastify';

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get login state and total expense amount from Redux
    const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
    const totalExpenseAmount = useSelector((state) => state.expense.totalExpenseAmount);

    const buttonHandler = () => {
        dispatch(logout());
        localStorage.removeItem('expirationTime');
        toast("Logout successful");
        navigate("/login");
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
                        {!isLoggedIn && (
                            <>
                                <Nav.Link as={NavLink} to="/login" style={linkStyle} className="nav-link" end>
                                    Login
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/signup" style={linkStyle} className="nav-link">
                                    Sign Up
                                </Nav.Link>
                            </>
                        )}

                        {isLoggedIn && (
                            <>
                                <Nav.Link as={NavLink} to="/dashboard" style={(props) => ({ ...linkStyle(props), ...linkHoverStyle(props) })} className="nav-link">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/profile" style={(props) => ({ ...linkStyle(props), ...linkHoverStyle(props) })} className="nav-link">
                                    Profile
                                </Nav.Link>

                                {/* Show Activate Premium button if total expenses exceed ₹10,000 */}
                                {totalExpenseAmount > 10000 && (
                                    <Button
                                        variant="warning"
                                        style={{
                                            marginLeft: '1rem',
                                            borderRadius: '0.25rem',
                                            padding: '0.5rem 1rem',
                                            fontWeight: 'bold'
                                        }}
                                        // onClick={() => toast("Premium activated")}
                                    >
                                        Activate Premium
                                    </Button>
                                )}

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
