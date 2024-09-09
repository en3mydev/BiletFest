import axios from "axios";
import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { IoTicketOutline } from "react-icons/io5";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "https://localhost:7027/api/User/login",
        {
          password: loginPassword,
          email: loginEmail,
        }
      );

      const { token } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("email", loginEmail);

      setErrorMessage("You have successfully logged in!");
      console.log(response);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      setErrorMessage("Invalid email or password");
    }
  };

  return (
    <>
      <div className="login-page">
        <div className="login-header">
          <div className="login-header__left">
            <Link to="/">
              BiletFest
              <IoTicketOutline className="inline text-2xl" />
            </Link>
          </div>
          <div className="login-header__middle">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          <div className="login-header__right"></div>
        </div>
        <div className="login-body">
          <form className="login-form">
            {errorMessage ? <h2>{errorMessage}</h2> : <h2>Login</h2>}
            <input
              type="email"
              placeholder="Enter email"
              className="login-email mt-2 focus:outline-none"
              onChange={(e) => setLoginEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="login-password focus:outline-none"
              onChange={(e) => setLoginPassword(e.target.value)}
            />
            <button onClick={handleLogin}>
              Continue <FaArrowRight />
            </button>
          </form>
          <p className="forgot-password">
            <Link to="/register">Forgot your password?</Link>
          </p>
        </div>
      </div>
    </>
  );
}
