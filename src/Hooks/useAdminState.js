import { useState, useEffect } from "react";
import { useAdminApi } from "./useAdminApi";

export const useAdminState = () => {
  const [stats, setStats] = useState(null);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [settings, setSettings] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const {
    loading,
    error,
    getDashboardStats,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    getOrders,
    getOrder,
    updateOrderStatus,
    deleteOrder,
    getSettings,
    updateSettings,
  } = useAdminApi();

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [statsData, productsData, usersData, ordersData, settingsData] =
          await Promise.all([
            getDashboardStats(),
            getProducts(),
            getUsers(),
            getOrders(),
            getSettings(),
          ]);

        setStats(statsData);
        setProducts(productsData);
        setUsers(usersData);
        setOrders(ordersData);
        setSettings(settingsData);
      } catch (err) {
        console.error("Error fetching initial data:", err);
      }
    };

    fetchInitialData();
  }, []);

  // Product handlers
  const handleCreateProduct = async (productData) => {
    const newProduct = await createProduct(productData);
    setProducts([newProduct, ...products]);
    return newProduct;
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      const updatedProduct = await updateProduct(id, productData);
      setProducts(products.map((p) => (p._id === id ? updatedProduct : p)));
      return updatedProduct;
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      throw err;
    }
  };

  // User handlers
  const handleUpdateUser = async (id, userData) => {
    try {
      const updatedUser = await updateUser(id, userData);
      setUsers(users.map((u) => (u._id === id ? updatedUser : u)));
      return updatedUser;
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter((u) => u._id !== id));
    } catch (err) {
      throw err;
    }
  };

  // Order handlers
  const handleUpdateOrderStatus = async (id, status) => {
    try {
      const updatedOrder = await updateOrderStatus(id, status);
      setOrders(orders.map((o) => (o._id === id ? updatedOrder : o)));
      return updatedOrder;
    } catch (err) {
      throw err;
    }
  };

  const handleDeleteOrder = async (id) => {
    await deleteOrder(id);
    setOrders(orders.filter((o) => o._id !== id));
  };

  // Settings handlers
  const handleUpdateSettings = async (settingsData) => {
    try {
      const updatedSettings = await updateSettings(settingsData);
      setSettings(updatedSettings);
      return updatedSettings;
    } catch (err) {
      throw err;
    }
  };

  return {
    loading,
    error,
    stats,
    products,
    users,
    orders,
    settings,
    selectedProduct,
    selectedUser,
    selectedOrder,
    setSelectedProduct,
    setSelectedUser,
    setSelectedOrder,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleUpdateUser,
    handleDeleteUser,
    handleUpdateOrderStatus,
    handleDeleteOrder,
    handleUpdateSettings,
    // refreshData: async () => {
    //   const [statsData, productsData, usersData, ordersData, settingsData] =
    //     await Promise.all([
    //       getDashboardStats(),
    //       getProducts(),
    //       getUsers(),
    //       getOrders(),
    //       getSettings(),
    //     ]);

    //   setStats(statsData);
    //   setProducts(productsData);
    //   setUsers(usersData);
    //   setOrders(ordersData);
    //   setSettings(settingsData);
    // },
  };
};
