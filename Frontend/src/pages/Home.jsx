import React from "react";
import Card from "../components/Card";
import FestivalImg from "../images/festival.jpg";
import ConcertImg from "../images/concert.jpg";
import StandupImg from "../images/standup.jpg";
import { Link } from "react-router-dom";
import NewsletterBanner from "../components/NewsletterBanner";

export default function Home() {
  return (
    <div>
      <div className="text-center">
        <h1 className="pt-10 mb-6 bg-clip-text text-black text-5xl font-bold drop-shadow-lg">
          Buy <span className="text-black">now</span> tickets to the{" "}
          <span className="italic text-primary">hottest</span> events!
        </h1>
      </div>
      <div className="flex gap-10 justify-center py-12 flex-col md:flex-row items-center md:items-stretch">
        <Link to="/festivaluri">
          <Card title="Festivals" image={FestivalImg} />
        </Link>
        <Link to="/concerte">
          <Card title="Concerts" image={ConcertImg} />
        </Link>
        <Link to="/stand-up" className="inline-flex">
          <Card title="Stand-Up Comedy" image={StandupImg} />
        </Link>
      </div>
      <NewsletterBanner />
    </div>
  );
}
