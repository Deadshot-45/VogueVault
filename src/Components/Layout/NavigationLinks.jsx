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


  return (
    <div className="flex items-center max-[650px]:p-8 space-x-8 2xl:space-x-12 max-md:w-full ml-4">
      <ul className="flex items-center space-x-8 max-[650px]:w-full max-[650px]:flex-col max-[650px]:items-start max-[650px]:gap-4">
        {navLinks.map((link) => (
          <li key={link.to} className="max-[650px]:w-full max-md:border-b border-gray-300 pb-2">
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 2xl:text-base  max-md:w-full ${
                  isActive
                    ? "text-black border-b-2 border-black max-[650px]:text-white max-[650px]:border-none"
                    : "text-gray-500 hover:text-black max-[650px]:text-white"
                }`
              }
            >
              {link.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};
