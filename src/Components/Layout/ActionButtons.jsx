import { useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { FaSearch, FaHeart, FaShoppingCart, FaUser } from "react-icons/fa";
import { DataContext } from "../../Context/DataContext";
import { AuthContext } from "../../Context/AuthContext";

export const ActionButtons = ({ ShowSearch }) => {
  const { cart, favorites } = useContext(DataContext);
  const { isLoggedIn, user } = useContext(AuthContext);

  return (
    <div className="flex items-center space-x-6 2xl:space-x-8">
      <button
        onClick={ShowSearch}
        className="text-gray-500 hover:text-black transition-colors duration-200"
      >
        <FaSearch className="h-5 w-5 2xl:h-6 2xl:w-6" />
      </button>
      <Link
        to="/favorites"
        className="text-gray-500 hover:text-black transition-colors duration-200 relative"
      >
        <FaHeart className="h-5 w-5 2xl:h-6 2xl:w-6" />
        {favorites.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center 2xl:h-6 2xl:w-6 2xl:text-sm">
            {favorites?.length}
          </span>
        )}
      </Link>
      <Link
        to="/cart"
        className="text-gray-500 hover:text-black transition-colors duration-200 relative"
      >
        <FaShoppingCart className="h-5 w-5 2xl:h-6 2xl:w-6" />
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full h-5 w-5 flex items-center justify-center 2xl:h-6 2xl:w-6 2xl:text-sm">
            {cart.length}
          </span>
        )}
      </Link>
      <Link
        to={isLoggedIn ? `/user/account/${user?.name+ "-" + user?._id}` : "/signin"}
        className="text-gray-500 hover:text-black transition-colors duration-200"
      >
        <FaUser className="h-5 w-5 2xl:h-6 2xl:w-6" />
      </Link>
    </div>  
  );
};
("absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]");

ActionButtons.propTypes = {
  ShowSearch: PropTypes.func.isRequired,
};
("absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]");
