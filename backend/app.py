from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
from datetime import datetime
import numpy as np

app = Flask(__name__)
CORS(app)

model = joblib.load('model.joblib')

# Expected feature columns and data types
EXPECTED_FEATURES = [
    'longitude', 'latitude', 'housing_median_age', 'total_rooms',
    'total_bedrooms', 'population', 'households', 'median_income',
    'ocean_proximity_<1H OCEAN', 'ocean_proximity_INLAND',
    'ocean_proximity_ISLAND', 'ocean_proximity_NEAR BAY',
    'ocean_proximity_NEAR OCEAN'
]

DATA_TYPES = {
    'longitude': 'float64',
    'latitude': 'float64',
    'housing_median_age': 'float64',
    'total_rooms': 'float64',
    'total_bedrooms': 'float64',
    'population': 'float64',
    'households': 'float64',
    'median_income': 'float64',
    'ocean_proximity_<1H OCEAN': 'uint8',
    'ocean_proximity_INLAND': 'uint8',
    'ocean_proximity_ISLAND': 'uint8',
    'ocean_proximity_NEAR BAY': 'uint8',
    'ocean_proximity_NEAR OCEAN': 'uint8'
}

predictions = []

def preprocess_input(data):
    # Extract numerical and categorical data
    numerical_data = {k: float(v) for k, v in data.items() if k in DATA_TYPES and np.issubdtype(np.dtype(DATA_TYPES[k]), np.number)}
    categorical_data = {k: v for k, v in data.items() if k not in numerical_data}

    # Convert numerical data to DataFrame
    df_num = pd.DataFrame([numerical_data])

    # Convert categorical data to DataFrame and one-hot encode
    df_cat = pd.get_dummies(pd.DataFrame([categorical_data]))

    # Concatenate numerical and categorical DataFrames
    df = pd.concat([df_num, df_cat], axis=1)

    # Ensure the same columns as the model
    df = df.reindex(columns=EXPECTED_FEATURES, fill_value=0)

    # Convert data types to match the expected types
    for column, dtype in DATA_TYPES.items():
        if column in df.columns:
            df[column] = df[column].astype(dtype)

    return df

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    df = preprocess_input(data)
    prediction = model.predict(df)[0]
    prediction = round(prediction, 8)
    result = {
        'timestamp': datetime.now().isoformat(),
        'input': data,
        'prediction': prediction
    }

    predictions.append(result)
    return jsonify(result)

@app.route('/predictions', methods=['GET'])
def get_predictions():
    return jsonify(predictions)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
