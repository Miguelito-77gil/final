import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-gray-800 p-4 flex justify-between items-center border-b-2 border-blue-500">
      <h1 className="text-xl font-bold text-cyan-400">My Portfolio</h1>
      <nav className="space-x-4">
        <Link to="/" className="hover:text-yellow-400">Home</Link>
        <Link to="/fcfs" className="hover:text-yellow-400">FCFS</Link>
      </nav>
    </header>
  );
}