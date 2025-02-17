import React from "react";
import CartItem from "../../components/CartItem";
import { useCart } from "../../context/CartContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

const OrderCart = ({ isCartOpen, toggleCart }) => {
  const { cartItems, removeFromCart } = useCart();
  // const [, setPizzaData] = useState([]);
  const navigate = useNavigate();

  // // Fetch pizza data from an API or database
  // useEffect(() => {
  //   const fetchPizzaData = async () => {
  //     try {
  //       const response = await fetch("/api/pizzas");
  //       const data = await response.json();
  //       setPizzaData(data);
  //     } catch (error) {
  //       toast.error("Failed to fetch pizza data");
  //     }
  //   };

  //   fetchPizzaData();
  // }, []);

  const cartText = (items) => {
    if (items === 0) {
      return "Your cart is empty! Do you want to add something?";
    }

    if (items === 1) {
      return "You have 1 item in the cart";
    }

    return `You have ${items} items in the cart`;
  };

  const totalAmount = parseFloat(
    cartItems.reduce((total, item) => total + item.price, 0).toFixed(2),
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast.error("Please add items to cart first");
      return;
    }
    navigate("/checkout");
  };

  return (
    <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
      <div className="order-cart-header">
        <button onClick={toggleCart} className="close-button">
          &times;
        </button>
        <h1 className="order-title">Order Cart</h1>
        <p className="order-text">{cartText(cartItems.length)}</p>
      </div>
      <ul className="order-cart-list">
        {cartItems.map((item, index) => (
          <CartItem
            key={item.id || `cart-item-${index}`}
            item={item}
            onRemove={removeFromCart}
          />
        ))}
      </ul>
      <div className="order-cart-footer">
        <p className="order-cart-footer-text">
          Total:
          <span className="order-cart-footer-price">€{totalAmount}</span>
        </p>
        <button onClick={handleCheckout} className="order-cart-footer-btn">
          Checkout
        </button>
      </div>
    </div>
  );
};

export default OrderCart;

OrderCart.propTypes = {
  isCartOpen: PropTypes.bool.isRequired,
  toggleCart: PropTypes.func.isRequired,
};
