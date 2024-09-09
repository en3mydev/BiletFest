import axios from "axios";
import React, { useState } from "react";

export default function AdaugaVoucherCode() {
  const [voucherCode, setVoucherCode] = useState("");
  const [voucherDiscount, setVoucherDiscount] = useState("");
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (voucherDiscount < 1 || voucherDiscount > 100) {
      setError("Discount-ul trebuie sa fie intre 1% si 100%.");
      setConfirmation("");
      return;
    }

    try {
      const response = await axios.post(
        "https://localhost:7027/api/Order/AddVoucher",
        {
          voucherCode: voucherCode,
          voucherDiscount: voucherDiscount,
        }
      );
      if (response.status === 200) {
        setError("");
        setConfirmation("Voucher-ul a fost adaugat cu succes.");
      }
    } catch (error) {
      console.error(error);
      setError("Voucher-ul nu a putut fi adaugat.");
      setConfirmation("");
    }
  };

  return (
    <div>
      {confirmation && (
        <div role="alert" className="alert alert-success mb-4 text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="font-bold">{confirmation}</span>
        </div>
      )}
      {error && (
        <div role="alert" className="alert alert-error mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-bold">Error! {error}</span>
        </div>
      )}
      <div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <div>
              <label htmlFor="voucherCode" className="font-medium">
                Voucher Code:
              </label>
              <input
                type="text"
                className="bg-white border py-1 pl-2 rounded-lg w-fit ml-2 focus:outline-none font-medium"
                placeholder="ABCDEFG"
                onChange={(e) => setVoucherCode(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="voucherDiscount" className="font-medium">
                Voucher Discount:
              </label>
              <input
                type="number"
                className="bg-white border py-1 pl-2 rounded-lg w-fit ml-2 focus:outline-none font-medium"
                placeholder="10"
                onChange={(e) => setVoucherDiscount(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 border text-white py-1 px-4 rounded-lg font-semibold mt-4 hover:bg-blue-600 transition-all duration-300"
          >
            Adaugă Voucher
          </button>
        </form>
      </div>
    </div>
  );
}
