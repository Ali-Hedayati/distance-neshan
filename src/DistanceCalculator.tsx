import React, { useState } from "react";
import axios from "axios";
import DistanceGauge from "./DistanceGauge"; // Import the gauge component

const DistanceCalculator: React.FC = () => {
  const [distance, setDistance] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const getLocationAndCalculateDistance = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          setLoading(true);
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          const origins = `${lat},${lng}`;
          const destinations = "51.165691,10.451526"; // Your destination coordinates
          const apiKey = "service.b2ed0b63a3354338a846fa8d5df8274b"; // Replace with your actual API key


          try {
            const response = await axios.get(
              `https://api.neshan.org/v1/distance-matrix`, // Updated URL
              {
                params: {
                  type: "car",
                  origins: origins,
                  destinations: destinations,
                },
                headers: {
                  "Api-Key": apiKey,
                },
              }
            );

            const distanceValue = response.data.rows[0].elements[0].distance.value; // Assuming you get distance in meters
            setDistance(distanceValue);
            setError(null);
          } catch (err) {
            setError("Failed to fetch distance");
            console.error(err);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          setError("Failed to get your location");
          console.error(error);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  return (
    <div>
      <h1>Distance Calculator</h1>
      <button onClick={getLocationAndCalculateDistance} disabled={loading}>
        {loading ? "Calculating..." : "Calculate Distance"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {distance !== null && (
        <div>
          <DistanceGauge distance={distance} /> {/* Pass the distance to the gauge */}
        </div>
      )}
    </div>
  );
};

export default DistanceCalculator;
