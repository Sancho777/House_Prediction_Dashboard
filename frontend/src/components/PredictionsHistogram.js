import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = "http://localhost:5000";

const fetchPredictions = async () => {
  try {
    const response = await axios.get(`${API_URL}/predictions`);
    console.log("Fetched predictions:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return [];
  }
};

const PredictionsHistogram = () => {
  const [predictions, setPredictions] = useState([]);
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    const getPredictions = async () => {
      const data = await fetchPredictions();
      setPredictions(data);
    };

    getPredictions();

    const pollingInterval = setInterval(() => {
      if (isPolling) {
        getPredictions();
      }
    }, 5000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, [isPolling]);

  const getPredictionValues = () => {
    if (predictions.length === 0) {
      console.log("No predictions available");
    }
    return predictions.map((prediction) => prediction.prediction);
  };

  const predictionValues = getPredictionValues();

  const data = {
    labels: predictionValues.map((_, index) => `Prediction ${index + 1}`),
    datasets: [
      {
        label: "Predictions Histogram",
        data: predictionValues,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "white",
        },
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `Prediction Value: ${tooltipItem.raw}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-white">Price Bar Chart</h2>
      {predictionValues.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p className="text-gray-500 text-white">
          No predictions available to display.
        </p>
      )}
    </div>
  );
};

export default PredictionsHistogram;
