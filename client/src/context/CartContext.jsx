//  creating context to managing cart globally in the app
import PropTypes from "prop-types";
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    // Load cart from local storage on initialization
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Add an item to the cart
  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const updatedCart = [...prevItems, { ...item, id: Date.now() }]; // Ensure a unique id
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update local storage
      return updatedCart;
    });
  };

  // Remove an item from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => {
      const updatedCart = prevItems.filter((item) => item.id !== id); // Filter out the item with the matching id
      localStorage.setItem("cartItems", JSON.stringify(updatedCart)); // Update local storage
      return updatedCart;
    });
  };

  useEffect(() => {
    // Persist cart in local storage whenever it changes
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
