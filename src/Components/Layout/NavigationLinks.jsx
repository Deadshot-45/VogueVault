import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate, Link, useLocation } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

export const NavigationLinks = () => {
  const { setSearchInput } = useContext(DataContext);
  const Navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/collection", text: "Collection" },
    { to: "/mens", text: "Men's" },
    { to: "/womens", text: "Women's" },
    { to: "/kids", text: "Kids" },
  ];

  useEffect(() => {
    setSearchInput(false);
  }, []);

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="hidden md:flex items-center space-x-8 2xl:space-x-12">
      <ul className="flex items-center space-x-8">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 2xl:text-base ${
                  isActive
                    ? "text-black border-b-2 border-black"
                    : "text-gray-500 hover:text-black"
                }`
              }
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => Navigate("/admin/login")}
        className="text-sm font-medium text-gray-600 hover:text-black transition-colors duration-200"
      >
        Admin Panel
      </button>
    </div>
  );
};
