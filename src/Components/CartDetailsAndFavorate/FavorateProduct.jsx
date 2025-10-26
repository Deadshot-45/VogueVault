import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import useSetFavorate from "../../Hooks/UseFavorate";
import useUpdateFav from "../../Hooks/UpdateFav";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";

const FavorateProduct = ({ product, favorites, setFavorite }) => {
  const { isLoggedIn } = useContext(AuthContext);
  const { isFavorate, handleFavorateFunc } = useSetFavorate(product);
  const { newFav, updateFav } = useUpdateFav();

  useEffect(() => {
    if (newFav) {
      console.log("object");
      setFavorite(newFav);
    }
  }, [newFav, setFavorite]);

  const handleFavorate = () => {
    if (isLoggedIn) {
      updateFav(isLoggedIn, product);
    }
    handleFavorateFunc(product, favorites, setFavorite);
  };

  return (
    <div className="w-full flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex relative">
        {/* Product Image */}
        <Link to={`/product/${product._id}`} className="flex-shrink-0">
          <div className="w-24 h-24 rounded-md overflow-hidden">
            <img
              src={product.image[0]}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Link>
        <div className="hidden items-center max-sm:flex gap-4 absolute left-16 top-[-5%]">
          <button
            onClick={handleFavorate}
            className="p-2 text-red-500/90 hover:text-red-600/90 transition-colors duration-200"
            aria-label={
              isFavorate ? "Remove from favorites" : "Add to favorites"
            }
          >
            {isFavorate ? (
              <FaHeart className="h-5 w-5" />
            ) : (
              <FaRegHeart className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex-1 min-w-0">
        <Link
          to={`/product/${product._id}`}
          className="text-sm font-medium text-gray-900 hover:text-gray-600 line-clamp-1"
        >
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>
        <div className="mt-2 flex items-center gap-4">
          <span className="text-sm font-medium text-gray-900">
            ${product.price}
          </span>
          {product.size && (
            <span className="text-sm text-gray-500">Size: {product.size}</span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center max-sm:hidden gap-4">
        <button
          onClick={handleFavorate}
          className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
          aria-label={isFavorate ? "Remove from favorites" : "Add to favorites"}
        >
          {isFavorate ? (
            <FaHeart className="h-5 w-5" />
          ) : (
            <FaRegHeart className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
};
FavorateProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    size: PropTypes.string,
  }).isRequired,
  favorites: PropTypes.array.isRequired,
  setFavorite: PropTypes.func.isRequired,
};

export default FavorateProduct;
