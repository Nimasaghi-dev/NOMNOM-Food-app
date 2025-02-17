import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import BackBtn from "../../components/BackBtn";
import "../../styles/checkout.css";
import card from "../../img/Card.svg";
//add navigate tracking page inside checkout

const Checkout = () => {
  const navigate = useNavigate();

  const { cartItems } = useCart();
  const [address, setAddress] = useState("");
  const [paymentMethod] = useState("Cash"); // Fixed payment method for now

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const handleSubmit = async (event) => {
    navigate("/order-tracking");

    event.preventDefault();
    if (!address) {
      toast.error("Please provide your address");
      return;
    }

    // prepare the order data
    const orderData = {
      cartItems,
      totalAmount,
      address,
      paymentMethod,
      restaurant_id: "exampleRestaurantId", // Replace with actual restaurant ID
    };

    try {
      // Make API call to submit the order
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit order");
      }

      toast.success("Order submitted successfully!");
      // Optionally, clear the cart, navigate to an order confirmation page, etc.
    } catch (error) {
      toast.error("Error submitting the order. Please try again.");
    }
  };

  return (
    <div className="checkout">
      <div className="checkout-header">
        <BackBtn />
        <h2 className="checkout-title">Checkout</h2>
      </div>
      <form onSubmit={handleSubmit} className="checkout-form">
        <label htmlFor="address" className="checkout-form-label">
          Shipping Address:
          <input
            className="checkout-form-input"
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Enter your address"
          />
        </label>

        <div className="checkout-order-summary">
          <h3 className="checkout-order-summary-title">Order Summary</h3>
          <ul className="checkout-order-summary-list">
            {cartItems.map((item, index) => (
              <li className="checkout-order-summary-item" key={index}>
                <p className="checkout-order-summary-item-name">
                  {item.food_name}
                </p>{" "}
                {/* Display item name */}
                <p className="checkout-order-summary-item-price">
                  €{item.price.toFixed(2)}
                </p>
                {/* Display item price */}
              </li>
            ))}
          </ul>
          <div className="checkout-order-summary-total-wrap">
            <p>Total:</p>
            <p>€{totalAmount.toFixed(2)}</p>
          </div>
        </div>

        <div className="checkout-payment-method-wrap">
          <h3 className="checkout-payment-method-title">Payment Method</h3>
          <div>
            <img
              src={card}
              alt="Card"
              className="checkout-payment-method-icon"
            />
            <p className="checkout-payment-method-text">{paymentMethod}</p>
          </div>
        </div>

        <button
          type="submit"
          onClick={handleSubmit}
          className="checkout-submit-btn"
        >
          Order Now
        </button>
      </form>
    </div>
  );
};

export default Checkout;
