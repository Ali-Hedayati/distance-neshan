import React from "react";
import GaugeChart from "react-gauge-chart";

interface DistanceGaugeProps {
  distance: number;
}

const DistanceGauge: React.FC<DistanceGaugeProps> = ({ distance }) => {
  // Convert the distance to a fraction of 1, assuming the max distance is 100 km (100,000 meters)
  const maxDistance = 100000; // 100 km
  const normalizedValue = Math.min(distance / maxDistance, 1);

  return (
    <div>
      <h2>Distance Gauge</h2>
      <GaugeChart
        id="distance-gauge"
        nrOfLevels={20}
        percent={normalizedValue}
        textColor="#000"
        needleColor="#345243"
        colors={["#FF5F6D", "#FFC371"]}
        arcWidth={0.3}
      />
      <p>{(distance / 1000).toFixed(2)} km</p> {/* Display distance in kilometers */}
    </div>
  );
};

export default DistanceGauge;
