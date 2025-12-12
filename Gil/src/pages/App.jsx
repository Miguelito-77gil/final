import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FCFS from "./pages/FCFS";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/fcfs" element={<FCFS />} />
      </Routes>
    </Router>
  );
}