import React from "react";
import "../styles/footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="footer-text">&copy; 2025 App Name. Designed with love.</p>
      <p className="footer-link-text">
        <a
          className="footer-link"
          href="https://github.com/HackYourFuture/cohort49-project-group-B"
          target="blank"
        >
          Terms & Conditions
        </a>
        |
        <a
          className="footer-link"
          href="https://github.com/HackYourFuture/cohort49-project-group-B"
          target="blank"
        >
          Privacy Policy
        </a>
        |
        <a
          className="footer-link"
          href="https://github.com/HackYourFuture/cohort49-project-group-B"
          target="blank"
        >
          Contact us
        </a>
      </p>
    </footer>
  );
};

export default Footer;
