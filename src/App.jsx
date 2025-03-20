import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import AddItemsPage from "./Components/AdminPage/AddItemsPage";
import AdminDashBoard from "./Components/AdminPage/AdminDashBoard";
import AdminLayout from "./Components/AdminPage/AdminLayout";
import AdminLogin from "./Components/AdminPage/AdminLogin";
import DashBoard from "./Components/AdminPage/DashBoard";
import ListItems from "./Components/AdminPage/ListItems";
import OrdersPage from "./Components/AdminPage/OrdersPage";
import Footer from "./Components/Layout/Footer";
import NavBar from "./Components/Layout/NavBar";
import About from "./Components/Pages/About";
import Cart from "./Components/CartDetailsAndFavorate/Cart";
import Collection from "./Components/Pages/Collection";
import Contact from "./Components/Pages/Contact";
import Home from "./Components/Pages/Home";
import NotFound from "./Components/Pages/NotFound";
import SignIn from "./Components/Pages/SignIn";
import SignUp from "./Components/Pages/SignUp";
import Unauthorized from "./Routes/Unauthorized";
import UserAccount from "./Components/user/UserAccount";
import ProductPage from "./Components/ProductPages/ProductPage";
import AddressDetails from "./Components/PaymentPages/AddressDetails";
import PrivateRoute from "./Routes/PrivateRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import Delivery from "./Components/Pages/Delivery";
import PrivacyPolicy from "./Components/Pages/PrivacyPolicy";
import Mens from "./Components/Pages/Mens";
import Womens from "./Components/Pages/Womens";
import Kids from "./Components/Pages/Kids";
import Favorites from "./Components/user/Favorites";
import axios from "axios";
import ScrollToTop from "./Components/Layout/ScrollToTop";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isProductRoute = location.pathname.startsWith("/product/");

  if (isAdminRoute) {
    return (
      <Routes>
        {/* Admin Routes */}
        <Route
          path="/admin/login"
          element={
            <AdminLayout>
              <AdminLogin />
            </AdminLayout>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashBoard>
                <DashBoard />
              </AdminDashBoard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/itemslist"
          element={
            <ProtectedRoute role="admin">
              <AdminDashBoard>
                <ListItems />
              </AdminDashBoard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/additems"
          element={
            <ProtectedRoute role="admin">
              <AdminDashBoard>
                <AddItemsPage />
              </AdminDashBoard>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <ProtectedRoute role="admin">
              <AdminDashBoard>
                <OrdersPage />
              </AdminDashBoard>
            </ProtectedRoute>
          }
        />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <ScrollToTop />
      <NavBar />
      <main className={`${isProductRoute ? "w-full" : "w-[90%] mx-auto"} pt-8`}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/delivery" element={<Delivery />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/mens" element={<Mens />} />
          <Route path="/womens" element={<Womens />} />
          <Route path="/kids" element={<Kids />} />

          {/* Private Routes */}
          <Route
            path="/user/account"
            element={
              <PrivateRoute>
                <UserAccount />
              </PrivateRoute>
            }
          />
          <Route
            path="/payment"
            element={
              <PrivateRoute>
                <AddressDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <PrivateRoute>
                <Favorites />
              </PrivateRoute>
            }
          />

          {/* Not Found Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

export default App;
