import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import useSetFavorate from "../../Hooks/UseFavorate";
import { DataContext } from "../../Context/DataContext";
import PropTypes from "prop-types";
import { AuthContext } from "../../Context/AuthContext";
import useUpdateFav from "../../Hooks/UpdateFav";

const ProductCard = ({ product, showFavorite = false }) => {
  const { favorites, setFavorite } = useContext(DataContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { handleFavorateFunc } = useSetFavorate(product);
  const { updateFavorite, favoriteState } = useUpdateFav();

  useEffect(() => {
    if (favoriteState) {
      if (favoriteState.success) {
        // If the update was successful, update the favorites state
        setFavorite(favoriteState.itemAdded);
      } else if (favoriteState.error) {
        // Handle error state if needed
        console.error("Error updating favorites:", favoriteState.error);
      }
    }
  }, [favoriteState, setFavorite]);

  const handleFavorate = (e) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation(); // Stop event bubbling
    if (isLoggedIn) {
      // Call the updateFavorite function with the product and token
      updateFavorite(isLoggedIn, product);
      return;
    }
    handleFavorateFunc(product, favorites, setFavorite);
  };

  return (
    <Link
      to={`/product/${product._id}`}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200 relative z-10"
        />
        {showFavorite && (
          <button
            onClick={handleFavorate}
            className="absolute top-2 right-2 z-999"
            aria-label="Toggle favorite"
          >
            <FaHeart className="h-6 w-6 text-red-500 hover:text-red-600 cursor-pointer" />
          </button>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-sm font-medium text-gray-900 truncate 2xl:text-base">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-gray-500 2xl:text-base">
          ${product.price}
        </p>
      </div>
    </Link>
  );
};
ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
  showFavorite: PropTypes.bool,
};

export default ProductCard;
