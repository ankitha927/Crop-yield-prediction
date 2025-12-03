import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const container = {
    width: "450px",
    margin: "120px auto",
    padding: "40px",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(14px)",
    borderRadius: "20px",
    color: "white",
    textAlign: "center",
  };

  return (
    <div style={container}>
      <h1>🌱 Crop Yield Prediction</h1>
      <Link to="/location">
        <button style={{ padding: "14px 32px", borderRadius: "12px", background: "green", color: "white" }}>
          Start Prediction
        </button>
      </Link>
    </div>
  );
}
