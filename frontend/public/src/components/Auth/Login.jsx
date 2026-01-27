import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import { email, required } from "../../utils/validation";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!email(form.email) || !required(form.password)) {
      setError("Enter valid email and password.");
      return;
    }

    try {
      setBusy(true);
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Email
            <br />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </label>
        </div>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Password
            <br />
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />
          </label>
        </div>
        {error && (
          <div style={{ color: "red", marginBottom: "0.5rem" }}>{error}</div>
        )}
        <button type="submit" disabled={busy}>
          {busy ? "Signing in..." : "Login"}
        </button>
      </form>
    </section>
  );
}

export default Login;
