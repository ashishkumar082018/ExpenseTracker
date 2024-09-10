import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { toast } from 'react-toastify';
import { setPremiumStatus } from '../store/premiumSlice';
import { toggleTheme } from '../store/themeSlice';
import { downloadCSV } from '../utils/downloadCSV'; // Import the utility function

const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        const storedPremiumStatus = localStorage.getItem('isPremium') === 'true';
        setIsPremium(storedPremiumStatus);
        dispatch(setPremiumStatus(storedPremiumStatus));
    }, [dispatch]);

    const isLoggedIn = useSelector((state) => state.authState.isLoggedIn);
    const totalExpenseAmount = useSelector((state) => state.expense.totalExpenseAmount);
    const premiumStatus = useSelector((state) => state.premium.isPremium);
    const expenses = useSelector((state) => state.expense.expenses); 

    const buttonHandler = () => {
        dispatch(logout());
        localStorage.removeItem('expirationTime');
        toast("Logout successful");
        navigate("/login");
    };

    const activatePremium = () => {
        setTimeout(() => {
            toast("You are a premium user now!");
            localStorage.setItem('isPremium', 'true');
            dispatch(setPremiumStatus(true));
            setIsPremium(true);
        }, 1000);
    };

    const handleThemeToggle = () => {
        dispatch(toggleTheme());
    };

    const handleDownload = () => {
        downloadCSV(expenses);
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

                                {!premiumStatus && totalExpenseAmount > 10000 && (
                                    <Button
                                        variant="warning"
                                        style={{
                                            marginLeft: '1rem',
                                            borderRadius: '0.25rem',
                                            padding: '0.5rem 1rem',
                                            fontWeight: 'bold'
                                        }}
                                        onClick={activatePremium}
                                    >
                                        Activate Premium
                                    </Button>
                                )}

                                {premiumStatus && (
                                    <>
                                        <span
                                            style={{
                                                marginLeft: '1rem',
                                                color: 'gold',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            You are a premium user
                                        </span>
                                        <Button
                                            variant="outline-light"
                                            onClick={handleThemeToggle}
                                            style={{
                                                marginLeft: '1rem',
                                                borderRadius: '0.25rem',
                                                padding: '0.5rem 1rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Toggle Theme
                                        </Button>
                                        <Button
                                            variant="outline-light"
                                            onClick={handleDownload}
                                            style={{
                                                marginLeft: '1rem',
                                                borderRadius: '0.25rem',
                                                padding: '0.5rem 1rem',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            Download CSV
                                        </Button>
                                    </>
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
