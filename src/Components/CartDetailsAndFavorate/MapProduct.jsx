import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import { FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";

const MapProduct = ({ product, favorites, setFavorite, index }) => {
  const { cart, setCart, setCartCount } = useContext(DataContext);

  const handleRemoveFromCart = () => {
    const updatedCart = cart.filter((item) => item.name !== product.name);
    setCart(updatedCart);
    setCartCount((count) => count - 1);
  };

  const handleQuantityChange = (newQuantity) => {
    // Limit quantity between 1 and 99
    const limitedQuantity = Math.min(Math.max(newQuantity, 1), 99);

    if (limitedQuantity < 1) {
      handleRemoveFromCart();
    } else {
      const updatedCart = cart.map((item) =>
        item.name === product.name && item.size === product.size
          ? { ...item, quantity: limitedQuantity }
          : item
      );
      setCart(updatedCart);
    }
  };

  const isInFavorites = favorites.some((item) => item.name === product.name);

  const handleFavorite = () => {
    if (isInFavorites) {
      setFavorite(favorites.filter((item) => item.name !== product.name));
    } else {
      setFavorite([...favorites, product]);
    }
  };

  return (
    <div className={`flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm card-mount delay-${index % 5}`}>
      {/* Product Image */}
      <div className="max-sm:flex max-sm:flex-col gap-2">
        <Link to={`/product/${product.id}`} className="flex-shrink-0">
          <div className="w-24 h-24 rounded-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </Link>
        <div className="hidden w-24 max-sm:flex items-center gap-2">
          <button
            onClick={() => handleQuantityChange(product.quantity - 1)}
            className="w-8 h-8 max-xs:w-6 max-xs:h-6 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.quantity <= 1}
          >
            -
          </button>
          <span className="w-8 text-center text-sm font-medium text-gray-900">
            {product.quantity}
          </span>
          <button
            onClick={() => handleQuantityChange(product.quantity + 1)}
            className="w-8 h-8 max-xs:w-6 max-xs:h-6  flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={product.quantity >= 99}
          >
            +
          </button>
        </div>
      </div>

      <div className="min-sm:flex gap-2">
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

      {/* Quantity Controls */}
      <div className="flex max-sm:hidden items-center gap-2">
        <button
          onClick={() => handleQuantityChange(product.quantity - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.quantity <= 1}
        >
          -
        </button>
        <span className="w-8 text-center text-sm font-medium text-gray-900">
          {product.quantity}
        </span>
        <button
          onClick={() => handleQuantityChange(product.quantity + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={product.quantity >= 99}
        >
          +
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleFavorite}
          className="p-2 text-red-500 hover:text-red-600 transition-colors duration-200"
          aria-label={
            isInFavorites ? "Remove from favorites" : "Add to favorites"
          }
        >
          {isInFavorites ? (
            <FaHeart className="h-5 w-5" />
          ) : (
            <FaRegHeart className="h-5 w-5" />
          )}
        </button>
        <button
          onClick={handleRemoveFromCart}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors duration-200"
          aria-label="Remove from cart"
        >
          <FaTrash className="h-5 w-5" />
        </button>
      </div>
      </div>
    </div>
  );
};

export default MapProduct;
