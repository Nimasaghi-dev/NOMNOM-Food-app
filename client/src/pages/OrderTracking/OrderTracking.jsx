import React, { useEffect, useState } from "react";
import "../../styles/OrderTracking.css";
import { useNavigate } from "react-router-dom";
import { clearLS } from "../../util/clearLS";

// Generate a random delivery time between 20 and 45 minutes
const randomDeliveryMinutes = () => Math.floor(Math.random() * 26) + 20;

const OrderTracking = () => {
  const navigate = useNavigate();

  // Initialise the counter once on mount with a random delivery time
  const [totalSeconds] = useState(() => randomDeliveryMinutes() * 60);
  const [counter, setCounter] = useState(totalSeconds);

  // Read the address the user entered at checkout (stored by Checkout.jsx)
  const [deliveryAddress] = useState(
    () => localStorage.getItem("deliveryAddress") || "",
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCounter((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Progress goes from 100% → 0% as the timer counts down
  const progressPercent = Math.round((counter / totalSeconds) * 100);

  // Build the Google Maps embed URL from the delivery address
  const mapSrc = deliveryAddress
    ? `https://maps.google.com/maps?q=${encodeURIComponent(deliveryAddress)}&output=embed&zoom=15`
    : null;

  return (
    <div className="order-tracking">
      <h1 className="order-tracking-title">Order Tracking</h1>

      <div className="order-tracking-wrap">
        {/* Status pill */}
        <div className="order-tracking-status-pill">
          <span className="order-tracking-pulse" />
          On the way
        </div>

        <p className="order-tracking-text">
          Estimated delivery time:
        </p>

        {/* Large countdown timer */}
        <h2 className="order-tracking-counter">{formatTime(counter)}</h2>

        {/* Progress bar: fills left as time passes */}
        <div className="order-tracking-progress-bar">
          <div
            className="order-tracking-progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Animated pizza icon */}
        <div className="pizza-animation">
          <span role="img" aria-label="pizza">🍕</span>
        </div>

        <p className="order-tracking-text">Your order is on the way!</p>

        {/* Google Maps embed — only shown when an address is available */}
        {mapSrc && (
          <div className="order-tracking-map-wrap">
            <h3 className="order-tracking-map-title">Delivering to:</h3>
            <p className="order-tracking-map-address">{deliveryAddress}</p>
            <iframe
              title="Delivery location"
              src={mapSrc}
              className="order-tracking-map"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        )}

        <button
          onClick={() => {
            clearLS();
            navigate("/home");
          }}
          className="order-tracking-button"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default OrderTracking;
