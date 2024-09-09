import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function NewsletterBanner() {
  const form = useRef();
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const serviceId = process.env.REACT_APP_SERVICE_ID;
  const templateId = process.env.REACT_APP_TEMPLATE_ID;
  const publicKey = process.env.REACT_APP_PUBLIC_KEY;

  const sendEmail = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter an email address!");
      return;
    }

    const templateParams = {
      to_name: email,
      from_name: "BiletFest",
      message:
        "Thank you for subscribing to our newsletter! As a welcome gift, we offer you a voucher for 10% off your next purchase. Use code: WELCOME10.",
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey).then(
      (response) => {
        console.log("SUCCESS!", response.status, response.text);
        setEmail("");
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      },
      (error) => {
        console.log("FAILED...", error);
        alert("Something went wrong. Please try again.");
      }
    );
  };

  return (
    <>
      {showAlert && (
        <div
          role="alert"
          className="alert alert-success mt-4 fixed top-0 right-0 left-0 mx-auto w-3/4 transition-all duration-1000 ease-in-out bg-accent text-white flex flex-row sm:w-fit"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>
            You have successfully subscribed to the BiletFest newsletter!
          </span>
        </div>
      )}
      <div className="bg-primary/40 w-8/12 block mx-auto rounded-2xl py-12 mb-6">
        <h2 className="text-white text-center text-lg font-medium">
          Subscribe now to the <span className="text-blue-500">BiletFest</span>{" "}
          newsletter and receive a 10% discount voucher on your next purchase!
        </h2>
        <form ref={form} onSubmit={sendEmail} className="text-center mt-3">
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white py-2 px-4 rounded-md focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md ml-2 shadow-xl border-blue-800 duration-300 transition-colors hover:bg-blue-600"
          >
            Subscribe
          </button>
        </form>
      </div>
    </>
  );
}
