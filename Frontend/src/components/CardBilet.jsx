import React from "react";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import SkeletonCardBilet from "./SkeletonCardBilet";
import { Link } from "react-router-dom";

export default function CardBilet({
  loading,
  isNew,
  image,
  title,
  price,
  rating,
  link,
}) {
  return (
    <div className="flex justify-around">
      {loading ? (
        <SkeletonCardBilet />
      ) : (
        <div className="indicator">
          {isNew && (
            <span className="indicator-item badge badge-primary text-white select-none">
              new
            </span>
          )}
          <div className="card card-compact bg-white w-96 shadow-xl">
            <figure>
              <img src={image} alt="Shoes" className="opacity-90" />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-neutral-700 font-semibold">
                {title}
              </h2>
              <p className="text-neutral-400/80">from {price} lei</p>
              <div className="card-actions justify-between items-center">
                <Rating
                  name="text-feedback"
                  value={rating}
                  readOnly
                  precision={0.1}
                  emptyIcon={
                    <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                  }
                />

                <Link
                  to={link}
                  className="bg-blue-500 px-3 py-2 font-semibold text-neutral-100 rounded-md hover:bg-blue-500/80"
                >
                  See tickets
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
