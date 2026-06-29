// frontend/src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Gateway presentation flow */}
        <Route path="/" element={<Home />} />

        {/* Admin Gate System login interface entry */}
        <Route path="/login" element={<Login />} />

        {/* Secure Administrative Operational Workspace Panel */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* Fallback configuration matches any route back to interface source */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
