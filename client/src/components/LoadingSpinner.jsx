import React from "react";
import "../styles/LoadingSpinner.css";

const LoadingSpinner = () => (
  <div className="spinner-container">
    <div className="spinner" />
    <p>Loading...</p>
  </div>
);

export default LoadingSpinner;
