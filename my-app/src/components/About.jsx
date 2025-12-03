import React from "react";

export default function About() {
  return (
    <section id="about" className="about-wrapper">
      <div className="about-container">
        
        {/* LEFT IMAGE */}
        <div className="about-image"></div>

        {/* RIGHT TEXT */}
        <div className="about-text">
          <h2>About the Project</h2>

          <p>
            AgriYield Portal is a smart AI-driven system that helps farmers 
            estimate crop yield with high accuracy using satellite imagery, 
            NDVI time-series, and agrometeorological data. By combining 
            MODIS NDVI (2000–2022), NASA POWER climate data, and official yield 
            records, the system provides a unified analytical view of crop  productivity.
          </p>

          <p>
            Our Crop Identification Algorithm (CIA) uses NDVI thresholding and 
            seasonal patterns to map croplands precisely for districts like Udupi. 
            Yield forecasting is powered by an LSTM deep learning model that captures 
            long-term crop behavior and predicts future yield with over 98% accuracy.
          </p>

          <p>
            This platform is designed to support farmers, researchers, and policy-makers 
            by offering reliable insights for smarter cultivation, improved planning, 
            and sustainable agricultural development.
          </p>
        </div>

      </div>
    </section>
  );
}
