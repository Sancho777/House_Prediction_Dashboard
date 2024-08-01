# House Price Predictor

## Overview

House Price Predictor is a web application that predicts house prices based on various input features using a machine learning model. The application consists of a frontend built with React and Tailwind CSS and a backend built with Flask. The model is pre-trained and used to make predictions based on user input.

## Project Structure

The project is organized into two main directories:

├── backend
│ ├── pycache
│ ├── node_modules
│ ├── app.py
│ ├── model.joblib
│ ├── package-lock.json
│ ├── package.json
│ └── requirements.txt
│
├── frontend
│ ├── node_modules
│ ├── public
│ ├── src
│ ├── .gitignore
│ ├── package-lock.json
│ ├── package.json
│ ├── postcss.config.js
│ ├── README.md
│ └── tailwind.config.js
│
├── myenv
├── desktop.ini
├── housing.csv
├── main.py
└── README.md

## Setup and Installation

### Prerequisites

- Python 3.7 or higher
- Node.js 14 or higher
- npm (Node Package Manager)

### Backend Setup

1. **Navigate to the `backend` directory:**

   ```bash
   cd backend
   ```

2. **Create and activate a Python virtual environment:**

   ```bash
   python -m venv myenv
   source myenv/bin/activate  # On Windows use `myenv\Scripts\activate`
   ```

3. **Install the required Python packages:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Run the Flask application:**

   ```bash
   python app.py
   ```

   The backend server will be running at `http://localhost:5000`.

### Frontend Setup

1. **Navigate to the `frontend` directory:**

   ```bash
   cd frontend
   ```

2. **Install the required Node.js packages:**

   ```bash
   npm install
   ```

3. **Start the React application:**

   ```bash
   npm start
   ```

   The React application will be running at `http://localhost:3000`.

## Usage

1. **Open your web browser and go to `http://localhost:3000`.**

2. **Enter the required input values into the form.**

3. **Submit the form to get house price predictions.**

4. **View the predictions on the map and charts provided.**

## API Endpoints

- **POST /predict**

  **Request body:**

  ```json
  {
    "longitude": "value",
    "latitude": "value",
    "housing_median_age": "value",
    "total_rooms": "value",
    "total_bedrooms": "value",
    "population": "value",
    "households": "value",
    "median_income": "value",
    "ocean_proximity_<1H OCEAN": "value",
    "ocean_proximity_INLAND": "value",
    "ocean_proximity_ISLAND": "value",
    "ocean_proximity_NEAR BAY": "value",
    "ocean_proximity_NEAR OCEAN": "value"
  }
  ```

## Response

```json
{
  "timestamp": "ISO 8601 timestamp",
  "input": {
    "longitude": "value",
    "latitude": "value",
    "housing_median_age": "value",
    "total_rooms": "value",
    "total_bedrooms": "value",
    "population": "value",
    "households": "value",
    "median_income": "value",
    "ocean_proximity_<1H OCEAN": "value",
    "ocean_proximity_INLAND": "value",
    "ocean_proximity_ISLAND": "value",
    "ocean_proximity_NEAR BAY": "value",
    "ocean_proximity_NEAR OCEAN": "value"
  },
  "prediction": "predicted value"
}
```

- **GET /predictions**

## Response

```json
[
  {
    "timestamp": "ISO 8601 timestamp",
    "input": {
      "longitude": "value",
      "latitude": "value",
      "housing_median_age": "value",
      "total_rooms": "value",
      "total_bedrooms": "value",
      "population": "value",
      "households": "value",
      "median_income": "value",
      "ocean_proximity_<1H OCEAN": "value",
      "ocean_proximity_INLAND": "value",
      "ocean_proximity_ISLAND": "value",
      "ocean_proximity_NEAR BAY": "value",
      "ocean_proximity_NEAR OCEAN": "value"
    },
    "prediction": "predicted value"
  }
]
```

## Acknowledgments

- This project uses the Leaflet library for mapping.
- Chart.js is used for charting in the frontend.
- Thanks to the OpenStreetMap for providing the map tiles.

## Contributing

Feel free to fork the repository, make improvements, and submit pull requests. Please follow the coding style and add appropriate tests where applicable.

## License

This project is licensed under the Public Domain.
