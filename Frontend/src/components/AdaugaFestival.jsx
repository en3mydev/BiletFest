import React, { useState } from "react";
import axios from "axios";

const AdaugaFestival = () => {
  const [festivalData, setFestivalData] = useState({
    name: "",
    location: "",
    date: "",
    description: "",
    price: "",
    rating: "",
    link: "",
    imageUrl: "",
  });
  const [tickets, setTickets] = useState([
    {
      ticketType: "",
      price: 0,
      availableQuantity: 0,
      description: "",
    },
  ]);

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = tickets.map((ticket, i) => {
      if (i === index) {
        return { ...ticket, [field]: value };
      }
      return ticket;
    });
    setTickets(updatedTickets);
  };

  const handleAddTicket = () => {
    setTickets([
      ...tickets,
      {
        ticketType: "",
        price: 0,
        availableQuantity: 0,
        description: "",
      },
    ]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      ...festivalData,
      tickets: tickets,
    };

    console.log(formData);

    try {
      const response = await axios.post(
        "https://localhost:7027/api/Festival/AddFestival",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      alert("Festival adăugat cu succes!");
    } catch (error) {
      console.error("Error submitting festival data:", error);
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <label htmlFor="nume" className="w-32">
              Nume festival
            </label>
            <input
              type="text"
              id="nume"
              name="nume"
              value={festivalData.name}
              onChange={(e) =>
                setFestivalData({ ...festivalData, name: e.target.value })
              }
              className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="locatie" className="w-32">
              Locație
            </label>
            <input
              type="text"
              id="locatie"
              name="locatie"
              value={festivalData.location}
              onChange={(e) =>
                setFestivalData({ ...festivalData, location: e.target.value })
              }
              className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="data" className="w-32">
              Data
            </label>
            <input
              type="text"
              id="data"
              name="data"
              value={festivalData.date}
              onChange={(e) =>
                setFestivalData({ ...festivalData, date: e.target.value })
              }
              className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
            />
          </div>
          <div className="flex items-start">
            <label htmlFor="description" className="w-32">
              Descriere
            </label>
            <textarea
              id="description"
              name="description"
              value={festivalData.description}
              onChange={(e) =>
                setFestivalData({
                  ...festivalData,
                  description: e.target.value,
                })
              }
              className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
              rows={4}
            ></textarea>
          </div>
          <div className="flex items-center">
            <label htmlFor="imageUrl" className="w-32">
              Imagine
            </label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              value={festivalData.imageUrl}
              onChange={(e) =>
                setFestivalData({ ...festivalData, imageUrl: e.target.value })
              }
              className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="price" className="w-32">
              Preț minim
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={festivalData.price}
              onChange={(e) =>
                setFestivalData({ ...festivalData, price: e.target.value })
              }
              className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="rating" className="w-32">
              Rating
            </label>
            <input
              type="number"
              id="rating"
              name="rating"
              value={festivalData.rating}
              onChange={(e) =>
                setFestivalData({ ...festivalData, rating: e.target.value })
              }
              className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
            />
          </div>
          <div className="flex items-center">
            <label htmlFor="link" className="w-32">
              Link
            </label>
            <input
              type="text"
              id="link"
              name="link"
              value={festivalData.link}
              onChange={(e) =>
                setFestivalData({ ...festivalData, link: e.target.value })
              }
              className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
            />
          </div>

          <div>
            <h3 className="mt-4 mb-2 font-semibold">Bilete</h3>
            {tickets.map((ticket, index) => (
              <div key={index} className="flex flex-col gap-2 mb-2">
                <h4 className="font-semibold">Bilet #{index + 1}</h4>
                <div className="flex items-center">
                  <label htmlFor={`ticketType-${index}`} className="w-32">
                    Tip bilet
                  </label>
                  <input
                    type="text"
                    id={`ticketType-${index}`}
                    name={`ticketType-${index}`}
                    value={ticket.ticketType}
                    onChange={(e) =>
                      handleTicketChange(index, "ticketType", e.target.value)
                    }
                    className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
                  />
                </div>
                <div className="flex items-center">
                  <label htmlFor={`ticketPrice-${index}`} className="w-32">
                    Preț
                  </label>
                  <input
                    type="number"
                    id={`ticketPrice-${index}`}
                    name={`ticketPrice-${index}`}
                    value={ticket.price}
                    onChange={(e) =>
                      handleTicketChange(index, "price", e.target.value)
                    }
                    className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
                  />
                </div>
                <div className="flex items-center">
                  <label
                    htmlFor={`availableQuantity-${index}`}
                    className="w-32"
                  >
                    Cantitate disponibilă
                  </label>
                  <input
                    type="number"
                    id={`availableQuantity-${index}`}
                    name={`availableQuantity-${index}`}
                    value={ticket.availableQuantity}
                    onChange={(e) =>
                      handleTicketChange(
                        index,
                        "availableQuantity",
                        e.target.value
                      )
                    }
                    className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
                  />
                </div>
                <div className="flex items-start">
                  <label
                    htmlFor={`ticketDescription-${index}`}
                    className="w-32"
                  >
                    Descriere
                  </label>
                  <textarea
                    id={`ticketDescription-${index}`}
                    name={`ticketDescription-${index}`}
                    value={ticket.description}
                    onChange={(e) =>
                      handleTicketChange(index, "description", e.target.value)
                    }
                    className="flex-1 bg-white border py-1 px-3 rounded-lg focus:outline-none font-medium"
                    rows={2}
                  ></textarea>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTicket}
              className="bg-blue-500 text-white py-1 px-4 rounded-lg mt-3"
            >
              Adaugă bilet nou
            </button>
          </div>
          <button
            type="submit"
            className="bg-blue-500 border border-l-0 text-white py-2 px-4 rounded-lg font-semibold hover:bg-blue-600 transition-all duration-300"
          >
            Adaugă festival
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdaugaFestival;
