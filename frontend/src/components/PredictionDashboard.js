import React, { useState } from "react";
import PredictionForm from "./PredictionForm";
import PredictionsTable from "./PredictionsTable";

const PredictionDashboard = () => {
  const [predictions, setPredictions] = useState([]);

  const handleNewPrediction = (prediction) => {
    setPredictions((prevPredictions) => [...prevPredictions, prediction]);
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1 p-4">
        <PredictionForm onNewPrediction={handleNewPrediction} />
      </div>
      <div className="flex-1 p-4">
        <PredictionsTable predictions={predictions} />
      </div>
    </div>
  );
};

export default PredictionDashboard;
