import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";

// Route-based code-splitting: each page is loaded on demand, keeping the
// initial bundle small.
const StartPage = lazy(() => import("./pages/StartPage"));
const Login = lazy(() => import("./pages/Auth/Login"));
const Signup = lazy(() => import("./pages/Auth/Signup"));
const Home = lazy(() => import("./pages/Home/Home"));
const Menu = lazy(() => import("./pages/Menu/Menu"));
const MenuList = lazy(() => import("./components/MenuList"));
const Checkout = lazy(() => import("./pages/Checkout/Checkout"));
const OrderTracking = lazy(() => import("./pages/OrderTracking/OrderTracking"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  return (
    <main className="App">
      <Suspense fallback={<LoadingSpinner />}>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </main>
  );
};

export default App;
