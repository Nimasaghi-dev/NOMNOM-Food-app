import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/logout.css";
import { clearLS } from "../util/clearLS";
const LogoutBtn = () => {
  const navigate = useNavigate();

  const logout = () => {
    navigate("/");
    clearLS();
  };

  return (
    <button onClick={logout} className="logout-btn">
      logout
    </button>
  );
};

export default LogoutBtn;
