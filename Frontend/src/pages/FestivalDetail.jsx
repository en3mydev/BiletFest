import React, { useEffect, useReducer, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

// const VOUCHER_DISCOUNT = 10;
// const VOUCHER_CODE = "SELLY";

const initialState = {
  festivalName: "",
  date: "",
  location: "",
  tickets: {},
  totalPrice: 0,
  hasVoucher: false,
  discountedPrice: 0,
  allTickets: [],
  voucher: {},
};

const reducer = (state, action) => {
  switch (action.type) {
    case "incrementTicket":
      return {
        ...state,
        tickets: {
          ...state.tickets,
          [action.payload.type]: (state.tickets[action.payload.type] || 0) + 1,
        },
        totalPrice: state.totalPrice + action.payload.price,
        discountedPrice: state.hasVoucher
          ? (state.totalPrice + action.payload.price) *
            (1 - state.voucher.voucherDiscount / 100)
          : state.totalPrice + action.payload.price,
      };
    case "decrementTicket":
      if ((state.tickets[action.payload.type] || 0) > 0) {
        return {
          ...state,
          tickets: {
            ...state.tickets,
            [action.payload.type]:
              (state.tickets[action.payload.type] || 0) - 1,
          },
          totalPrice: state.totalPrice - action.payload.price,
          discountedPrice: state.hasVoucher
            ? (state.totalPrice - action.payload.price) *
              (1 - state.voucher.voucherDiscount / 100)
            : state.totalPrice - action.payload.price,
        };
      }
      return state;
    case "applyVoucher":
      return {
        ...state,
        hasVoucher: true,
        voucher: action.payload,
        discountedPrice:
          state.totalPrice * (1 - action.payload.voucherDiscount / 100),
      };
    case "setFestivalData":
      return {
        ...state,
        festivalName: action.payload.name,
        date: action.payload.date,
        location: action.payload.location,
        allTickets: action.payload.tickets,
      };
    default:
      return state;
  }
};

export default function FestivalDetail() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [voucherCode, setVoucherCode] = useState("");
  const [showVoucher, setShowVoucher] = useState(false);
  const [festival, setFestival] = useState({ tickets: [] });
  const navigate = useNavigate();
  const { id } = useParams();

  const calculateTotalPrice = (tickets) => {
    let total = 0;
    for (const [type, count] of Object.entries(tickets)) {
      const ticket = festival.tickets.find((t) => t.ticketType === type);
      if (ticket) {
        total += ticket.price * count;
      }
    }
    return total;
  };

  useEffect(() => {
    const fetchFestivalData = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7027/api/Festival/GetFestivalByLink/${id}`
        );
        console.log(response.data);
        setFestival(response.data);

        dispatch({
          type: "setFestivalData",
          payload: {
            name: response.data.name,
            date: response.data.date,
            location: response.data.location,
            tickets: response.data.tickets,
          },
        });
      } catch (error) {
        console.error("Failed to fetch festival data:", error);
      }
    };

    fetchFestivalData();
  }, [id]);

  const handleIncrement = (ticketType, price) => {
    dispatch({ type: "incrementTicket", payload: { type: ticketType, price } });
  };

  const handleDecrement = (ticketType, price) => {
    dispatch({ type: "decrementTicket", payload: { type: ticketType, price } });
  };

  const handleApplyVoucher = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7027/api/Order/GetVoucher/${voucherCode}`
      );
      const voucherData = response.data;
      if (voucherData && voucherData.voucherDiscount) {
        dispatch({ type: "applyVoucher", payload: voucherData });
      } else {
        console.error("Voucher invalid sau fără reducere");
      }
    } catch (error) {
      console.error("Failed to fetch voucher data:", error);
    }
  };

  const handlePurchase = () => {
    if (state.totalPrice === 0) {
      return;
    }
    navigate("/checkout", { state });
  };

  const totalPrice = calculateTotalPrice(state.tickets);
  const discountedPrice = state.hasVoucher
    ? totalPrice * (1 - state.voucher.voucherDiscount / 100)
    : totalPrice;

  return (
    <div className="px-40">
      <div className="flex py-10 min-[1800px]:px-40 gap-10">
        <div className="flex-1 self-center">
          <img
            src={festival?.imageUrl}
            alt={festival?.name || "Festival Image"}
            className="rounded-lg"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-b from-primary to-accent drop-shadow-xl">
            {state.festivalName || "Festivalul nu a fost găsit"}
          </h1>
          <div className="mb-2">
            <h3>
              <span className="font-semibold">Date:</span> {state.date || "N/A"}
            </h3>
            <h3>
              <span className="font-semibold">Location:</span>{" "}
              {state.location || "N/A"}
            </h3>
            <p className="">
              Get ready for an unforgettable experience at "
              {state.festivalName || "Festival"}", the summer festival that
              brings together sun, sand and top music on the gorgeous beach in
              Mommy. For five days, you will be transported into a universe of
              of fun and relaxation, where the waves of the sea and the electric
              vibe they will make you forget all your worries.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">
              What awaits you at {state.festivalName}:
            </h3>
            <ul>
              <li>
                <span className="font-semibold">Exceptional line-up</span>:
                Enjoy live performances by international artists and famous
                locales. {state.festivalName} promises you a line-up diversified
                to satisfy all musical tastes.
              </li>
              <li className="font-semibold">And many more!</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-4/5 block mx-auto">
        <div className="flex justify-between mb-2">
          <h2>Buy tickets</h2>
          <h3>Nr. tickets</h3>
        </div>
        <hr />
        {festival &&
        Array.isArray(festival.tickets) &&
        festival.tickets.length > 0 ? (
          festival.tickets.map((ticket) => (
            <div key={ticket.ticketID} className="mt-4 flex justify-between">
              <div>
                <h3 className="text-neutral-700 font-semibold">
                  {ticket.ticketType}
                </h3>
                <p className="text-neutral-500">{ticket.description}</p>
              </div>
              <div className="flex items-center gap-4">
                <h3>{ticket.price} lei</h3>
                <div className="flex">
                  <button
                    className="bg-blue-500 rounded-l-full text-white pl-2 pr-1"
                    onClick={() =>
                      handleDecrement(ticket.ticketType, ticket.price)
                    }
                  >
                    -
                  </button>
                  <span className="bg-white text-neutral-600 pl-2 pr-2 w-10 text-center border-y">
                    {state.tickets[ticket.ticketType] || 0}
                  </span>
                  <button
                    className="bg-blue-500 rounded-r-full text-white pl-1 pr-2"
                    onClick={() =>
                      handleIncrement(ticket.ticketType, ticket.price)
                    }
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>There are no tickets available</p>
        )}

        <div className="mt-4 text-end">
          <h3 className="text-neutral-700 font-semibold">
            Total:{" "}
            {state.discountedPrice
              ? state.discountedPrice.toFixed(2)
              : state.totalPrice.toFixed(2)}{" "}
            lei
          </h3>
          {state.hasVoucher && state.voucher && (
            <h6 className="mt-2">
              Voucher-ul{" "}
              <span className="font-bold">{state.voucher.voucherCode}</span> a
              been applied. You received{" "}
              <span className="font-semibold">
                {state.voucher.voucherDiscount}%
              </span>{" "}
              discount.
            </h6>
          )}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div>
            {showVoucher ? (
              <div>
                <input
                  type="text"
                  className="bg-white border py-1 pl-2 rounded-l-lg focus:outline-none font-medium"
                  placeholder="Cod voucher"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <button
                  className="bg-blue-500 border border-l-0 text-white py-1 px-4 rounded-r-lg font-semibold hover:bg-blue-600 transition-all duration-300"
                  onClick={handleApplyVoucher}
                >
                  Apply
                </button>
              </div>
            ) : (
              <h5>
                Do you have a voucher code?{" "}
                <button
                  className="text-primary font-semibold"
                  onClick={() => setShowVoucher(true)}
                >
                  Click here
                </button>
              </h5>
            )}
          </div>
          <button
            onClick={handlePurchase}
            className="bg-accent text-white px-6 py-2 rounded-xl font-bold hover:bg-primary"
          >
            Buy tickets
          </button>
        </div>
      </div>
    </div>
  );
}
