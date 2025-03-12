import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import MapProduct from "./MapProduct";
import CartTotal from "./CartTotal";
import FavorateProduct from "./FavorateProduct";
import { FaShoppingBag, FaHeart } from "react-icons/fa";

const Cart = () => {
  const { cart, favorites, setFavorite, user } = useContext(DataContext);
  const [cartTotal, setCartTotal] = useState(0);
  const [Coupon, setCoupon] = useState("");

  useEffect(() => {
    const total = cart.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setCartTotal(total);
  }, [cart]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          {/* Cart Items */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Shopping Cart
            </h1>

            {cart && cart.length > 0 ? (
              <div className="space-y-6">
                {cart.map((product, index) => (
                  <MapProduct
                    key={index}
                    product={product}
                    favorites={favorites}
                    setFavorite={setFavorite}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                <FaShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-xl font-medium text-gray-900 mb-2">
                  Your cart is empty
                </p>
                <p className="text-gray-500 mb-6">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Link
                  to="/collection"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-black hover:bg-gray-800 transition-colors duration-200"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>

          {/* Favorites Section */}
          {favorites && favorites.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FaHeart className="h-5 w-5 text-red-500" />
                <h2 className="text-2xl font-bold text-gray-900">
                  Saved for Later
                </h2>
              </div>
              <div className="flex flex-wrap flex-col gap-6">
                {favorites.map((product, index) => (
                  <FavorateProduct
                    key={index}
                    product={product}
                    favorites={favorites}
                    setFavorite={setFavorite}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {cart && cart.length > 0 && (
          <div className="lg:w-96">
            <CartTotal
              cartTotal={cartTotal}
              user={user}
              Coupon={Coupon}
              setCoupon={setCoupon}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
