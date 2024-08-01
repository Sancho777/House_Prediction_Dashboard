import React, { useState, useEffect } from "react";
import axios from "axios";
import PredictionDashboard from "./components/PredictionDashboard";
import PredictionsHistogram from "./components/PredictionsHistogram";
import LineChart from "./components/LineChart";
import DynamicLineChart from "./components/DynamicLineChart";
import ChartsContainer from "./components/ChartsContainer";
import MapComponent from "./components/MapComponent";
import houseIcon from "./icons/house4.svg";
import "./App.css";

const App = () => {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const response = await axios.get("http://localhost:5000/predictions");
        setPredictions(response.data);
      } catch (error) {
        console.error("Error fetching predictions:", error);
      }
    };

    fetchPredictions();
  }, []);

  const handleNewPrediction = (newPrediction) => {
    setPredictions((prevPredictions) => [...prevPredictions, newPrediction]);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans">
      <header className="bg-gray-800 p-4 shadow-md flex items-center justify-between">
        <img src={houseIcon} alt="House Icon" className="h-12 w-12  ml-2" />
        <h1 className="text-4xl font-semibold text-white flex-grow text-center mt-2">
          House Price Predictor
        </h1>
        <div className="h-10 w-10"></div>
      </header>

      <main className="p-6">
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <PredictionDashboard />
        </div>

        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <DynamicLineChart />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md mb-6">
          <ChartsContainer />
        </div>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <MapComponent />
        </div>
      </main>
    </div>
  );
};

export default App;
