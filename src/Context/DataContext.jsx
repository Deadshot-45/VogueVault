import { createContext, useState, useEffect } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [productDetails, setProductDetails] = useState({});
  const [searchInput, setSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [cartCount, setCartCount] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart).length : 0;
  });
  const [cartTotal, setCartTotal] = useState(() => {
    const savedcartTotal = localStorage.getItem("carttotal");
    return savedcartTotal ? JSON.parse(savedcartTotal) : 0;
  });
  const [shipping, setShipping] = useState(() => {
    const savedShipping = localStorage.getItem("shipping");
    return savedShipping ? JSON.parse(savedShipping) : 0;
  });
  const [gst, setGst] = useState(() => {
    const savedGst = localStorage.getItem("gst");
    return savedGst ? JSON.parse(savedGst) : 0;
  });
  const [totalPrice, setTotalPrice] = useState(() => {
    const savedTotalPrice = localStorage.getItem("totalPrice");
    return savedTotalPrice
      ? JSON.parse(savedTotalPrice)
      : cartTotal + shipping + gst;
  });
  const [Coupon, setCoupon] = useState(() => {
    const savedCoupon = localStorage.getItem("Coupon");
    return savedCoupon ? JSON.parse(savedCoupon) : 0;
  });
  const [isCart, setIsCart] = useState(false);
  const [user, setUser] = useState([]);
  const [favorites, setFavorite] = useState(()=>{
    const favorate = localStorage.getItem("favorate");
    return favorate ? JSON.parse(favorate): [];
  })

  useEffect(() => {
    localStorage.setItem("carttotal", JSON.stringify(cartTotal));
  }, [cartTotal]);

  useEffect(() => {
    localStorage.setItem("shipping", JSON.stringify(shipping));
  }, [shipping]);

  useEffect(() => {
    localStorage.setItem("gst", JSON.stringify(gst));
  }, [gst]);

  useEffect(() => {
    setTotalPrice(() => {
       return cartTotal + shipping + gst;
    });
    cartTotal >= 500 ? setShipping(0) : setShipping(99);
  }, [cartTotal]);

  // Persist cart state
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    setCartCount(cart.length);
  }, [cart]);

  useEffect(()=>{
    localStorage.setItem("favorate", JSON.stringify(favorites))
  },[favorites])

  return (
    <DataContext.Provider
      value={{
        productDetails,
        setProductDetails,
        cart,
        setCart,
        shipping,
        setShipping,
        gst,
        setGst,
        isCart,
        setIsCart,
        cartCount,
        setCartCount,
        searchInput,
        setSearchInput,
        searchTerm,
        setSearchTerm,
        cartTotal,
        setCartTotal,
        totalPrice,
        setTotalPrice,
        favorites,
        setFavorite,
        Coupon,
        setCoupon,
        user,
        setUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
