import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

export default function Layout() {
  return (
    <main className="flex flex-col justify-between min-h-screen">
      <Header />
      <Outlet />
      <Footer />
    </main>
  );
}
