import React from "react";
import AvailableRestaurants from "../../components/AvailableRestaurants";
import LogoutBtn from "../../components/LogoutBtn";
import TEST_ID from "./Home.testid";
import Footer from "../../components/Footer";
import "../../styles/home.css";

const Home = () => {
  return (
    <div data-testid={TEST_ID.container} className="home">
      <div className="home-header">
        <h1 className="home-header-title">Hello!</h1>
        <LogoutBtn />
      </div>
      <AvailableRestaurants />
      <Footer />
    </div>
  );
};

export default Home;
