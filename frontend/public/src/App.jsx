import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Common/Header";
import Footer from "./components/Common/Footer";
import Dashboard from "./pages/Dashboard";
import ResumeHistory from "./pages/ResumeHistory";
import AdminPanel from "./pages/AdminPanel";
import QAPanel from "./pages/QAPanel";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";

function App() {
  return (
    <Router>
      <Header />
      <main style={{ maxWidth: 960, margin: "0 auto", padding: "1rem" }}>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<ResumeHistory />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/qa" element={<QAPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
