import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { FaTicket } from "react-icons/fa6";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Payment from "../components/Payment";
import axios from "axios";

export default function Checkout() {
  const [deliveryMethod, setDeliveryMethod] = useState("1");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("40");
  const location = useLocation();
  const state = location.state;

  const getFirstName = (fullname) => {
    const names = fullname.split(" ");
    return names[0];
  };

  const getLastName = (fullname) => {
    const names = fullname.split(" ");
    return names[names.length - 1];
  };

  if (!state) {
    return <p>You have not selected any tickets</p>;
  }

  const getUser = async () => {
    try {
      const response = await axios.get(
        "https://localhost:7027/api/User/get-user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setFirstName(getFirstName(response.data.fullName));
      setLastName(getLastName(response.data.fullName));
      setEmail(response.data.email);
    } catch (error) {
      console.error(error);
    }
  };

  const token = localStorage.getItem("token");

  const handleFirstSubmit = (e) => {
    if (token) {
      setPhone("40");
      setDeliveryMethod("3");
      getUser();
    } else {
      setDeliveryMethod("2");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setDeliveryMethod("3");
  };

  return (
    <div className="flex justify-center gap-10 py-10">
      <div className="container border px-10 py-6 w-96 bg-white h-fit">
        <h1 className="font-bold text-2xl">My order</h1>
        <hr />
        <div className="flex items-center gap-4 mt-4 mb-2">
          <FaTicket size={40} className="self-start text-accent" />
          <div>
            <h2 className="mb-2 font-bold text-xl">{state.festivalName}</h2>
            <p>{state.location}</p>
            <p>{state.date}</p>
          </div>
        </div>
        <hr />
        <div className="my-2">
          {Object.entries(state.tickets).map(([ticketType, count]) => (
            <p key={ticketType}>
              {count} x {ticketType}
            </p>
          ))}
        </div>
        <hr />
        <p className="my-2">
          Total price:{" "}
          {state.hasVoucher ? (
            <span>{state.totalPrice.toFixed(2)} lei</span>
          ) : (
            <span className="font-bold">{state.totalPrice.toFixed(2)} lei</span>
          )}
        </p>
        {state.hasVoucher && (
          <div>
            <hr />
            <p className="my-2">
              Total price with discount:{" "}
              <span className="font-bold">
                {state.discountedPrice.toFixed(2)} lei
              </span>
            </p>
          </div>
        )}
      </div>
      {deliveryMethod === "1" && (
        <div className="container border px-10 py-6 w-[500px] bg-white h-fit">
          <h1 className="font-bold text-2xl">Method of delivery</h1>
          <hr />
          <div className="flex items-center justify-between py-3">
            <p>Electronic ticket (SMS + email)</p>
            <div className="flex items-center gap-2">
              <p className="text-neutral-500">Soon</p>
              <button
                disabled
                className="bg-gray-300 text-white px-4 py-1 rounded"
              >
                Choose
              </button>
            </div>
          </div>
          <hr />
          <div className="flex items-center justify-between py-3">
            <p>Electronic ticket (email)</p>
            <button
              className="bg-accent text-white px-4 py-1 rounded"
              onClick={handleFirstSubmit}
            >
              Choose
            </button>
          </div>
        </div>
      )}
      {deliveryMethod === "2" && (
        <div className="container border px-10 py-6 w-[600px] bg-white h-fit">
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-4">
              <label htmlFor="Prenume" className="block text-lg w-1/2">
                First name
                <input
                  type="text"
                  id="Prenume"
                  required
                  className="block border w-full py-1 px-2 mt-1 bg-white rounded-lg caret-blue-500 focus:outline-none focus:ring-2 focus:ring-accent"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  autoFocus
                />
              </label>
              <label htmlFor="Nume" className="block text-lg w-1/2">
                Last name
                <input
                  type="text"
                  id="Nume"
                  className="block border w-full py-1 px-2 mt-1 bg-white rounded-lg caret-blue-500 focus:outline-none focus:ring-2 focus:ring-accent"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </label>
            </div>
            <div className="flex items-center gap-4 mt-6">
              <label htmlFor="email" className="block text-lg w-7/12">
                Email
                <input
                  type="email"
                  required
                  id="email"
                  className="block border w-full py-1 px-2 mt-1 bg-white rounded-lg caret-blue-500 focus:outline-none focus:ring-2 focus:ring-accent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label htmlFor="phone" className="block text-lg w-5/12">
                Phone
                <PhoneInput
                  country={"ro"}
                  value={phone}
                  onChange={(value) => setPhone(value)}
                  inputProps={{
                    name: "phone",
                  }}
                  inputStyle={{
                    border: "1px solid #ccc",
                    width: "100%",
                    height: "40px",
                    fontSize: "16px",
                    padding: "2px 0 0 44px",
                    borderRadius: "10px",
                  }}
                />
              </label>
            </div>
            <label htmlFor="terms" className="flex mt-6 gap-2 items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
              />
              I want to receive notifications about future events.
            </label>
            <label htmlFor="terms" className="flex mt-6 gap-2 items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                required
              />
              I agree that my contact data will be sent to the organizer.
            </label>
            <label htmlFor="terms" className="flex mt-6 gap-2 items-center">
              <input
                type="checkbox"
                className="checkbox checkbox-primary checkbox-sm"
                required
              />
              I agree to the terms and conditions.
            </label>
            <button
              type="submit"
              className="bg-accent text-white px-4 py-2 rounded-lg mt-10 block mx-auto hover:bg-primary"
            >
              Complete the order
            </button>
          </form>
        </div>
      )}
      {deliveryMethod === "3" && (
        <div className="container border px-10 py-6 w-[600px] bg-white h-fit">
          <Payment
            state={{
              ...state,
              firstName,
              lastName,
              email,
              phone,
            }}
          />
        </div>
      )}
    </div>
  );
}
