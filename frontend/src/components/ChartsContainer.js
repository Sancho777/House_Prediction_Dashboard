// src/components/ChartsContainer.js

import React from "react";
import PredictionsHistogram from "./PredictionsHistogram";
import LineChart from "./LineChart";

const ChartsContainer = ({ predictions }) => {
  return (
    <div className="flex flex-col md:flex-row md:flex-wrap">
      <div className="flex-1 p-4 min-w-0">
        <PredictionsHistogram predictions={predictions} />
      </div>
      <div className="flex-1 p-4 min-w-0">
        <LineChart />
      </div>
    </div>
  );
};

export default ChartsContainer;
