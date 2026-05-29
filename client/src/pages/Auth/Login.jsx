import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import Input from "../../components/Input";
import AuthHeader from "../../components/AuthHeader";
import "../../styles/login.css";
import eyeOpen from "../../img/eye-open.svg";
import eyeClosed from "../../img/eye-close.svg";
import LoadingSpinner from "../../components/LoadingSpinner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSuccess = () => {
    setEmail("");
    setPassword("");

    setTimeout(() => {
      navigate("/home");
    }, 300);
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  const { isLoading, error, performFetch, cancelFetch } = useFetch(
    "/login",
    onSuccess,
  );

  useEffect(() => {
    return cancelFetch;
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };

    performFetch({
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  let statusComponent = null;
  if (error != null) {
    const message = error.message || "An error occurred";
    statusComponent = <div className="login-status">Oops: {message}</div>;
  } else if (isLoading) {
    statusComponent = <LoadingSpinner />;
  }

  return (
    <div className="login">
      <AuthHeader text="Log In" />
      <div className="login-wrap">
        <h3 className="login-title">Welcome</h3>
        <p className="login-text">
          Ready to satisfy your cravings? Log in to explore your favorite
          restaurants, browse menus, and place your next order in just a few
          clicks.
        </p>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-form-label" htmlFor="email">
            Email
            <Input
              name="email"
              value={email}
              onChange={(value) => setEmail(value)}
              className="login-form-input"
              type="email"
            />
          </label>
          <label htmlFor="password" className="login-form-label">
            Password
            <Input
              name="password"
              value={password}
              onChange={(value) => setPassword(value)}
              className="login-form-input"
              type={isPasswordVisible ? "text" : "password"}
            />
            <img
              src={isPasswordVisible ? eyeClosed : eyeOpen}
              alt=""
              onClick={togglePasswordVisibility}
              className="toggle-password"
            />
          </label>

          <button className="login-form-button" type="submit">
            Login
          </button>
        </form>
        {statusComponent}
        <div className="login-footer">
          Don`t have an account yet?{" "}
          <Link to={"/signup"} className="login-footer-link">
            Signup
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
