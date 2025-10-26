import { createContext, useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productDetails, setProductDetails] = useState({});
  const [searchInput, setSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [favoriteCount, setFavoriteCount] = useState(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Cart state management with proper error handling
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (!savedCart) return [];
      const parsedCart = JSON.parse(savedCart);
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Error initializing cart:", error);
      return [];
    }
  });

  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    if (!savedCart) return 0;
    const parsedCart = JSON.parse(savedCart);
    return parsedCart;
  });

  // Memoized cart calculations
  const cartCalculations = useMemo(() => {
    const cartTotal = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    const shipping = cartTotal >= 500 ? 0 : 99;
    const gst = cartTotal * 0.18; // 18% GST
    const totalPrice = cartTotal + shipping + gst;

    return { cartTotal, shipping, gst, totalPrice };
  }, [cart]);

  const [cartTotal, setCartTotal] = useState(cartCalculations.cartTotal);
  const [shipping, setShipping] = useState(cartCalculations.shipping);
  const [gst, setGst] = useState(cartCalculations.gst);
  const [totalPrice, setTotalPrice] = useState(cartCalculations.totalPrice);
  const [Coupon, setCoupon] = useState(() => {
    try {
      const savedCoupon = localStorage.getItem("Coupon");
      return savedCoupon ? JSON.parse(savedCoupon) : 0;
    } catch (error) {
      console.error("Error initializing coupon:", error);
      return 0;
    }
  });

  const [isCart, setIsCart] = useState(false);

  // Favorites state with proper error handling
  const [favorites, setFavorite] = useState(() => {
    try {
      const favorate = localStorage.getItem("favorate");
      return favorate ? JSON.parse(favorate) : [];
    } catch (error) {
      console.error("Error initializing favorites:", error);
      return [];
    }
  });

  // Optimized localStorage updates with error handling
  useEffect(() => {
    if (!isInitialLoad) {
      try {
        localStorage.setItem("carttotal", JSON.stringify(cartTotal));
        localStorage.setItem("shipping", JSON.stringify(shipping));
        localStorage.setItem("gst", JSON.stringify(gst));
        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("favorate", JSON.stringify(favorites));
        localStorage.setItem("Coupon", JSON.stringify(Coupon));
      } catch (error) {
        console.error("Error updating localStorage:", error);
        setError("Failed to save data. Please try again.");
      }
    }
  }, [cartTotal, shipping, gst, cart, favorites, Coupon, isInitialLoad]);

  // Update cart calculations when cart changes
  useEffect(() => {
    setCartTotal(cartCalculations.cartTotal);
    setShipping(cartCalculations.shipping);
    setGst(cartCalculations.gst);
    setTotalPrice(cartCalculations.totalPrice);
  }, [cartCalculations]);

  // Update favorite count
  useEffect(() => {
    setFavoriteCount(favorites.length);
  }, [favorites]);

  // Cleanup function
  useEffect(() => {
    return () => {
      setIsInitialLoad(false);
    };
  }, []);

  // Memoized context value
  const contextValue = useMemo(
    () => ({
      products,
      setProducts,
      productDetails,
      setProductDetails,
      searchInput,
      setSearchInput,
      searchTerm,
      setSearchTerm,
      favoriteCount,
      cart,
      setCart,
      cartCount,
      setCartCount,
      cartTotal,
      setCartTotal,
      shipping,
      setShipping,
      gst,
      setGst,
      totalPrice,
      setTotalPrice,
      Coupon,
      setCoupon,
      isCart,
      setIsCart,
      favorites,
      setFavorite,
      error,
      setError,
      isLoading,
      setIsLoading,
    }),
    [
      products,
      productDetails,
      searchInput,
      searchTerm,
      favoriteCount,
      cart,
      cartCount,
      cartTotal,
      shipping,
      gst,
      totalPrice,
      Coupon,
      isCart,
      favorites,
      error,
      isLoading,
    ]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
};

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DataContext, DataProvider };
