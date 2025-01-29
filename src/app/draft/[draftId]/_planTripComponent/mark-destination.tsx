import React from "react";

interface MarkerProps {
  number: number; // The number to display in the marker
}

const Marker: React.FC<MarkerProps> = ({ number }) => {
  return (
    <div
      style={{
        // position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "40px",
        height: "40px",
        backgroundColor: "#c3e6cb", // Light green color
        borderRadius: "50%",
        border: "2px solid white",
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
      }}
    >
      <span
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#000",
        }}
      >
        {number}
      </span>
    </div>
  );
};

export default Marker;
