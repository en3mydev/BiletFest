import axios from "axios";
import React, { useEffect, useState } from "react";
import Ticket from "./Ticket";

export default function BileteCumparate({ email }) {
  const [tickets, setTickets] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [festivalData, setFestivalData] = useState({});

  useEffect(() => {
    const getTickets = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7027/api/Order/GetOrderByEmail/${email}`
        );
        const allTickets = response.data.flatMap((order) => order.orderTickets);
        setTickets(allTickets);
        setDataLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    getTickets();
  }, [email]);

  useEffect(() => {
    const getFestivalNames = async () => {
      try {
        const festivalIds = [
          ...new Set(tickets.map((ticket) => ticket.ticket.festivalID)),
        ];
        const festivalPromises = festivalIds.map((id) =>
          axios.get(`https://localhost:7027/api/Festival/GetFestivalById/${id}`)
        );
        const festivalResponses = await Promise.all(festivalPromises);
        const festivalNames = festivalResponses.reduce((acc, response) => {
          acc[response.data.festivalID] = response.data.name;
          return acc;
        }, {});
        setFestivalData(festivalNames);
      } catch (error) {
        console.error("Error fetching festival data:", error);
      }
    };

    if (tickets.length > 0) {
      getFestivalNames();
    }
  }, [tickets]);

  console.log(tickets);
  console.log(festivalData);

  return (
    <div>
      {dataLoaded ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {tickets.map((ticketx) => (
            <Ticket
              key={ticketx.orderTicketId}
              uniqueCode={ticketx.uniqueCode}
              festivalName={festivalData[ticketx.ticket.festivalID]}
              tipBilet={ticketx.ticket.ticketType}
            />
          ))}
        </div>
      ) : (
        <p>Se incarca...</p>
      )}
    </div>
  );
}
