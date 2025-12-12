import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 p-4 text-center border-t-2 border-blue-500">
      <p className="text-gray-400">&copy; {new Date().getFullYear()} philippines loopers. All rights reserved.</p>
    </footer>
  );
}