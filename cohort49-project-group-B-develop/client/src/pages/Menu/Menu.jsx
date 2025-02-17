import React, { useState, useEffect } from "react";
import Filters from "../../components/Filters";
import Nav from "../../components/Nav";
import "../../styles/menu.css";
import OrderCart from "../OrderCarts/OrderCart";
import OrderCardIcon from "../../img/order-card.svg";

const Menu = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <div className="menu">
      <Nav />
      <div className="menu-wrap">
        <h1 className="menu-title">Menu</h1>
        <button className="order-card-btn" onClick={toggleCart}>
          <img src={OrderCardIcon} alt="bag" className="order-card-icon" />
        </button>
      </div>

      <Filters />
      <OrderCart isCartOpen={isCartOpen} toggleCart={toggleCart} />
      <div
        className={`overlay ${isCartOpen ? "show" : ""}`}
        onClick={toggleCart}
      ></div>
    </div>
  );
};

export default Menu;
