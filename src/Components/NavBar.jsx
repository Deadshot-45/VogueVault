import React from "react";
import { assets } from "../assets/frontend_assets/assets";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="flex justify-between w-full py-5">
      <a className="navbar-brand" href="#">
        <img src={assets.logo} alt="logo" className="w-36 h-10" />
      </a>
      <ul className="flex gap-6 justify-center items-center text-sm font-medium text-zinc-600">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink to={link.to} className={(e)=>{return e.isActive ? 'py-3 border-b-zinc-500 border-b-2': 'py-2'}} >
              {link.text}
            </NavLink>
          </li>
        ))}
        <li>
          <button type="button" className="border border-zinc-300 rounded-3xl py-2 px-4 text-[11px]">
            Admin Panel
          </button>
        </li>
      </ul>
      <div className="flex gap-6">
        {actionButtons.map((button) => (
          <button key={button.alt} type="button">
            <img className={button.className} src={button.src} alt={button.alt} />
          </button>
        ))}
      </div>
    </nav>
  );
};

const navLinks = [
  { to: "/", text: "HOME" },
  { to: "/Collection", text: "COLLECTION" },
  { to: "/About", text: "ABOUT" },
  { to: "/Contact", text: "CONTACT" },
];

const actionButtons = [
  { src: assets.search_icon, alt: "Search", className: "h-5 w-5" },
  { src: assets.profile_icon, alt: "Profile", className: "h-6 w-5" },
  { src: assets.cart_icon, alt: "Cart", className: "h-5 w-5" },
];

export default NavBar;