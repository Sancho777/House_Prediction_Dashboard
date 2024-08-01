import React from "react";
import { Bar, Scatter } from "react-chartjs-2";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "tailwindcss/tailwind.css";

// Histogram of Predictions
export const PredictionsHistogram = ({ predictions }) => {
  const data = {
    labels: predictions.map((_, idx) => idx),
    datasets: [
      {
        label: "Predicted Prices",
        data: predictions,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Histogram of Predictions</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

// Scatter Plot of Predictions vs. Actuals
export const PredictionsScatter = ({ predictions, actuals }) => {
  const data = {
    datasets: [
      {
        label: "Predicted vs Actual Prices",
        data: predictions.map((pred, idx) => ({ x: pred, y: actuals[idx] })),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "linear",
        position: "bottom",
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Predicted vs Actual Prices</h2>
      <Scatter data={data} options={options} />
    </div>
  );
};

// Feature Importance Bar Chart
export const FeatureImportanceBar = ({ featureImportance }) => {
  const data = {
    labels: Object.keys(featureImportance),
    datasets: [
      {
        label: "Feature Importance",
        data: Object.values(featureImportance),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Feature Importance</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

// Geographical Map
export const PredictionsMap = ({ data }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Map of Predictions</h2>
      <MapContainer
        center={[37.7749, -122.4194]}
        zoom={10}
        style={{ height: "500px", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data.map((point, idx) => (
          <CircleMarker
            key={idx}
            center={[point.latitude, point.longitude]}
            radius={10}
            fillOpacity={0.5}
          >
            <Popup>
              <span>Predicted Price: {point.prediction}</span>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
};
