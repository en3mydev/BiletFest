import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoTicketOutline } from "react-icons/io5";

export default function Header() {
  const isAuthenticated = !!localStorage.getItem("token");

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    navigate("/");
  };

  return (
    <nav className="px-32 py-4 w-full transition-colors duration-300 bg-base-100 border-b">
      <div className="navbar_container">
        <Link
          to="/"
          className="text-[#26272B] text-3xl w-fit font-public font-extrabold"
        >
          BiletFest
          <IoTicketOutline className="inline text-3xl" />
        </Link>
        <ul className="flex justify-center items-center gap-8 text-md text-[#26272B] font-medium">
          <li className="hover-effect">
            <Link to="/festivaluri">Festivals</Link>
          </li>
          <li className="hover-effect">
            <Link to="/concerte">Concerts</Link>
          </li>
          <li className="hover-effect">
            <Link to="/stand-up">Stand-Up</Link>
          </li>
        </ul>
        <div className="w-fit">
          {isAuthenticated ? (
            <>
              <Link
                to="/profile"
                className="hover:text-[#26272bb3] font-medium"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="border py-2 px-4 rounded-xl transition-colors duration-300 ml-3 hover:bg-base-200/20"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="hover:text-[#26272bb3]">
                Register
              </Link>
              <Link
                to="/login"
                className="border py-2 px-4 rounded-xl ml-3 transition-colors duration-300 hover:bg-base-200/20"
              >
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
