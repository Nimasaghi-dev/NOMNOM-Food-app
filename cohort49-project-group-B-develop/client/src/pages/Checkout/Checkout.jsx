import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useCart } from "../../context/CartContext";
import useFetch from "../../hooks/useFetch";
import BackBtn from "../../components/BackBtn";
import "../../styles/checkout.css";

// ── helpers ──────────────────────────────────────────────────────────────────

// Format raw digits into groups: "4111111111111111" → "4111 1111 1111 1111"
const formatCardNumber = (value) =>
  value
    .replace(/\D/g, "")
    .slice(0, 16)
    .replace(/(.{4})/g, "$1 ")
    .trim();

// Format expiry: "1226" → "12/26"
const formatExpiry = (value) => {
  const digits = value.replace(/\D/g, "").slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

// Mask all but the last 4 digits for the card preview
const maskCardNumber = (value) => {
  const digits = value.replace(/\D/g, "");
  const masked = digits.slice(0, 12).replace(/\d/g, "•") + digits.slice(12);
  return masked.replace(/(.{4})/g, "$1 ").trim() || "•••• •••• •••• ••••";
};

// ── payment method definitions ────────────────────────────────────────────────

const PAYMENT_METHODS = [
  { id: "cash", label: "Cash on Delivery", icon: "💵" },
  { id: "card", label: "Credit / Debit Card", icon: "💳" },
  { id: "paypal", label: "PayPal", icon: "🅿️" },
];

// ── component ─────────────────────────────────────────────────────────────────

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  // Form state
  const [address, setAddress] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("cash");

  // Credit card fields (only used when selectedMethod === "card")
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCvv] = useState("");
  // Flip the card to show CVV on the back while user types it
  const [cardFlipped, setCardFlipped] = useState(false);

  const totalAmount = cartItems.reduce((total, item) => total + item.price, 0);

  const onOrderSuccess = () => {
    localStorage.setItem("deliveryAddress", address);
    toast.success("🎉 Order placed! Get ready for your food.");
    navigate("/order-tracking");
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/order",
    onOrderSuccess,
  );

  useEffect(() => () => cancelFetch(), []);

  useEffect(() => {
    if (error) toast.error("Could not place order. Please try again.");
  }, [error]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address.trim()) {
      toast.error("Please enter your delivery address.");
      return;
    }
    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    // Basic credit-card field validation
    if (selectedMethod === "card") {
      if (cardNumber.replace(/\s/g, "").length < 16) {
        toast.error("Please enter a valid 16-digit card number.");
        return;
      }
      if (!cardName.trim()) {
        toast.error("Please enter the cardholder name.");
        return;
      }
      if (cardExpiry.length < 5) {
        toast.error("Please enter a valid expiry date (MM/YY).");
        return;
      }
      if (cardCvv.length < 3) {
        toast.error("Please enter a valid CVV.");
        return;
      }
    }

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
        total_amount: totalAmount,
        address,
        // Send the human-readable label so it's readable in the DB
        paymentMethod:
          PAYMENT_METHODS.find((m) => m.id === selectedMethod)?.label,
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

        {/* ── Delivery address ── */}
        <section className="checkout-section">
          <h3 className="checkout-section-title">📍 Delivery Address</h3>
          <input
            className="checkout-address-input"
            id="address"
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            placeholder="Street, city, postcode…"
          />
        </section>

        {/* ── Order summary ── */}
        <section className="checkout-section">
          <h3 className="checkout-section-title">🧾 Order Summary</h3>
          <ul className="checkout-order-summary-list">
            {cartItems.map((item, index) => (
              <li className="checkout-order-summary-item" key={index}>
                <span className="checkout-order-summary-item-name">
                  {item.food_name}
                </span>
                <span className="checkout-order-summary-item-price">
                  €{item.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="checkout-total-row">
            <span>Total</span>
            <span className="checkout-total-amount">
              €{totalAmount.toFixed(2)}
            </span>
          </div>
        </section>

        {/* ── Payment method ── */}
        <section className="checkout-section">
          <h3 className="checkout-section-title">💳 Payment Method</h3>

          <div className="checkout-payment-methods">
            {PAYMENT_METHODS.map((method) => (
              <button
                key={method.id}
                type="button"
                className={`checkout-payment-card ${
                  selectedMethod === method.id ? "selected" : ""
                }`}
                onClick={() => setSelectedMethod(method.id)}
              >
                <span className="checkout-payment-card-icon">{method.icon}</span>
                <span className="checkout-payment-card-label">{method.label}</span>
                {/* Checkmark shown on the selected method */}
                {selectedMethod === method.id && (
                  <span className="checkout-payment-card-check">✓</span>
                )}
              </button>
            ))}
          </div>

          {/* Credit card details — only visible when "card" is selected */}
          {selectedMethod === "card" && (
            <div className="checkout-card-details">

              {/* Live card preview */}
              <div
                className={`credit-card-preview ${cardFlipped ? "flipped" : ""}`}
              >
                <div className="credit-card-front">
                  <div className="credit-card-chip" />
                  <div className="credit-card-number">
                    {maskCardNumber(cardNumber)}
                  </div>
                  <div className="credit-card-bottom">
                    <div>
                      <div className="credit-card-label">Card Holder</div>
                      <div className="credit-card-value">
                        {cardName || "FULL NAME"}
                      </div>
                    </div>
                    <div>
                      <div className="credit-card-label">Expires</div>
                      <div className="credit-card-value">
                        {cardExpiry || "MM/YY"}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="credit-card-back">
                  <div className="credit-card-stripe" />
                  <div className="credit-card-cvv-wrap">
                    <span className="credit-card-label">CVV</span>
                    <span className="credit-card-cvv-value">
                      {"•".repeat(cardCvv.length) || "•••"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Card input fields */}
              <div className="checkout-card-fields">
                <label className="checkout-card-field-label">
                  Card Number
                  <input
                    className="checkout-card-input"
                    type="text"
                    inputMode="numeric"
                    placeholder="1234 5678 9012 3456"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(formatCardNumber(e.target.value))
                    }
                    maxLength={19}
                  />
                </label>

                <label className="checkout-card-field-label">
                  Cardholder Name
                  <input
                    className="checkout-card-input"
                    type="text"
                    placeholder="Name on card"
                    value={cardName}
                    onChange={(e) =>
                      setCardName(e.target.value.toUpperCase())
                    }
                  />
                </label>

                <div className="checkout-card-row">
                  <label className="checkout-card-field-label">
                    Expiry Date
                    <input
                      className="checkout-card-input"
                      type="text"
                      inputMode="numeric"
                      placeholder="MM/YY"
                      value={cardExpiry}
                      onChange={(e) =>
                        setCardExpiry(formatExpiry(e.target.value))
                      }
                      maxLength={5}
                    />
                  </label>

                  <label className="checkout-card-field-label">
                    CVV
                    <input
                      className="checkout-card-input"
                      type="text"
                      inputMode="numeric"
                      placeholder="•••"
                      value={cardCvv}
                      onChange={(e) =>
                        setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))
                      }
                      maxLength={3}
                      // Flip the card when the user focuses on the CVV field
                      onFocus={() => setCardFlipped(true)}
                      onBlur={() => setCardFlipped(false)}
                    />
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* PayPal placeholder */}
          {selectedMethod === "paypal" && (
            <div className="checkout-paypal-note">
              🅿️ You will be redirected to PayPal after placing your order.
            </div>
          )}
        </section>

        <button
          type="submit"
          className="checkout-submit-btn"
          disabled={isLoading}
        >
          {isLoading ? "Placing Order…" : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default Checkout;
