import axios from "axios";
import React, { useState, useEffect } from "react";
import BileteCumparate from "../components/BileteCumparate";

export default function UserProfile() {
  const [user, setUser] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "https://localhost:7027/api/User/get-user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(response.data);
        setDataLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [token]);

  const getFirstName = (fullName) => {
    fullName = fullName.split(" ")[0];
    if (fullName[0] === fullName[0].toLowerCase()) {
      return fullName[0].toUpperCase() + fullName.slice(1);
    } else {
      return fullName;
    }
  };

  return (
    <>
      {dataLoaded ? (
        <div className="flex flex-col items-center mt-10">
          <h1 className="text-2xl mb-4">
            Welcome to your profile,{" "}
            <span className="font-semibold">{getFirstName(user.fullName)}</span>
            !
          </h1>

          <div className="collapse bg-primary/10 w-fit">
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium text-center">
              Want to see your tickets?
            </div>
            <div className="collapse-content">
              <BileteCumparate email={user.email} />
            </div>
          </div>
        </div>
      ) : (
        <div className="loader">
          <li className="ball"></li>
          <li className="ball"></li>
          <li className="ball"></li>
        </div>
      )}
    </>
  );
}
