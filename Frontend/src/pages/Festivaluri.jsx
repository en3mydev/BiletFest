import React, { useEffect, useState } from "react";
import CardBilet from "../components/CardBilet";
import axios from "axios";
import SkeletonCardBilet from "../components/SkeletonCardBilet";

export default function Festivaluri() {
  const [festivaluri, setFestivaluri] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

  useEffect(() => {
    const getFestivaluri = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7027/api/Festival/GetAllFestivals"
        );

        setFestivaluri(response.data);
        setTimeout(() => {
          setLoadingData(false);
        }, 900);
      } catch (error) {
        console.error(error);
      }
    };

    getFestivaluri();
  }, []);

  return (
    <div>
      <h1 className="py-10 text-4xl font-bold text-center">
        Here are the latest festivals!
      </h1>
      <div className="flex py-10 justify-around">
        {loadingData ? (
          <div className="flex gap-10 justify-around">
            <SkeletonCardBilet />
            <SkeletonCardBilet />
            <SkeletonCardBilet />
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10 justify-around">
            {festivaluri.map((festival) => (
              <CardBilet
                key={festival.id}
                title={festival.name}
                image={festival.imageUrl}
                price={festival.price}
                rating={festival.rating}
                isNew={true}
                link={festival.link}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
