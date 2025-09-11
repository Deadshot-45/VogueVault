import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { DataContext } from "../../Context/DataContext";
import { FaTrash, FaHeart, FaRegHeart } from "react-icons/fa";
import useUpdateCart from "../../Hooks/UseUpdateCart";
import { AuthContext } from "../../Context/AuthContext";
import useDeleteProduct from "../../Hooks/UseDeleteProduct";
import useUpdateFav from "../../Hooks/UpdateFav";
import { toast, ToastContainer } from "react-toastify";

const MapProduct = ({ product }) => {
  const { cart, setCart, setCartCount, setFavorite } = useContext(DataContext);
  const { isLoggedIn } = useContext(AuthContext);
  const [isFavorate, setIsFavorate] = useState(false);
  const { cartData, handleCartUpdate, updateError } = useUpdateCart();
  const { deletedProduct, deleteProduct, deleteError } = useDeleteProduct();
  const { newFav, updateFav } = useUpdateFav();

  useEffect(() => {
    if (newFav) {
      setFavorite(newFav);
    }
  }, [newFav, setFavorite]);

  useEffect(() => {
    if (updateError && updateError !== null) {
      setCart(cartData);
      setCartCount(cartData.length);
    }
    if (deleteError && deleteError !== null) {
      setCart(deletedProduct);
      setCartCount(deletedProduct.length);
    }
  }, [
    cartData,
    cart,
    setCartCount,
    setCart,
    deletedProduct,
    updateError,
    deleteError,
  ]);

  const handleRemoveFromCart = () => {
    if (isLoggedIn) {
      deleteProduct(product._id, isLoggedIn);
      return;
    }
    const updatedCart = cart.filter((item) => item._id !== product._id);
    setCart(updatedCart);
    setCartCount((count) => count - 1);
  };

  const handleQuantityChange = (newQuantity) => {
    // Limit quantity between 1 and 99
    const limitedQuantity = Math.min(Math.max(newQuantity, 1), 99);
    if (newQuantity < 1) {
      return handleRemoveFromCart();
    }
    if (isLoggedIn) {
      const { _id, size } = product;
      handleCartUpdate({ _id, quantity: limitedQuantity, size }, isLoggedIn);
      return;
    }
    const updatedCart = cart.map((item) =>
      item._id === product._id && item.size === product.size
        ? { ...item, quantity: limitedQuantity }
        : item
    );
    setCart(updatedCart);
  };

  const handleFavorite = () => {
    if (isLoggedIn) {
      setIsFavorate(!isFavorate);
      updateFav(isLoggedIn, product);
    } else {
      toast.error("Please login to add to favorites.");
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="flex items-center gap-6 p-4 bg-white rounded-lg shadow-sm">
        {/* Product Image */}
        <div className="max-sm:flex max-sm:flex-col gap-2">
          <Link to={`/product/${product._id}`} className="flex-shrink-0">
            <div className="w-24 h-24 rounded-md overflow-hidden">
              <img
                src={product.image[0]}
                alt={product.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </Link>
          <div className="hidden w-24 max-sm:flex items-center gap-2">
            <button
              onClick={() => handleQuantityChange(product.quantity - 1)}
              className="w-8 h-8 max-xs:w-6 max-xs:h-6 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 cursor-pointer"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium text-gray-900">
              {product.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(product.quantity + 1)}
              className="w-8 h-8 max-xs:w-6 max-xs:h-6  flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                <span className="text-sm text-gray-500">
                  Size: {product.size}
                </span>
              )}
            </div>
          </div>

          {/* Quantity Controls */}
          <div className="flex max-sm:hidden items-center gap-2">
            <button
              onClick={() => handleQuantityChange(product.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            >
              -
            </button>
            <span className="w-8 text-center text-sm font-medium text-gray-900">
              {product.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(product.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
                isFavorate ? "Remove from favorites" : "Add to favorites"
              }
            >
              {isFavorate ? (
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
    </>
  );
};

MapProduct.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.arrayOf(PropTypes.string).isRequired,
    quantity: PropTypes.number.isRequired,
    size: PropTypes.string,
  }).isRequired,
};
export default MapProduct;
