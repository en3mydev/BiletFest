import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import emailjs from "@emailjs/browser";

const Payment = ({ state }) => {
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);
  const [loading, setLoading] = useState(false);

  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID2;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const sendEmail = (orderData) => {
    const templateParams = {
      to_name: state.email,
      from_name: "BiletFest",
      festivalName: state.festivalName,
      date: state.date,
      location: state.location,
      totalPrice: state.hasVoucher ? state.discountedPrice : state.totalPrice,
      tickets: orderData.ticketCodes.map((ticket) => ({
        ticketType: state.allTickets.find((t) => t.ticketID === ticket.ticketID)
          .ticketType,
        qrCodes: ticket.codes.map((code) => ({
          qr: `https://api.qrserver.com/v1/create-qr-code/?data=${code}&size=150x150`,
          code: code,
        })),
      })),
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
      },
      (error) => {
        console.log("FAILED...", error);
      }
    );
  };

  const stripe = useStripe();
  const elements = useElements();
  const amount = state.hasVoucher
    ? Math.round(Number(state.discountedPrice.toFixed(2)) * 100)
    : Math.round(state.totalPrice * 100);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[createPaymentMethod error]", error);
      return;
    }

    const response = await fetch(
      "http://localhost:3001/create-payment-intent",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: amount }),
      }
    );
    setLoading(true);
    console.log("Amount:", amount);

    const paymentIntentData = await response.json();

    const { error: confirmError } = await stripe.confirmCardPayment(
      paymentIntentData.clientSecret,
      {
        payment_method: paymentMethod.id,
      }
    );

    if (confirmError) {
      console.log("[confirmCardPayment error]", confirmError);
    } else {
      setIsPaymentSuccessful(true);

      const uniqueCodes = {};
      Object.keys(state.tickets).forEach((ticketType) => {
        uniqueCodes[ticketType] = Array.from({
          length: state.tickets[ticketType],
        }).map(() => uuidv4().substr(0, 7).toUpperCase());
      });

      const findTicketByTicketType = (ticketType) => {
        return state.allTickets.find(
          (ticket) => ticket.ticketType === ticketType
        ).ticketID;
      };

      const orderData = {
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        phone: state.phone,
        totalPrice: state.totalPrice,
        discountedPrice: state.discountedPrice,
        hasVoucher: state.hasVoucher,
        ticketCodes: Object.keys(state.tickets).map((ticketType) => ({
          ticketID: findTicketByTicketType(ticketType),
          codes: uniqueCodes[ticketType],
        })),
      };

      try {
        const orderResponse = await axios.post(
          "https://localhost:7027/api/Order/CreateOrder",
          orderData
        );
        if (orderResponse.status === 200) {
          console.log("Order created successfully!");
          sendEmail(orderData);
          setTimeout(() => {
            navigate("/order-confirmation", {
              state: { ...state, uniqueCodes },
            });
          }, 3000);
        }
      } catch (orderError) {
        console.error("Error creating order:", orderError);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="mb-6 text-lg">Enter your card details</h1>
      <CardElement />
      <p className="mt-4 text-neutral-400">
        The payment amount is{" "}
        {state.hasVoucher
          ? state.discountedPrice.toFixed(2)
          : state.totalPrice.toFixed(2)}{" "}
        RON.
      </p>
      <p className="text-neutral-400">
        Payment will be made in a safe and secure environment.
      </p>
      {isPaymentSuccessful && (
        <p className="text-accent mt-4 font-bold">
          Payment has been made successfully! You will be redirected to the page
          of order confirmation.
        </p>
      )}
      <button
        className="bg-accent text-white px-4 py-1 rounded mt-4 flex items-center hover:bg-primary"
        type="submit"
        disabled={!stripe || loading}
      >
        {loading ? (
          <span className="loading loading-spinner loading-xs"></span>
        ) : (
          "Pay"
        )}
      </button>
    </form>
  );
};

export default Payment;
