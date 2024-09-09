import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { IoTicketOutline } from "react-icons/io5";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://localhost:7027/api/User/create-user",
        {
          password,
          email,
          fullName: `${firstName} ${lastName}`,
        }
      );

      if (response.status === 200) {
        setErrorMessage(
          "Account created successfully! Redirecting to login..."
        );
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
      console.log(response);
    } catch (error) {
      console.error(error);
      setErrorMessage(error.response.data);
    }
  };

  return (
    <>
      <div className="register-page">
        <div className="register-header">
          <div className="register-header__left">
            <Link to="/">
              BiletFest
              <IoTicketOutline className="inline text-2xl" />
            </Link>
          </div>
          <div className="register-header__middle">
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </div>
          <div className="register-header__right"></div>
        </div>
        <div className="register-body">
          <form action="POST" className="register-form">
            {errorMessage ? (
              <h2 className="text-blue-400">{errorMessage}</h2>
            ) : (
              <h2>Create an account</h2>
            )}
            <div className="register-form__name mt-2">
              <input
                type="text"
                placeholder="First name"
                className="input-firstname focus:outline-none"
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input
                type="text"
                placeholder="Last name"
                className="input-lastname focus:outline-none"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <input
              type="email"
              placeholder="What's your email?"
              className="register-email focus:outline-none"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Create a password"
              className="register-password focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleRegister}>
              Continue <FaArrowRight />
            </button>
          </form>
          <p className="have-account">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </>
  );
}
