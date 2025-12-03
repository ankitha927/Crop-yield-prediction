import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css"; 
export default function Navbar() {
  return (
    <nav className="nav">
      <div className="logo">🌾 AgriYield Portal</div>

      <ul className="nav-links">
        <li><a href="/">Home</a></li>
        <li><a href="#about">About</a></li>
        <li><a href="#features">Features</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
}
