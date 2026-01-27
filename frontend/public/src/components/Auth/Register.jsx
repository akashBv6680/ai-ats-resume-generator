import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../services/auth";
import { email, required, minLength } from "../../utils/validation";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!required(form.name) || !email(form.email) || !minLength(form.password, 6)) {
      setError("Fill all fields with valid values.");
      return;
    }

    try {
      setBusy(true);
      await register(form);
      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "0.5rem" }}>
          <label>
            Name
            <br />
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
            />
          </label>
        </div>
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
          {busy ? "Creating account..." : "Register"}
        </button>
      </form>
    </section>
  );
}

export default Register;
