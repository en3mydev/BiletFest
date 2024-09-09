import React from "react";

export default function SkeletonCardBilet() {
  return (
    <div className="card card-compact bg-white/20 w-96 shadow-xl">
      <figure>
        <div className="skeleton h-[216px] w-full"></div>
      </figure>
      <div className="card-body">
        <h2 className="card-title text-neutral-200">
          <div className="skeleton h-6 w-2/3"></div>
        </h2>
        <div className="text-neutral-200/80">
          <div className="skeleton h-4 w-1/4"></div>
        </div>
        <div className="card-actions justify-between items-center">
          <div className="skeleton h-8 w-1/4"></div>
          <div className="skeleton h-8 w-24"></div>
        </div>
      </div>
    </div>
  );
}
