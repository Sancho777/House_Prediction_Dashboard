import React, { useState } from "react";
import axios from "axios";

const PredictionForm = ({ onNewPrediction }) => {
  const [formData, setFormData] = useState({
    longitude: "",
    latitude: "",
    housing_median_age: "",
    total_rooms: "",
    total_bedrooms: "",
    population: "",
    households: "",
    median_income: "",
    ocean_proximity: "NEAR BAY",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      onNewPrediction(response.data);
      setFormData({
        longitude: "",
        latitude: "",
        housing_median_age: "",
        total_rooms: "",
        total_bedrooms: "",
        population: "",
        households: "",
        median_income: "",
        ocean_proximity: "NEAR BAY",
      });
    } catch (error) {
      console.error("There was an error predicting the house price!", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-gray-800 p-6 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-white mb-4">
        Residence Information
      </h2>
      <div className="grid gap-4">
        {Object.keys(formData).map((key) =>
          key !== "ocean_proximity" ? (
            <div key={key} className="flex items-center gap-4">
              <label className="text-gray-400 w-1/3 text-right">
                {key.replace(/_/g, " ").toUpperCase()}
              </label>
              <input
                type="text"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="p-2 rounded border border-gray-700 bg-gray-900 text-gray-300 w-2/3"
                placeholder={`Enter ${key.replace(/_/g, " ")}`}
              />
            </div>
          ) : (
            <div key={key} className="flex items-center gap-4">
              <label className="text-gray-400 w-1/3 text-right">
                {key.replace(/_/g, " ").toUpperCase()}
              </label>
              <select
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="p-2 rounded border border-gray-700 bg-gray-900 text-gray-300 w-2/3"
              >
                <option value="NEAR BAY">NEAR BAY</option>
                <option value="<1H OCEAN">&lt;1H OCEAN</option>
                <option value="INLAND">INLAND</option>
                <option value="ISLAND">ISLAND</option>
                <option value="NEAR OCEAN">NEAR OCEAN</option>
              </select>
            </div>
          )
        )}
      </div>
      <button
        type="submit"
        className="mt-4 w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Predict
      </button>
    </form>
  );
};

export default PredictionForm;
