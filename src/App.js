// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Body from "./pages/Body";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import OtpVerification from "./components/auth/OtpVerification";
import NewPassword from "./components/auth/NewPassword";
import { App as AppCont } from "antd";

function App() {
  return (
    <AppCont>
      <Router>
        <Routes>
          <Route path="/" element={<Body />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OtpVerification />} />
          <Route path="/new-password" element={<NewPassword />} />
        </Routes>
      </Router>
    </AppCont>
  );
}

export default App;
