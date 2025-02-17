import React from "react";
import { Route, Routes } from "react-router-dom";
// import LogIn from "./components/LogIn"; // Corrected import path
import MenuList from "./components/MenuList";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup"; // Corrected import path
import Checkout from "./pages/Checkout/Checkout";
import Home from "./pages/Home/Home";
import Menu from "./pages/Menu/Menu";
import OrderTracking from "./pages/OrderTracking/OrderTracking";
import StartPage from "./pages/StartPage";
import AboutUs from "./pages/AboutUs";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<Home />} />
        <Route path="/menu" element={<Menu />}>
          <Route path="" element={<MenuList />} />
          <Route path=":filter" element={<MenuList />} />
        </Route>
        <Route path="/about-us" element={<AboutUs />} />

        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-tracking" element={<OrderTracking />} />
      </Routes>
    </div>
  );
};

export default App;
