import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    password: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleRegister(e) {
    e.preventDefault();

    if (!form.name || !form.password || !form.confirmPassword) {
      setMsg("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.name,
          password: form.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setMsg("Registration successful! Redirecting...");
        setTimeout(() => navigate("/login"), 1000);
      } else {
        setMsg(data.error || "Registration failed");
      }
    } catch (err) {
      setMsg("Server not responding");
    }
  }

  return (
    <div className="form-container">
      <h2>Farmer Register</h2>

      {msg && <p>{msg}</p>}

      <form onSubmit={handleRegister}>
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Enter Password"
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          onChange={handleChange}
        />

        <button type="submit">Register</button>

        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#0fa45c", cursor: "pointer", fontWeight: "600" }}
          >
            Login
          </span>
        </p>
      </form>
    </div>
  );
}
