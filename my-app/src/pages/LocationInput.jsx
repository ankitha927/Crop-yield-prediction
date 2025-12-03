import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LocationInput() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    location: "",
    crop: "",
    year: "",
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();

    // Save to localStorage for Prediction page
    localStorage.setItem("pred_location", form.location);
    localStorage.setItem("pred_crop", form.crop);
    localStorage.setItem("pred_year", form.year);

    navigate("/prediction");
  }

  return (
    <div className="form-container">
      <h2>Select Crop Details</h2>

      <form onSubmit={handleSubmit}>
        <select name="location" onChange={handleChange}>
          <option value="">Select District</option>
          <option value="Udupi">Udupi</option>
          <option value="Mandya">Mandya</option>
          <option value="Gadag">Gadag</option>
        </select>

        <select name="crop" onChange={handleChange}>
          <option value="">Select Crop</option>
          <option value="Coconut">Coconut</option>
          <option value="Rice">Rice</option>
        </select>

        {/* Year dropdown fixed to 2023 */}
        <select name="year" onChange={handleChange}>
          <option value="2023">2023</option>
        </select>

        <button type="submit">Get Prediction</button>
      </form>
    </div>
  );
}
