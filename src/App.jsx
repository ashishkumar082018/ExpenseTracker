import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Components/pages/HomePage';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import NavBar from './Components/Layouts/NavBar';
import NotFound404 from "./Components/Layouts/NotFound404"
import { ToastContainer } from 'react-toastify';
import Dashboard from "./Components/pages/DashBoard";
import ForgotPassword from "./Components/pages/ForgotPassword";

function App() {
  return (
    <div className="App">
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
}

export default App;
