import React, { useContext, useEffect } from "react";
import { NavLink, useNavigate,} from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

export  const navLinks = [
  { to: "/", text: "Home" },
  { to: "/collection", text: "Collection" },
  { to: "/mens", text: "Men's" },
  { to: "/womens", text: "Women's" },
  { to: "/kids", text: "Kids" },
];

export const NavigationLinks = () => {
  const { setSearchInput } = useContext(DataContext);
  const Navigate = useNavigate();

  useEffect(() => {
    setSearchInput(false);
  }, []);

  return (
    <div className="flex items-center max-xm:px-8 max-xm:pl-0 space-x-8 2xl:space-x-12 max-md:w-full ml-4 max-md:hidden">
      <ul className="flex items-center space-x-8 max-xm:w-full max-xm:flex-col max-xm:items-start max-xm:gap-4">
        {navLinks.map((link) => (
          <li
            key={link.to}
            onClick={() => {
              setSearchInput(false);
            }}
            className="max-xm:w-full max-md:border-b border-gray-300 pb-2"
          >
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 2xl:text-base  max-md:w-full ${
                  isActive
                    ? "text-black border-b-2 border-black max-xm:text-white max-xm:border-none"
                    : "text-gray-500 hover:text-black max-xm:text-white"
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
