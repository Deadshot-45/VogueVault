import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product, showFavorite = false }) => {
  return (
    <Link
      to={`/product/${product.id}`}
      className="group relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200"
    >
      <div className="aspect-square relative overflow-hidden">
        <img
          src={product.image[0]}
          alt={product.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
        />
        {showFavorite && (
          <div className="absolute top-2 right-2">
            <FaHeart className="h-6 w-6 text-red-500" />
          </div>
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

export default ProductCard;
