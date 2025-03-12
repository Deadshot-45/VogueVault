import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CartTotal = ({ cartTotal, user, Coupon, setCoupon }) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // Calculate discount (negative value) and total
  const discount = Coupon ? -Math.abs(Coupon) : 0;
  const total = cartTotal + discount;

  const handleCheckout = () => {
    if (!user) {
      setError("Please login to proceed with checkout");
      return;
    }
    navigate("/payment");
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">
            ${cartTotal.toFixed(2)}
          </span>
        </div>

        {discount !== 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Discount</span>
            <span className="font-medium text-green-600">
              ${Math.abs(discount).toFixed(2)}
            </span>
          </div>
        )}

        <div className="border-t border-gray-200 pt-4">
          <div className="flex justify-between text-base">
            <span className="font-medium text-gray-900">Total</span>
            <span className="font-bold text-gray-900">${total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <button
          onClick={handleCheckout}
          className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition-colors duration-200"
        >
          Proceed to Checkout
        </button>

        {error && <p className="text-sm text-red-600 text-center">{error}</p>}

        {!user && (
          <div className="flex items-center justify-center gap-4 text-sm">
            <Link
              to="/signin"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Sign In
            </Link>
            <span className="text-gray-300">|</span>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
