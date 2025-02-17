import React from "react";
import BackButton from "../components/BackBtn";
import "../styles/about-us.css";

const AboutUs = () => {
  return (
    <div className="about-us">
      <div className="about-us-header">
        <BackButton />
        <h1 className="about-us-title">About us</h1>
      </div>
      <div className="about-us-text-container">
        <p className="about-us-text">
          At NomNom, we believe food is more than just sustenance - it is a way
          to bring people together, create memories, and explore new cultures.
          That is why we have made it our mission to connect you with the best
          local restaurants, offering diverse cuisines and fresh flavors, all at
          your fingertips. <br /> <br /> Our app is designed to make your food
          journey seamless and enjoyable. Whether you are craving a hearty
          pizza, exotic sushi, or comforting homemade dishes, we bring the menu
          to you with a simple, user-friendly interface. Browse restaurants,
          explore menus, and place your order effortlessly - it is all about
          making delicious moments convenient. <br /> <br /> We are committed to
          more than just great food - we care about your time and satisfaction.
          That is why we partner only with trusted restaurants and ensure
          reliable delivery options to make sure your order arrives fresh, hot,
          and on time. From your first click to the last bite, we strive to
          exceed your expectations. <br /> <br /> Join our growing community of
          food lovers and discover how NomNom is redefining the way you enjoy
          dining. With us, your next favorite meal is just a tap away.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
