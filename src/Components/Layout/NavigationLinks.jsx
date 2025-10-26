import { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import PropTypes from "prop-types";

export const NavigationLinks = ({ onLinkClick, isMobile }) => {
  const { setSearchInput } = useContext(DataContext);

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/collection", text: "Collection" },
    { to: "/mens", text: "Men's" },
    { to: "/womens", text: "Women's" },
    { to: "/kids", text: "Kids" },
  ];

  useEffect(() => {
    setSearchInput(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <nav
      className={`
      flex items-center
      ${
        isMobile
          ? "flex-col items-start space-y-4 w-full"
          : "xm:flex xm:items-center xm:space-x-8 2xl:space-x-12 hidden"
      }
    `}
    >
      <ul
        className={`
        flex items-center
        ${
          isMobile
            ? "flex-col items-start space-y-4 w-full"
            : "xm:flex xm:items-center xm:space-x-8 w-auto"
        }
      `}
      >
        {navLinks.map((link) => (
          <li
            key={link.to}
            onClick={() => {
              onLinkClick();
              setSearchInput(false);
            }}
            className={`
              ${isMobile ? "w-full border-b border-gray-600 pb-2" : ""}
            `}
          >
            <NavLink
              to={link.to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors duration-200 2xl:text-base
                ${
                  isMobile
                    ? "text-white hover:text-gray-300 block w-full"
                    : isActive
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
    </nav>
  );
};

NavigationLinks.propTypes = {
  onLinkClick: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default NavigationLinks;
