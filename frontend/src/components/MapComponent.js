import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const customIcon = new L.Icon({
  iconUrl: "/custom-icon.png",
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

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

const MapComponent = () => {
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

  const normalizeCoordinates = (coordinates) => {
    const latitudes = coordinates
      .map((coord) => coord.latitude)
      .filter((lat) => !isNaN(lat));
    const longitudes = coordinates
      .map((coord) => coord.longitude)
      .filter((lon) => !isNaN(lon));

    if (latitudes.length === 0 || longitudes.length === 0) {
      return {
        latMin: 0,
        latMax: 0,
        lonMin: 0,
        lonMax: 0,
      };
    }

    const latMin = Math.min(...latitudes);
    const latMax = Math.max(...latitudes);
    const lonMin = Math.min(...longitudes);
    const lonMax = Math.max(...longitudes);

    return {
      latMin,
      latMax,
      lonMin,
      lonMax,
    };
  };

  const coordinates = predictions
    .map((prediction) => ({
      latitude: parseFloat(prediction.input.latitude),
      longitude: parseFloat(prediction.input.longitude),
    }))
    .filter((coord) => !isNaN(coord.latitude) && !isNaN(coord.longitude)); // Filter out invalid coordinates

  const { latMin, latMax, lonMin, lonMax } = normalizeCoordinates(coordinates);

  const centerLat = latMin === latMax ? 0 : (latMin + latMax) / 2;
  const centerLon = lonMin === lonMax ? 0 : (lonMin + lonMax) / 2;
  const zoomLevel = latMin === latMax && lonMin === lonMax ? 2 : 10;

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md text-white">
      <h2 className="text-xl font-semibold mb-4">Map of House Locations</h2>
      <MapContainer
        center={[centerLat, centerLon]}
        zoom={zoomLevel}
        style={{ height: "500px", width: "100%" }}
        className="rounded-lg"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            position={[coord.latitude, coord.longitude]}
            icon={customIcon}
          >
            <Popup>
              Latitude: {coord.latitude}
              <br />
              Longitude: {coord.longitude}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
