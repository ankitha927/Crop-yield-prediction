import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Prediction() {
  const [loading, setLoading] = useState(true);
  const [pred, setPred] = useState(null);
  const [error, setError] = useState("");

  const graphData = [
    { year: 2019, yield: 3.8 },
    { year: 2020, yield: 4.1 },
    { year: 2021, yield: 4.0 },
    { year: 2022, yield: 4.3 },
    { year: 2023, yield: 4.6 },
  ];

  useEffect(() => {
    const location = localStorage.getItem("pred_location");
    const crop = localStorage.getItem("pred_crop");
    const year = localStorage.getItem("pred_year");

    async function fetchPrediction() {
      try {
        const res = await fetch("http://127.0.0.1:5000/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            city: location,
            crop: crop,
            year: Number(year),
          }),
        });

        const data = await res.json();

        if (res.ok) {
          setPred(data);
        } else {
          setError(data.error);
        }
      } catch {
        setError("Server not responding");
      }
      setLoading(false);
    }

    fetchPrediction();
  }, []);

  return (
    <div
      style={{
        minHeight: "70vh",
        padding: "20px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "45%",
          background: "#e4e3d5ff",
          padding: "25px",
          borderRadius: "16px",
          boxShadow: "0px 6px 18px rgba(0,0,0,0.12)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "15px",
            fontSize: "26px",
            color: "#136120ff",
            fontWeight: "700",
          }}
        >
          Estimated Yield
        </h1>

        {loading && <p>⏳ Predicting...</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Prediction Result */}
        {!loading && pred && (
          <div
            style={{
              background: "rgba(0, 255, 0, 0.12)",
              padding: "18px",
              borderRadius: "12px",
              textAlign: "center",
              marginBottom: "25px",
            }}
          >
            <h2
              style={{
                fontSize: "34px",
                fontWeight: "800",
                color: "#333534ff",
              }}
            >
              {pred.predicted_yield.toFixed(3)} Tons
            </h2>
          </div>
        )}

       
       {/* IMAGE INSERTED HERE */}
        <img
          src="/img.png"
          alt="Yield Prediction Chart"
          style={{
            width: "100%",
            borderRadius: "12px",
            border: "1px solid #ccc",
          }}
        />
      </div>
    </div>
  );
}
