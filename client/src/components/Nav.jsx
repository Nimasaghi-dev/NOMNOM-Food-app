import React from "react";
import { Link } from "react-router-dom";
import LogoutBtn from "./LogoutBtn";
import "../styles/nav.css";

import TEST_ID from "./Nav.testid";

const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className="nav-list-item">
          <Link className="nav-list-link" to="/home">
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
    </nav>
  );
};

export default Nav;
