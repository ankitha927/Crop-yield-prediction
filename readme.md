Crop Identification and Yield Prediction using NDVI and Deep Learning
Overview

This project provides an automated system for crop identification and annual yield prediction using satellite imagery, NDVI computation, and deep learning (LSTM). The system allows users to input a location, based on which the backend fetches satellite imagery, identifies crop types, and predicts next-year yield using 14 years of historical environmental data.

The system aims to help farmers and agricultural departments with accurate crop monitoring, resource planning, and yield estimation.

Key Features
1. Automatic Satellite Image Fetching

User provides location, year, and crop.

Backend automatically retrieves satellite image tiles.

Images are stitched and preprocessed.

2. NDVI-Based Crop Identification

Converts satellite image to NDVI.

Applies threshold-based crop identification (Paddy, Wheat, Coconut).

Pixel-wise classification and area calculation.

3. LSTM-Based Yield Prediction

Model trained on:

Temperature

Rainfall

Humidity

Soil moisture

Wind

Historical yield

Other environmental factors

Outputs:

Predicted yield (kg/hectare)

Performance metrics

4. End-to-End Automated Pipeline

Input: Location

Backend fetches satellite image

NDVI extraction and crop detection

Yield prediction using LSTM

Output includes crop type, predicted yield, and visual results

Tech Stack
Machine Learning

TensorFlow / Keras

NumPy, Pandas

scikit-learn

Remote Sensing

Rasterio

GDAL

NumPy

Backend

Python (Flask or FastAPI)

Optional Frontend

React.js

HTML/CSS

Project Structure
crop-yield-prediction/
│
├── data/
│   ├── NDVI_Images/
│   ├── climatology_2008_2022/
│   └── satellite_tiles/
│
├── models/
│   └── lstm_yield_model.h5
│
├── src/
│   ├── ndvi_extraction.py
│   ├── crop_identification.py
│   ├── yield_prediction_lstm.py
│   ├── data_preprocessing.py
│   └── api_backend.py
│
├── results/
│   ├── ndvi_output.png
│   ├── crop_mask.png
│   └── prediction_graph.png
│
├── README.md
└── requirements.txt

Methodology
1. Data Acquisition

NDVI datasets collected for selected regions.

Environmental data (temperature, rainfall, humidity, wind, soil moisture, etc.) collected for 14 years.

2. NDVI Calculation
NDVI = (NIR - RED) / (NIR + RED)


NDVI thresholds differentiate crops.

Region of interest is extracted using NDVI masks.

3. Crop Identification

Threshold-based crop classification.

Generates crop masks and estimates crop area for the region.

4. LSTM Yield Prediction

Uses a sliding window approach with 10-year sequences.

Features normalized using StandardScaler.

Predicts next-year yield based on historical data.

5. Outputs

Crop type

Crop classification map

NDVI visualization

Yield prediction graph

Numerical yield value

How to Run
Step 1: Install Dependencies
pip install -r requirements.txt

Step 2: Run NDVI Extraction
python src/ndvi_extraction.py

Step 3: Run Crop Identification
python src/crop_identification.py

Step 4: Run Yield Prediction
python src/yield_prediction_lstm.py

Step 5: Start Backend API
python src/api_backend.py

Future Enhancements

CNN-based multi-crop identification

Integration of IoT sensor data

More crop types (banana, sugarcane, areca)

Real-time web dashboard

Automatic satellite image stitching from multiple sources

Project Developer

Ankitha R
B.E. Computer Science & Engineering
Shri Madhwa Vadiraja Institute of Technology and Management (SMVITM), Udupi

Acknowledgements

NASA MODIS and ESA Sentinel for satellite imagery

Government agriculture databases

TensorFlow and Rasterio open-source tools