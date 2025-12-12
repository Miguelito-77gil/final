    import React from "react";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ title, description, link, openInNewTab }) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (openInNewTab) {
      window.open(link, "_blank");
    } else {
      navigate(link);
    }
  };

  return (
    <div
      className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-all"
      onClick={handleClick}
    >
      <h3 className="text-xl font-bold mb-2 text-cyan-400">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}