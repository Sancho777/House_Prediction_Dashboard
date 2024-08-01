import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const API_URL = "http://localhost:5000";

const fetchPredictions = async () => {
  try {
    const response = await axios.get(`${API_URL}/predictions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return [];
  }
};

const LineChart = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const getPredictions = async () => {
      const data = await fetchPredictions();
      setPredictions(data);
    };

    getPredictions();

    const pollingInterval = setInterval(() => {
      getPredictions();
    }, 5000);

    return () => {
      clearInterval(pollingInterval);
    };
  }, []);

  const timestamps = predictions.map((prediction) => prediction.timestamp);
  const predictionValues = predictions.map(
    (prediction) => prediction.prediction
  );

  const data = {
    labels: timestamps,
    datasets: [
      {
        label: "Prediction Values Over Time",
        data: predictionValues,
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
        lineTension: 0.1,
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
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">
        Prediction Values Over Time
      </h2>
      {predictionValues.length > 0 ? (
        <Line data={data} options={options} />
      ) : (
        <p>No predictions available to display.</p>
      )}
    </div>
  );
};

export default LineChart;
