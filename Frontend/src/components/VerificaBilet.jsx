import axios from "axios";
import React, { useState } from "react";
import Ticket from "./Ticket";

export default function VerificaBilet() {
  const [ticketCode, setTicketCode] = useState("");
  const [ticketData, setTicketData] = useState({});
  const [ticketValide, setTicketValide] = useState(false);
  const [festivalData, setFestivalData] = useState({});
  const [error, setError] = useState("");

  const handleVerifyTicket = async () => {
    try {
      const ticketResponse = await axios.get(
        `https://localhost:7027/api/Festival/GetTicketByCode/${ticketCode}`
      );

      if (ticketResponse.status === 200) {
        const ticketData = ticketResponse.data;
        setTicketData(ticketData);
        setTicketValide(true);
        setError("");

        const festivalResponse = await axios.get(
          `https://localhost:7027/api/Festival/GetFestivalById/${ticketData.ticket.festivalID}`
        );

        if (festivalResponse.status === 200) {
          setFestivalData(festivalResponse.data);
        }
      }
    } catch (error) {
      console.error(error);
      setTicketValide(false);
      setError("The ticket entered does not exist.");
    }
  };
  return (
    <div>
      <div>
        <input
          type="text"
          className="bg-white border py-1 pl-2 rounded-l-lg focus:outline-none font-medium"
          placeholder="Enter the ticket code"
          onChange={(e) => setTicketCode(e.target.value)}
        />
        <button
          className="bg-blue-500 border border-l-0 text-white py-1 px-4 rounded-r-lg font-semibold hover:bg-blue-600 transition-all duration-300"
          onClick={handleVerifyTicket}
        >
          Check ticket
        </button>
      </div>
      {ticketValide && (
        <div>
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4">
            <strong className="font-bold">Valid ticket!</strong>
          </div>
          <div className="w-2/5 mt-4">
            <Ticket
              uniqueCode={ticketData.uniqueCode}
              festivalName={festivalData.name}
              tipBilet={ticketData.ticket.ticketType}
            />
          </div>
        </div>
      )}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
          <strong className="font-bold">{error}</strong>
        </div>
      )}
    </div>
  );
}
