import { createContext, useState } from "react";

const DataFile = createContext();

const DataContext = ({ children }) => {
  const [productDetails, setProductDetails] = useState({});
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState();
  const [admin, setAdmin] = useState()
  const [isLogin, setIsLogin] = useState(false);
  const [isCart, setIsCart] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  return (
    <DataFile.Provider
      value={{
        productDetails,
        setProductDetails,
        cart,
        setCart,
        user,
        setUser,
        admin,
        setAdmin,
        isLogin,
        setIsLogin,
        isCart,
        setIsCart,
        cartCount,
        setCartCount
      }}
    >
      {children}
    </DataFile.Provider>
  );
};

export { DataFile, DataContext };