import React, { useEffect, useState } from "react";
import "../../styles/OrderTracking.css"; // CSS dosyasını import ediyoruz
import { useNavigate } from "react-router-dom";
import { clearLS } from "../../util/clearLS";

const OrderTracking = () => {
  const [counter, setCounter] = useState(25 * 60); // 25 minutes in seconds
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prevCounter) => (prevCounter > 0 ? prevCounter - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div className="order-tracking">
      <h1 className="order-tracking-title">Order Tracking</h1>
      <div className="order-tracking-wrap">
        <p className="order-tracking-text">
          Your order is being prepared. Estimated delivery time:
        </p>
        <h2 className="order-tracking-counter">{formatTime(counter)}</h2>
        <div className="pizza-animation">
          <span role="img" aria-label="pizza">
            🍕
          </span>
        </div>
        <p className="order-tracking-text">Your pizza is on the way!</p>

        <button
          onClick={() => {
            navigate("/home");
            clearLS();
          }}
          className="order-tracking-button"
        >
          Home
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
