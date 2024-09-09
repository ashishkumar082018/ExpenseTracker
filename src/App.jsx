import React, { Profiler } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/pages/HomePage';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import NavBar from './Components/NavBar';
import NotFound404 from "./Components/pages/NotFound404"
import { ToastContainer } from 'react-toastify';
import Dashboard from "./Components/pages/DashBoard";
import ProfilePage from "./Components/pages/ProfilePage";
import ForgotPassword from "./Components/pages/ForgotPassword";

function App() {
  return (
    <div className="App">
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
