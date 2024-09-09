import React from "react";

export default function Card({ title, image }) {
  return (
    <div className="card image-full w-96 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <div className="card-body flex justify-center items-center">
        <h2 className="card-title text-neutral-200 font-bold">{title}</h2>
      </div>
    </div>
  );
}
