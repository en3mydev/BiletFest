import React from "react";
import { useLocation } from "react-router-dom";
import Ticket from "../components/Ticket";

export default function OrderConfirmation() {
  const location = useLocation();
  const state = location.state;

  if (!state) {
    return <p>Nu ai selectat niciun bilet</p>;
  }

  const tickets = state.tickets;

  return (
    <div className="py-10 min-[1460px]:px-32 min-[1700px]:px-52">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">
          Thank you for your order, {state.firstName}!
        </h1>
        <p>
          Your order confirmation has been sent to your email address{" "}
          <span className="font-medium">{state.email}</span>. Please also check
          your spam folder.
        </p>
        <p>
          We are waiting for you{" "}
          <span className="font-semibold">{state.festivalName}!</span>
        </p>

        {Object.values(tickets).reduce((a, b) => a + b, 0) > 1 ? (
          <h3 className="my-6 font-bold text-xl">These are your tickets:</h3>
        ) : (
          <h3 className="my-6 font-bold text-xl">This is your ticket:</h3>
        )}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 justify-center px-20">
        {Object.keys(tickets).map((ticketType) =>
          Array.from({ length: tickets[ticketType] }).map((_, index) => (
            <Ticket
              key={`${ticketType}-${index}`}
              festivalName={state.festivalName}
              tipBilet={ticketType}
              uniqueCode={
                state.uniqueCodes[ticketType] &&
                state.uniqueCodes[ticketType][index]
              }
            />
          ))
        )}
      </div>
    </div>
  );
}
