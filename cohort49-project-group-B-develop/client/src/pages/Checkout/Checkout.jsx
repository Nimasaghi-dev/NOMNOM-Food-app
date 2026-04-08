import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import useFetch from "../../hooks/useFetch";
import BackBtn from "../../components/BackBtn";
import "../../styles/checkout.css";
import card from "../../img/Card.svg";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();
  const [address, setAddress] = useState("");
  const [paymentMethod] = useState("Cash");

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  // Navigate to order tracking only after the server confirms the order was saved
  const onOrderSuccess = () => {
    toast.success("Order submitted successfully!");
    navigate("/order-tracking");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/order",
    onOrderSuccess,
  );

  // Cancel any in-flight fetch if the user navigates away mid-submit
  useEffect(() => {
    return cancelFetch;
  }, []);

  // Show a toast whenever the API call fails
  useEffect(() => {
    if (error) {
      toast.error("Error submitting the order. Please try again.");
    }
  }, [error]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!address.trim()) {
      toast.error("Please provide your address");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    // Map cart items to the shape the Order model expects
    const orderItems = cartItems.map((item) => ({
      id: item._id || item.id,
      name: item.food_name,
      price: item.price,
      quantity: item.quantity || 1,
      imgId: item.imgId,
    }));

    performFetch({
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: orderItems,
        // Use snake_case to match the Order model field name
        total_amount: totalAmount,
        address,
        paymentMethod,
      }),
    });
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
                </p>
                <p className="checkout-order-summary-item-price">
                  €{item.price.toFixed(2)}
                </p>
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

        {/* Disable the button while the request is in progress to prevent double-submit */}
        <button
          type="submit"
          className="checkout-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Placing Order..." : "Order Now"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
