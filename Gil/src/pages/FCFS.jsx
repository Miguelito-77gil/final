import React from "react";
import FCFSSimulator from "../components/FCFSSimulator";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function FCFS() {
  return (
    <div className="font-pixel text-white bg-gray-900 min-h-screen">
      <Header />
      <FCFSSimulator />
      <Footer />
    </div>
  );
}