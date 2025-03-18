from flask import Flask, request, jsonify
import numpy as np
import tensorflow as tf
import joblib
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Load trained model and scaler
custom_objects = {"mse": tf.keras.losses.MeanSquaredError()}
model = tf.keras.models.load_model("models/energy_rnn_model.h5", custom_objects=custom_objects)
scaler = joblib.load("models/scaler.pkl")  # Adjust path as needed

# Define energy sources
energy_sources = ["Consumption", "Production", "Nuclear", "Wind", "Hydroelectric", "Oil and Gas", "Coal", "Solar", "Biomass"]

# Load precomputed standard deviation from test errors
precomputed_std_dev = np.array([
    248.97713038, 266.48838146, 32.36264711, 169.22909705, 175.79599548,
    95.84067767, 61.562889, 39.46318552, 2.82921499
])

# Confidence threshold
CONFIDENCE_THRESHOLD = 70.52

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        features = np.array(data["features"]).reshape(1, 24, -1)  # Ensure correct shape

        # Scale input
        scaled_features = scaler.transform(features.reshape(-1, features.shape[-1])).reshape(1, 24, -1)

        # Make prediction
        prediction_scaled = model.predict(scaled_features)

        # Convert back to original scale
        prediction_original = scaler.inverse_transform(prediction_scaled)[0]

        # Compute 95% confidence interval using precomputed standard deviation
        confidence_95 = 1.96 * precomputed_std_dev

        # Compute confidence levels
        lower_bounds = np.maximum(prediction_original - confidence_95, 0)  # Ensure non-negative values
        upper_bounds = prediction_original + confidence_95

        # Format the final output
        final_output = {}

        for i, source in enumerate(energy_sources):
            pred_value = prediction_original[i]
            ci_width = upper_bounds[i] - lower_bounds[i]

            if pred_value > 0:
                confidence_percentage = 100 * (1 - (ci_width / pred_value))
            else:
                confidence_percentage = 100 * (1 - (ci_width / max(upper_bounds[i], 1)))  # Avoid division by zero

            confidence_percentage = max(confidence_percentage, 0)  # Ensure non-negative confidence

            final_output[source] = {
                "Prediction": "Uncertain" if confidence_percentage < CONFIDENCE_THRESHOLD else f"{pred_value:.2f} MW",
                "Confidence": f"{confidence_percentage:.2f}%"
            }

        return jsonify(final_output)

    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
