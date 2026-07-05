import React from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import "../styles/nav.css";

import TEST_ID from "./Nav.testid";

const Nav = () => {
  return (
    <nav className="nav">
      <Link className="nav-brand" to="/home" aria-label="NomNom home">
        Nom<span>Nom</span>
      </Link>
      <div className="nav-actions">
        <ul className="nav-list">
          <li className="nav-list-item">
            <Link
              className="nav-list-link"
              to="/home"
              data-testid={TEST_ID.linkToHome}
            >
              Home
            </Link>
          </li>
          <li className="nav-list-item">
            <Link
              className="nav-list-link"
              to="/about-us"
              data-testid={TEST_ID.linkToAboutUs}
            >
              About Us
            </Link>
          </li>
        </ul>
        <LogoutBtn />
      </div>
    </nav>
  );
};

export default Nav;
