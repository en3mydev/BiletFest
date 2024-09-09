import React from "react";

import SkeletonCardBilet from "../components/SkeletonCardBilet";

export default function Concerte() {
  return (
    <div>
      <h1 className="py-10 text-4xl font-bold text-center">
        Here are the latest concerts!
      </h1>
      <div className="flex py-10 justify-around">
        <div className="flex gap-10 justify-around">
          <SkeletonCardBilet />
          <SkeletonCardBilet />
          <SkeletonCardBilet />
        </div>
      </div>
    </div>
  );
}
