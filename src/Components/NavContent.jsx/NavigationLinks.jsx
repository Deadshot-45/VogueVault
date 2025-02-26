import React from "react";
import { NavLink } from "react-router-dom";

export const NavigationLinks = () => {
  const navLinks = [
    { to: "/", text: "HOME" },
    { to: "/Collection", text: "COLLECTION" },
    { to: "/About", text: "ABOUT" },
    { to: "/Contact", text: "CONTACT" },
  ];

  return (
    <ul className="flex gap-6 justify-center items-center text-sm font-medium text-zinc-600">
      {navLinks.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            className={(e) =>
              e.isActive ? "py-1 border-b-zinc-500 border-b-2" : "py-8"
            }
          >
            {link.text}
          </NavLink>
        </li>
      ))}
      
      <li>
        <button
          type="button"
          className="border border-zinc-300 rounded-3xl py-2 px-4 text-[11px] cursor-pointer"
        >
          Admin Panel
        </button>
      </li>
    </ul>
  );
};

