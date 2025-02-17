import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { CartProvider } from "./context/CartContext";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import ChangeBodyColor from "./util/changeBodyColor";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <ChangeBodyColor />
      <CartProvider>
        <App />
      </CartProvider>
    </Router>
  </React.StrictMode>,
);
