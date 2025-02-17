import React from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../img/back-icon.png";

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate(-1)} className="back-button">
      <img src={backIcon} alt="" />
    </button>
  );
};

export default BackButton;
