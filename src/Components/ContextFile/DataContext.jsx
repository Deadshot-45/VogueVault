import { createContext, useState } from "react";

const DataFile = createContext();

const DataContext = ({ children }) => {
  const [productDetails, setProductDetails] = useState({});
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState({});
  const [isLogin, setIsLogin] = useState(false);
  const [isCart, setIsCart] = useState(false);

  return (
    <DataFile.Provider
      value={{
        productDetails,
        setProductDetails,
        cart,
        setCart,
        user,
        setUser,
        isLogin,
        setIsLogin,
        isCart,
        setIsCart,
      }}
    >
      {children}
    </DataFile.Provider>
  );
};

export { DataFile, DataContext };