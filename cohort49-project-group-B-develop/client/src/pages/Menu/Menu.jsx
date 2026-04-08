import React, { useState, useEffect } from "react";
import Filters from "../../components/Filters";
import Nav from "../../components/Nav";
import "../../styles/menu.css";
import OrderCart from "../OrderCarts/OrderCart";
import OrderCardIcon from "../../img/order-card.svg";
import { useCart } from "../../context/CartContext";

const Menu = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems } = useCart();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  useEffect(() => {
    // Lock body scroll when the cart sidebar is open
    document.body.style.overflow = isCartOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isCartOpen]);

  return (
    <div className="menu">
      <Nav />
      <div className="menu-wrap">
        <h1 className="menu-title">Menu</h1>

        {/* Cart button with badge showing number of items */}
        <button className="order-card-btn" onClick={toggleCart}>
          <img src={OrderCardIcon} alt="bag" className="order-card-icon" />
          {cartItems.length > 0 && (
            <span className="cart-badge">{cartItems.length}</span>
          )}
        </button>
      </div>

      <Filters />
      <OrderCart isCartOpen={isCartOpen} toggleCart={toggleCart} />
      <div
        className={`overlay ${isCartOpen ? "show" : ""}`}
        onClick={toggleCart}
      />
    </div>
  );
};

export default Menu;
