import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Hero from "./components/Hero";
import About from "./components/About";
import Features from "./components/Features";
import Contact from "./components/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LocationInput from "./pages/LocationInput";
import Prediction from "./pages/Prediction";

import "./styles.css";

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* HOME PAGE */}
        <Route
          path="/"
          element={
            <>
              <Hero />
              <About />
              <Features />
              <Contact />
            </>
          }
        />

        {/* AUTH PAGES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PREDICTION FLOW */}
        <Route path="/location" element={<LocationInput />} />
        <Route path="/prediction" element={<Prediction />} />
      </Routes>

      <Footer />
    </Router>
  );
}
