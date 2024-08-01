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

const OCEAN_PROXIMITY_VALUES = {
  "ocean_proximity_<1H OCEAN": 45,
  ocean_proximity_INLAND: 0,
  ocean_proximity_ISLAND: 60,
  "ocean_proximity_NEAR BAY": 15,
  "ocean_proximity_NEAR OCEAN": 30,
};

const fetchPredictions = async () => {
  try {
    const response = await axios.get(`${API_URL}/predictions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching predictions:", error);
    return [];
  }
};

const normalizeData = (data, minBound = 0, maxBound = 100) => {
  const values = Object.values(data);
  const minVal = Math.min(...values);
  const maxVal = Math.max(...values);
  const range = maxVal - minVal;

  if (range === 0) {
    return Object.fromEntries(
      Object.entries(data).map(([key, value]) => [
        key,
        (minBound + maxBound) / 2,
      ])
    );
  }

  return Object.fromEntries(
    Object.entries(data).map(([key, value]) => [
      key,
      ((value - minVal) / range) * (maxBound - minBound) + minBound,
    ])
  );
};

const DynamicLineChart = () => {
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

  const getLineData = (predictions) => {
    if (predictions.length === 0) return { labels: [], datasets: [] };

    const allData = predictions.reduce((acc, prediction) => {
      const inputValues = Object.entries(prediction.input).reduce(
        (obj, [key, value]) => {
          obj[key] = OCEAN_PROXIMITY_VALUES.hasOwnProperty(key)
            ? OCEAN_PROXIMITY_VALUES[key]
            : parseFloat(value) || 0;
          return obj;
        },
        {}
      );

      acc.push(inputValues);
      return acc;
    }, []);

    const allDataNormalized = normalizeData(
      allData.reduce((acc, dataPoint) => {
        Object.entries(dataPoint).forEach(([key, value]) => {
          if (!acc[key]) acc[key] = [];
          acc[key].push(value);
        });
        return acc;
      }, {})
    );

    const datasets = predictions.map((prediction, index) => {
      const normalizedInput = normalizeData(
        Object.fromEntries(
          Object.entries(prediction.input).map(([key, value]) => [
            key,
            OCEAN_PROXIMITY_VALUES.hasOwnProperty(key)
              ? OCEAN_PROXIMITY_VALUES[key]
              : parseFloat(value) || 0,
          ])
        )
      );

      const allValues = Object.values(normalizedInput);

      return {
        label: `Prediction ${index + 1}`,
        data: allValues,
        borderColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${
          (index * 150) % 255
        }, 1)`,
        backgroundColor: `rgba(${(index * 50) % 255}, ${(index * 100) % 255}, ${
          (index * 150) % 255
        }, 0.2)`,
        fill: false,
        lineTension: 0.1,
      };
    });

    return {
      labels: Object.keys(predictions[0].input),
      datasets: datasets,
    };
  };

  const data =
    predictions.length > 0
      ? getLineData(predictions)
      : { labels: [], datasets: [] };

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
          label: (tooltipItem) => `Value: ${tooltipItem.raw.toFixed(2)}`,
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
        beginAtZero: true,
        min: -10,
        max: 110,
        ticks: {
          stepSize: 10,
          color: "white",
        },
      },
    },
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white ">
      <h2 className="text-xl font-semibold mb-4 flex justify-center">
        House Information Chart
      </h2>
      {predictions.length > 0 ? (
        <div className="flex justify-center" style={{ height: "400px" }}>
          {" "}
          {/* Adjust the height here */}
          <Line data={data} options={options} />
        </div>
      ) : (
        <p>No predictions available to display.</p>
      )}
    </div>
  );
};

export default DynamicLineChart;
