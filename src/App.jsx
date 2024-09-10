import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import NavBar from './Components/NavBar';
import NotFound404 from "./Components/pages/NotFound404";
import { ToastContainer } from 'react-toastify';
import Dashboard from "./Components/pages/DashBoard";
import ProfilePage from "./Components/pages/ProfilePage";
import ForgotPassword from "./Components/pages/ForgotPassword";
import { useSelector } from 'react-redux';
import "./App.css"

function App() {
  const loggedIn = useSelector((state) => state.authState.isLoggedIn);
  const isDarkMode = useSelector((state) => state.theme.isDarkMode); // Get dark mode state

  return (
    <div style={{  height: '100vh' }} className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}> {/* Apply theme class */}
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={loggedIn ? <Dashboard /> : <Login />} />
        <Route path="/profile" element={loggedIn ? <ProfilePage /> : <Login />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
