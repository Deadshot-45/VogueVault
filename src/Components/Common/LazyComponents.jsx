import React from "react";
import ErrorBoundary from "./ErrorBoundary";

// Helper function to add delay and chunking with error boundary
const lazyWithDelay = (factory, delay = 300) => {
  const LazyComponent = React.lazy(
    () => new Promise((resolve) => setTimeout(() => resolve(factory()), delay))
  );

  const WrappedComponent = (props) => (
    <ErrorBoundary>
      <LazyComponent {...props} />
    </ErrorBoundary>
  );
  WrappedComponent.displayName = `LazyLoaded(${factory.name || "Component"})`;
  return WrappedComponent;
};

// Preload hints for critical components
// const preloadComponent = (factory) => {
//   const link = document.createElement("link");
//   link.rel = "modulepreload";
//   link.href = factory().then((module) => module.default);
//   document.head.appendChild(link);
// };

// Chunk 1: Core/Essential Components (Load immediately)
export const Home = lazyWithDelay(() => import("../Pages/Home"), 0);
export const NavBar = lazyWithDelay(() => import("../Layout/NavBar"), 0);
export const Footer = lazyWithDelay(() => import("../Layout/Footer"), 0);

// Preload critical components
// preloadComponent(() => import("../Pages/Home"));
// preloadComponent(() => import("../Layout/NavBar"));

// Chunk 2: Authentication Components
export const SignIn = lazyWithDelay(() => import("../Pages/SignIn"));
export const SignUp = lazyWithDelay(() => import("../Pages/SignUp"));
export const Unauthorized = lazyWithDelay(() =>
  import("../../Routes/Unauthorized")
);

// Chunk 3: Main Pages
export const About = lazyWithDelay(() => import("../Pages/About"));
export const Contact = lazyWithDelay(() => import("../Pages/Contact"));
export const Collection = lazyWithDelay(() => import("../Pages/Collection"));

// Chunk 4: Product Related
export const ProductPage = lazyWithDelay(() =>
  import("../ProductPages/ProductPage")
);
export const Cart = lazyWithDelay(() =>
  import("../CartDetailsAndFavorate/Cart")
);
export const Favorites = lazyWithDelay(() => import("../user/Favorites"));

// Chunk 5: Category Pages
export const Mens = lazyWithDelay(() => import("../Pages/Mens"));
export const Womens = lazyWithDelay(() => import("../Pages/Womens"));
export const Kids = lazyWithDelay(() => import("../Pages/Kids"));

// Chunk 6: User Account Related
export const UserAccount = lazyWithDelay(() => import("../user/UserAccount"));
export const AddressDetails = lazyWithDelay(() =>
  import("../PaymentPages/AddressDetails")
);

// Chunk 7: Information Pages
export const Delivery = lazyWithDelay(() => import("../Common/Delivery"));
export const PrivacyPolicy = lazyWithDelay(() =>
  import("../Common/PrivacyPolicy")
);
export const NotFound = lazyWithDelay(() => import("../Common/NotFound"));

// Chunk 8: Admin Related
export const AdminLayout = lazyWithDelay(() =>
  import("../AdminPage/AdminLayout")
);
export const AdminLogin = lazyWithDelay(() =>
  import("../AdminPage/AdminLogin")
);

export const DashBoard = lazyWithDelay(() => import("../AdminPage/Dashboard"));

export const OrdersPage = lazyWithDelay(() => import("../AdminPage/Orders"));
export const Products = lazyWithDelay(() => import("../AdminPage/Products"));

export const Users = lazyWithDelay(() => import("../AdminPage/Users"));
export const Settings = lazyWithDelay(() => import("../AdminPage/Settings"));
