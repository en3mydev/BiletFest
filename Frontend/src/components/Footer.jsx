import React from "react";
import { IoTicketOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer mt-12 p-10 sm:flex sm:justify-around bg-gradient-to-b from-base-100 to-primary text-white">
      <aside>
        <Link to="/" className="text-white text-3xl w-fit font-extrabold">
          BiletFest
          <IoTicketOutline className="inline text-3xl" />
        </Link>
        <p>
          Festival Tickets.
          <br />© 2024 All rights reserved.
        </p>
      </aside>
      <nav>
        <h6 className="footer-title text-white opacity-90">Company</h6>
        <Link href="despre-noi" className="link link-hover">
          About Us
        </Link>
        <Link to="#" className="link link-hover">
          Services
        </Link>
        <Link to="#" className="link link-hover">
          Contact
        </Link>
      </nav>
    </footer>
  );
}
