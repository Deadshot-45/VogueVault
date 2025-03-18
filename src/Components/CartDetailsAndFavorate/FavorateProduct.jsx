import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaRegHeart, FaHeart } from "react-icons/fa";

const FavorateProduct = ({ product, favorites, setFavorite, index }) => {
  const [isFavorate, setIsFavorate] = useState(() => {
    const newArray = JSON.parse(localStorage.getItem("favorate"));
    return newArray.some((item) => item.name === product.name);
  });

  useEffect(() => {
    const newFavorites = favorites.some((item) => item.name === product.name);
    setIsFavorate(newFavorites ? true : false);
  }, [isFavorate, product, favorites]);

  const handleFavorate = (product) => {
    const isProductFavorated = favorites.some(
      (item) => item.name === product.name
    );
    if (isProductFavorated) {
      const filterFavorate = favorites.filter(
        (item) => item.name !== product.name
      );
      setFavorite(filterFavorate);
      setIsFavorate(false);
    } else {
      setFavorite([...favorites, product]);
      setIsFavorate(true);
    }
  };

  return (
    <div className={`w-full flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200 card-mount delay-${index % 5}`}>
      <div className="flex relative">
        {/* Product Image */}
        <Link to={`/product/${product.id}`} className="flex-shrink-0">
          <div className="w-24 h-24 rounded-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Link>
        <div className="hidden items-center max-sm:flex gap-4 absolute left-16 top-[-5%]">
          <button
            onClick={() => handleFavorate(product)}
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
          to={`/product/${product.id}`}
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
          onClick={() => handleFavorate(product)}
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

export default FavorateProduct;
