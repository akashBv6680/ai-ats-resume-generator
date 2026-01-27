import React from "react";
import { Link } from "react-router-dom";
import { isAuthenticated, logout } from "../../services/auth";

function Header() {
  const auth = isAuthenticated();

  const handleLogout = () => {
    logout();
    window.location.href = "/login";
  };

  return (
    <header style={{ borderBottom: "1px solid #ccc", padding: "0.5rem 1rem" }}>
      <nav style={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <strong>AI ATS Resume Generator</strong>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/history">History</Link>
          <Link to="/admin">Admin</Link>
          <Link to="/qa">QA</Link>
          {!auth && <Link to="/login">Login</Link>}
          {!auth && <Link to="/register">Register</Link>}
          {auth && (
            <button type="button" onClick={handleLogout}>
              Logout
            </button>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
