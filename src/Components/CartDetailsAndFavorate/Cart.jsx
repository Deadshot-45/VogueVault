import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";
import MapProduct from "./MapProduct";
import FavorateProduct from "./FavorateProduct";
import { FaShoppingBag, FaHeart } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import { useCartApi } from "../../Hooks/UseCart";

const Cart = () => {
  const { cart, favorites, setCart } = useContext(DataContext);
  const { isLoggedIn } = useContext(AuthContext);
  const { data, success, cartFetching } = useCartApi();

  useEffect(() => {
    if (isLoggedIn) {
      cartFetching(isLoggedIn);
    }
  }, []);

  useEffect(() => {
    if (data && success) {
      setCart(data);
    }
  }, [data, setCart, success]);

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

            {cart.length > 0 ? (
              <div className="space-y-6">
                {cart.map((product, index) => (
                  <MapProduct key={product?._id || index} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-lg">
                <FaShoppingBag className="h-16 w-16 text-gray-400 mb-4" />
                <p className="text-xl font-medium text-gray-900 mb-2">
                  Your cart is empty
                </p>
                <p className="text-gray-500 mb-6">
                  Looks like you haven&apos;t added anything to your cart yet.
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
          {Array.isArray(favorites) && favorites.length > 0 && (
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
                    key={product?._id || index}
                    product={product}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Cart Summary */}
        {/* {isValidCart && (
          <div className="lg:w-96">
            <CartTotal
              cartTotal={cartTotal}
              user={user}
              Coupon={Coupon}
              setCoupon={setCoupon}
            />
          </div>
        )} */}
      </div>
    </div>
  );
};

export default Cart;
