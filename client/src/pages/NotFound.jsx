import React from "react";
import { Link } from "react-router-dom";
import "../styles/not-found.css";

const NotFound = () => {
  return (
    <div className="not-found">
      <h1 className="not-found-code">404</h1>
      <p className="not-found-title">Page Not Found</p>
      <p className="not-found-text">
        The page you are looking for does not exist or has moved.
      </p>
      <Link className="not-found-link" to="/">
        Back to start
      </Link>
    </div>
  );
};

export default NotFound;
