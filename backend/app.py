from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
import bcrypt
import pandas as pd
import numpy as np
from tensorflow import keras
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)
CORS(app)

# ---------------------------
# MySQL CONNECTION
# ---------------------------
def get_db():
    return mysql.connector.connect(
        host="localhost",
        user="root",        # your MySQL username
        password="Vanitharamu@123",  # your MySQL password
        database="crop_yield"
    )

# ---------------------------
# Load Model
# ---------------------------
model = keras.models.load_model("lstm_full_model_20251130_104304.keras")

# ---------------------------
# USER REGISTRATION
# ---------------------------
@app.route("/register", methods=["POST"])
def register():
    data = request.json
    username = data["username"]
    password = data["password"]

    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    try:
        db = get_db()
        cursor = db.cursor()
        cursor.execute(
            "INSERT INTO users (username, password) VALUES (%s, %s)",
            (username, hashed_pw)
        )
        db.commit()
        db.close()
        return jsonify({"message": "User registered successfully"})
    except mysql.connector.IntegrityError:
        return jsonify({"error": "Username already exists"}), 400

# ---------------------------
# USER LOGIN
# ---------------------------
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    username = data["username"]
    password = data["password"]

    db = get_db()
    cursor = db.cursor()
    cursor.execute("SELECT password FROM users WHERE username=%s", (username,))
    row = cursor.fetchone()
    db.close()

    if row and bcrypt.checkpw(password.encode(), row[0].encode() if isinstance(row[0], str) else row[0]):
        return jsonify({"message": "Login success"})
    else:
        return jsonify({"error": "Invalid username or password"}), 400

# ---------------------------
# PREDICTION API
# ---------------------------
@app.route("/predict", methods=["POST"])
def predict():
    data = request.json
    city = data.get("city", "Udupi")
    crop = data.get("crop", "Rice")
    year = int(data.get("year", 2023))

    df = pd.read_csv("data.csv")
    df = df.drop(["Region", "Crop"], axis=1)

    for lag in range(1, 3):
        df[f"Yield_lag{lag}"] = df["Yield"].shift(lag)
    df = df.dropna().reset_index(drop=True)

    X = df.drop(["Year", "Yield"], axis=1).values

    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    last_input = X_scaled[-1:].reshape(1, 1, X_scaled.shape[1])
    pred = model.predict(last_input, verbose=0)
    predicted_value = float(pred[0][0])

    return jsonify({
        "city": city,
        "crop": crop,
        "year": year,
        "predicted_yield": predicted_value
    })

@app.route("/")
def home():
    return jsonify({"message": "Crop Yield Prediction API Running"})
# ---------------------------
# START BACKEND
# ---------------------------
if __name__ == "__main__":
    app.run(debug=True)
