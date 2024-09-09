import axios from "axios";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

export default function AdminProtect() {
  const [user, setUser] = useState({});

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
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, [token]);

  if (user.role !== "admin") {
    return <h1 className="text-center">Access Denied</h1>;
  } else {
    return <Outlet />;
  }
}
