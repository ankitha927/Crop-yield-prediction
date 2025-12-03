import numpy as np
import pandas as pd
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import r2_score, mean_squared_error, mean_absolute_error
import matplotlib.pyplot as plt
import datetime

# -----------------------
# 1. Load dataset
# -----------------------
data = pd.read_csv("data.csv")

# Drop non-numeric columns (Region, Crop)
data = data.drop(["Region", "Crop"], axis=1)

# Save years separately for plotting
years = data["Year"].values

# -----------------------
# 2. Create lag features for Yield
# -----------------------
def create_lags(df, target_col, lags=2):
    for lag in range(1, lags+1):
        df[f"{target_col}_lag{lag}"] = df[target_col].shift(lag)
    df = df.dropna().reset_index(drop=True)
    return df

data = create_lags(data, "Yield", lags=2)

# Features & Target
X = data.drop(["Year", "Yield"], axis=1).values
y = data["Yield"].values
years = data["Year"].values

# -----------------------
# 3. Scale features
# -----------------------
scaler = StandardScaler()
X = scaler.fit_transform(X)

# Reshape for LSTM (samples, timesteps=1, features)
X = X.reshape((X.shape[0], 1, X.shape[1]))

# -----------------------
# 4. Define Model
# -----------------------
def build_model(input_shape):
    model = keras.Sequential([
        layers.Input(shape=input_shape),
        layers.LSTM(32, return_sequences=False),
        layers.Dense(16, activation="relu"),
        layers.Dense(1)
    ])
    model.compile(optimizer=keras.optimizers.Adam(0.001), loss="mse", metrics=["mae"])
    return model

# -----------------------
# 5. Full Dataset Model Training
# -----------------------
model_full = build_model((X.shape[1], X.shape[2]))
history = model_full.fit(X, y, epochs=200, batch_size=4, verbose=0)

# Predictions
y_full_pred = model_full.predict(X).flatten()

# Metrics function
def metrics(y_true, y_pred):
    return {
        "R2": r2_score(y_true, y_pred),
        "RMSE": np.sqrt(mean_squared_error(y_true, y_pred)),
        "MAE": mean_absolute_error(y_true, y_pred),
        "MAPE": np.mean(np.abs((y_true - y_pred) / y_true)) * 100
    }

full_metrics = metrics(y, y_full_pred)
print("\n================== FULL MODEL ==================")
print("Full Dataset Metrics:", full_metrics)

# -----------------------
# 6. Save Model
# -----------------------
timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
model_full.save(f"lstm_full_model_{timestamp}.keras")
model_full.save(f"lstm_full_model_{timestamp}.h5")
model_full.export(f"lstm_full_model_{timestamp}_tf")

print("\nModel saved successfully in .keras, .h5, and TF formats!")

# -----------------------
# 7. Plot Results
# -----------------------
plt.figure(figsize=(10,5))
plt.plot(years, y, "bo-", label="Actual Yield")
plt.plot(years, y_full_pred, "r--", label="Predicted Yield")
plt.title("Full Dataset Model")
plt.xlabel("Year")
plt.ylabel("Yield")
plt.legend()
plt.show()