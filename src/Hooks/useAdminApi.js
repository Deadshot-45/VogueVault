import { useState } from "react";
import axios from "axios";

export const API_URL =
  "https://vault-vogue-expressjs.vercel.app/api/data/admin";

const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  return token;
};

// Create axios instance with default config
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: () => {
      const token = getToken();
      return `Bearer ${token}`;
    },
  },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const useAdminApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  // Dashboard Stats // ? OK
  const getDashboardStats = async () => {
    setLoading(true);
    try {
      setLoading(true);
      const response = await api.get("/dashboard/stats");

      if (response.data.error === false) {
        setError(null);
        setData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching dashboard stats");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Product Management
  const getProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get("/products");
      console.log(response.data);
      if (response.data.error === false) {
        setError(null);
        setData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching products");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const createProduct = async (productData) => {
    try {
      setLoading(true);
      const response = await api.post("/admin/products", productData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error creating product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/products/${id}`, productData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error updating product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      setLoading(true);
      const response = await api.delete(`/admin/products/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting product");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // User Management
  const getUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/users");
      console.log(response.data, "getUsers");
      if (response.data.error === false) {
        setError(null);
        setData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching users");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getUser = async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/users/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id, userData) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/users/${id}`, userData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error updating user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    try {
      setLoading(true);
      const response = await api.delete(`/admin/users/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting user");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Order Management // ? ok
  const getOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders");
      console.log(response.data);
      if (response.data.error === false) {
        setError(null);
        setData(response.data.data);
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching orders");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getOrder = async (id) => {
    try {
      setLoading(true);
      const response = await api.get(`/admin/orders/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (id, status) => {
    try {
      setLoading(true);
      const response = await api.put(`/admin/orders/${id}/status`, { status });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error updating order status");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteOrder = async (id) => {
    try {
      setLoading(true);
      const response = await api.delete(`/admin/orders/${id}`);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error deleting order");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Settings Management
  const getSettings = async () => {
    try {
      setLoading(true);
      const response = await api.get("/admin/settings");
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching settings");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateSettings = async (settingsData) => {
    try {
      setLoading(true);
      const response = await api.put("/admin/settings", settingsData);
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Error updating settings");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    data,
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
  };
};
