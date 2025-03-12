import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import { FaHeart } from "react-icons/fa";
import ProductCard from "../ProductPages/ProductCard";

const Favorites = () => {
  const { favorites } = useContext(DataContext);

  return (
    <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 2xl:px-12 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold text-gray-900 2xl:text-3xl">
          My Favorites
        </h1>
        <span className="text-sm text-gray-500 2xl:text-base">
          {favorites.length} items
        </span>
      </div>

      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {favorites.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              showFavorite={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <FaHeart className="h-16 w-16 text-gray-400 mx-auto mb-4 2xl:h-20 2xl:w-20" />
          <h2 className="text-lg font-medium text-gray-900 mb-2 2xl:text-xl">
            No favorites yet
          </h2>
          <p className="text-sm text-gray-500 mb-6 2xl:text-base">
            Start adding items to your favorites list
          </p>
          <Link
            to="/collection"
            className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors duration-200 text-sm 2xl:text-base"
          >
            Browse Collection
          </Link>
        </div>
      )}
    </div>
  );
};

export default Favorites;
