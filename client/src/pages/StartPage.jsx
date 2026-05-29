import React from "react";
import logo from "../img/logo.png";
import { Link } from "react-router-dom";
import "../styles/startPage.css";
import "../index.css";

const StartPage = () => {
  return (
    <div className="start-page">
      <img className="start-page-logo" src={logo} alt="logo" />
      <h1 className="start-page-title">
        NOM<span>NOM</span>
      </h1>
      <p className="start-page-text">Your favorite food, just a tap away.</p>
      <Link className="start-page-link" to="/login">
        Log In
      </Link>
    </div>
  );
};

export default StartPage;
