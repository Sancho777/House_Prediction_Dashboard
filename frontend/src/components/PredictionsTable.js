import React, { useState } from "react";

const PredictionsTable = ({ predictions }) => {
  const [openRows, setOpenRows] = useState({});

  const toggleRow = (index) => {
    setOpenRows((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg ">
      <h2 className="text-xl font-semibold text-white mb-4">Results</h2>
      <table className="min-w-full bg-gray-800 text-gray-300 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-700">
          <tr>
            <th className="py-2 px-4 text-left font-bold">Time</th>
            <th className="py-2 px-4 text-left font-bold">Information</th>
            <th className="py-2 px-4 text-left font-bold">Prediction</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <React.Fragment key={index}>
              <tr className="border-t border-gray-600">
                <td className="py-2 px-4 font-bold">{prediction.timestamp}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => toggleRow(index)}
                    className="text-blue-400 hover:text-blue-600"
                  >
                    {openRows[index] ? "Hide" : "Show"} Details
                  </button>
                  {openRows[index] && (
                    <div className="mt-2 ml-4 text-sm">
                      {Object.entries(prediction.input).map(([key, value]) => (
                        <div key={key}>
                          <strong>{key}:</strong> {value}
                        </div>
                      ))}
                    </div>
                  )}
                </td>
                <td className="py-2 px-4 font-bold">{prediction.prediction}</td>
              </tr>
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PredictionsTable;
