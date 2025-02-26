import { NavLink } from "react-router-dom";
import { assets } from "../../assets/frontend_assets/assets";

export const ActionButtons = ({ShowSearch}) => {
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
        <NavLink to="/SignIn">
          <img
            className="h-6 w-5 cursor-pointer"
            alt="Profile"
            src={assets.profile_icon}
          />
        </NavLink>
      </button>
      <button type="button">
        <img className="h-5 w-5 cursor-pointer" alt="Cart" src={assets.cart_icon} />
      </button>
    </div>
  );
};