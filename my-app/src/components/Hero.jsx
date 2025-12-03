import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="hero">
      <h1>Empowering Farmers With AI-Driven Crop Yield Prediction</h1>
      {/* <p>Using satellite data, NDVI, weather and 10-year historical analytics.</p> */}

      <Link to="/location">
        <button className="primary-btn">Start Prediction 🚜</button>
      </Link>
      <h1 className="agri-dance-text">
  Growing Smarter, Farming Better 🌱
</h1>

    </section>
  );
}
