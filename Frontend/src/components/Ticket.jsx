import React from "react";
import QRCode from "qrcode.react";
import { IoTicketOutline } from "react-icons/io5";

export default function Ticket({ festivalName, tipBilet, uniqueCode }) {
  return (
    <div className="border bg-white rounded-xl mx-auto w-[350px]">
      <div className="text-center my-3">
        <h1 className="font-bold text-2xl px-3">{festivalName}</h1>
        <h1 className="font-semibold">{tipBilet}</h1>
      </div>
      <hr />
      <div className="flex flex-col justify-between items-center gap-4 mt-4">
        <div className="w-20 flex justify-center">
          <QRCode value={uniqueCode} size={140} />
        </div>
        <div>
          <p>
            Unique code: <span className="font-semibold">{uniqueCode}</span>
          </p>
        </div>
      </div>
      <div className="bg-primary py-3 rounded-b-xl mt-2">
        <h1 className="text-white text-lg font-bold text-center select-none">
          BiletFest
          <IoTicketOutline className="inline text-2xl" />
        </h1>
      </div>
    </div>
  );
}
