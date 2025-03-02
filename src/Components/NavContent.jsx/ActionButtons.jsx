import { NavLink } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";
import { useContext } from "react";
import { DataFile } from "../ContextFile/DataContext";

export const ActionButtons = ({ShowSearch}) => {
  const {cartCount,user} = useContext(DataFile);
  return (
    <div className="flex gap-6">
      <button type="button">
        <img
          className="h-5 w-5 cursor-pointer"
          alt="Search"
          src={assets.search_icon}
          onClick={ShowSearch}
        />
      </button>
      <button type="button">
        <NavLink to={user ? "/user:user" : "/signin"}>
          <img
            className="h-6 w-5 cursor-pointer"
            alt="Profile"
            src={assets.profile_icon}
          />
        </NavLink>
      </button>
      <button type="button">
        <NavLink to={'/cart'} className="relative">
        <img className="h-5 w-5 cursor-pointer" alt="Cart" src={assets.cart_icon} />
        <p className="absolute top-[10px] left-0  w-4 aspect-square leading-4 bg-black text-white rounded-full text-[8px]">{cartCount}</p>
        </NavLink>
      </button>
    </div>
  );
};

"absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]"