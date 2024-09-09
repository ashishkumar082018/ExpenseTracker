import React, { createContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    const storedEmail = localStorage.getItem('email');
    const storedDisplayName = localStorage.getItem('displayName') || '';
    const storedPhotoUrl = localStorage.getItem('photoUrl') || '';

    const calculateRemainingTime = (expirationTime) => {
        const currentTime = new Date().getTime();
        const adjustedExpirationTime = new Date(expirationTime).getTime();
        const remainingDuration = adjustedExpirationTime - currentTime;
        return remainingDuration;
    };

    const initialRemainingTime = storedExpirationDate
        ? calculateRemainingTime(storedExpirationDate)
        : 0;

    const [token, setToken] = useState(initialRemainingTime > 0 ? storedToken : null);
    const [email, setEmail] = useState(storedEmail || ''); // Define email state
    const [displayName, setDisplayName] = useState(storedDisplayName); // Define displayName state
    const [photoUrl, setPhotoUrl] = useState(storedPhotoUrl); // Define photoUrl state
    const [isProfileUpdated, setIsProfileUpdated] = useState(false);

    const navigate = useNavigate();
    const userIsLoggedIn = !!token;

    // Logout Handler
    const logoutHandler = useCallback(() => {
        setToken(null);
        setEmail('');
        setDisplayName('');
        setPhotoUrl('');
        localStorage.removeItem('token');
        localStorage.removeItem('expirationTime');
        localStorage.removeItem('email');
        localStorage.removeItem('displayName');
        localStorage.removeItem('photoUrl');
        navigate('/login');
    }, [navigate]);

    useEffect(() => {
        if (initialRemainingTime <= 60000) {
            logoutHandler();
        } else {
            const logoutTimer = setTimeout(logoutHandler, initialRemainingTime);
            return () => clearTimeout(logoutTimer);
        }
    }, [logoutHandler, initialRemainingTime]);

    //Login Handler

    const loginHandler = async (email, password) => {
        const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error.message || 'Authentication failed');
            }

            const data = await response.json();
            const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000).toISOString();
            setToken(data.idToken);
            setEmail(data.email);
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('email', data.email);

            // Fetch user profile data
            const userDataResponse = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: data.idToken
                })
            });

            const userData = await userDataResponse.json();
            if (!userDataResponse.ok) {
                throw new Error(userData.error.message || 'Failed to fetch user data');
            }

            const user = userData.users[0];
            setDisplayName(user.displayName || '');
            setPhotoUrl(user.photoUrl || '');
            localStorage.setItem('displayName', user.displayName || '');
            localStorage.setItem('photoUrl', user.photoUrl || '');
            setIsProfileUpdated(true);

            const remainingDuration = calculateRemainingTime(expirationTime);
            setTimeout(logoutHandler, remainingDuration);

            toast.success('Login successful');
        } catch (err) {
            toast.error(err.message);
        }
    };

    //Signup Handler
    const signupHandler = async (email, password) => {
        const apiKey = import.meta.env.VITE_FIREBASE_API_KEY;
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${apiKey}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true
                })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error.message || 'Signup failed');
            }

            const data = await response.json();
            const expirationTime = new Date(new Date().getTime() + +data.expiresIn * 1000).toISOString();
            setToken(data.idToken);
            setEmail(data.email);
            localStorage.setItem('token', data.idToken);
            localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('email', data.email);

            const remainingDuration = calculateRemainingTime(expirationTime);
            setTimeout(logoutHandler, remainingDuration);

            toast.success('Signup successful');
        } catch (err) {
            toast.error(err.message);
        }
    };

    const contextValue = {
        token,
        email,
        displayName,
        photoUrl,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
        signup: signupHandler,
        isProfileUpdated: isProfileUpdated
    };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthContext;
