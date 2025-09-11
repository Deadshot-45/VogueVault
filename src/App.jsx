import { Suspense, useContext } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import ScrollToTop from "./Components/Layout/ScrollToTop";
import NavBar from "./Components/Layout/NavBar";
import Footer from "./Components/Layout/Footer";
import PrivateRoute from "./Routes/PrivateRoute";
import ProtectedRoute from "./Routes/ProtectedRoute";
import { AuthContext } from "./Context/AuthContext";
import LoadingSpinner from "./Components/Common/LoadingSpinner";
import ErrorBoundary from "./Components/Common/ErrorBoundary";
import * as Lazy from "./Components/Common/LazyComponents";
import AdminLayout from "./Components/AdminPage/AdminLayout";
import Notification from "./Components/Common/Notification";

const App = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isProductRoute = location.pathname.startsWith("/product/");
  const { isLoading: isAuthLoading } = useContext(AuthContext);

  // Simplify suspense handling to avoid stacked error boundaries
  const withSuspense = (Component) => (
    <Suspense fallback={<LoadingSpinner />}>
      <ErrorBoundary>{Component}</ErrorBoundary>
    </Suspense>
  );

  if (isAuthLoading) {
    return (
      <div className="min-h-[100dvh] flex items-center justify-center w-full border">
        <LoadingSpinner />
      </div>
    );
  }

  if (isAdminRoute) {
    return (
      <ErrorBoundary>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/admin/login" element={<Lazy.AdminLogin />} />
            <Route
              index
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Lazy.DashBoard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Lazy.DashBoard />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/products"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Lazy.Products />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/orders"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Lazy.OrdersPage />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Lazy.Users />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/settings"
              element={
                <ProtectedRoute>
                  <AdminLayout>
                    <Lazy.Settings />
                  </AdminLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        <ScrollToTop />
        <NavBar />
        {/* Global Notifications */}
        <Notification />
        <main
          className={`${isProductRoute ? "w-full" : "w-[90%] mx-auto"} pt-8`}
        >
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={withSuspense(<Lazy.Home />)} />
            <Route path="/about" element={withSuspense(<Lazy.About />)} />
            <Route
              path="/collection"
              element={withSuspense(<Lazy.Collection />)}
            />
            <Route path="/contact" element={withSuspense(<Lazy.Contact />)} />
            <Route path="/signin" element={withSuspense(<Lazy.SignIn />)} />
            <Route path="/signup" element={withSuspense(<Lazy.SignUp />)} />
            <Route
              path="/unauthorized"
              element={withSuspense(<Lazy.Unauthorized />)}
            />
            <Route path="/delivery" element={withSuspense(<Lazy.Delivery />)} />
            <Route
              path="/privacy-policy"
              element={withSuspense(<Lazy.PrivacyPolicy />)}
            />
            <Route
              path="/product/:id"
              element={withSuspense(<Lazy.ProductPage />)}
            />
            <Route path="/cart" element={withSuspense(<Lazy.Cart />)} />
            <Route path="/mens" element={withSuspense(<Lazy.Mens />)} />
            <Route path="/womens" element={withSuspense(<Lazy.Womens />)} />
            <Route path="/kids" element={withSuspense(<Lazy.Kids />)} />

            {/* Private Routes */}
            <Route
              path="/user/account/:userId"
              element={withSuspense(
                <PrivateRoute>
                  <Lazy.UserAccount />
                </PrivateRoute>
              )}
            />
            <Route
              path="/payment"
              element={withSuspense(
                <PrivateRoute>
                  <Lazy.AddressDetails />
                </PrivateRoute>
              )}
            />
            <Route
              path="/favorites"
              element={withSuspense(
                <PrivateRoute>
                  <Lazy.Favorites />
                </PrivateRoute>
              )}
            />

            {/* Not Found Route */}
            <Route path="*" element={withSuspense(<Lazy.NotFound />)} />
          </Routes>
        </main>
        <Footer />
      </div>
    </ErrorBoundary>
  );
};

export default App;
