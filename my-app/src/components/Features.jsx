import React from "react";

export default function Features() {
  return (
    <section id="features" className="section">
      <h1>Key Features</h1>

      <div className="feature-grid">

        <div className="feature-card">
          <h3>📊 Agro-Meteorological Data Repository</h3>
          <p>
            Integrates 22 years of MODIS NDVI, NASA POWER climate variables,
            and government crop statistics into a unified dataset.
          </p>
        </div>

        <div className="feature-card">
          <h3>🛰 NDVI-Based Crop Identification</h3>
          <p>
            Adaptive NDVI thresholding, cloud masking, seasonal segmentation
            and α–β calibration for accurate cropland detection.
          </p>
        </div>

        <div className="feature-card">
          <h3>🤖 LSTM Yield Prediction Model</h3>
          <p>
            Deep learning model using lag features, NDVI history and climate data
            for next-year yield forecasting with <b>0.96% error.</b>
          </p>
        </div>

        <div className="feature-card">
          <h3>🔗 End-to-End Automated Pipeline</h3>
          <p>
            From satellite preprocessing to crop identification and yield prediction—
            fully automated for real farm decision-making.
          </p>
        </div>

      </div>
    </section>
  );
}
