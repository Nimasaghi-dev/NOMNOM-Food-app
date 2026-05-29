import React from "react";
import PropTypes from "prop-types";
import BackButton from "./BackBtn";
import "../styles/authHeader.css";

const AuthHeader = ({ text }) => {
  return (
    <div className="auth-header">
      <BackButton />
      <h1 className="auth-header-title">{text}</h1>
    </div>
  );
};

AuthHeader.propTypes = {
  text: PropTypes.string.isRequired,
};

export default AuthHeader;
