# VogueVault E-Commerce Application

## Overview

**VogueVault** is a modern, full-stack E-Commerce web application built with ReactJS (frontend) and Node.js/Express (backend), styled using Tailwind CSS and Material UI. It features dynamic product pages, category-based filtering, user authentication, and an extensible admin dashboard for managing products, users, and orders.

---

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Frontend](#frontend)
  - [Key Pages & Routing](#key-pages--routing)
  - [Product Filtering](#product-filtering)
  - [Authentication](#authentication)
  - [Admin Dashboard](#admin-dashboard)
- [Backend](#backend)
  - [API Endpoints](#api-endpoints)
  - [Authentication](#backend-authentication)
  - [Admin Routes](#admin-routes)
  - [How the Backend Works](#how-the-backend-works)
- [Data & Assets](#data--assets)
- [Setup & Scripts](#setup--scripts)
- [Future Enhancements](#future-enhancements)

---

## Features

- **Dynamic Product Pages:** Separate sections for Men, Women, and Kids.
- **Filtering:** Filter products by category and type.
- **Responsive Design:** Optimized for desktop, tablet, and mobile.
- **Authentication:** User and admin login, signup, and session management.
- **Admin Dashboard:** Manage products, users, orders, and settings.
- **Extensibility:** Ready for payment gateway, real-time APIs, and more.

---

## Project Structure

```
VogueVault/
│
├── src/                # Frontend source code (React)
│   ├── Components/     # UI components (pages, admin, common, etc.)
│   ├── Context/        # React Contexts (Auth, Data)
│   ├── Hooks/          # Custom React hooks
│   ├── Routes/         # Route guards and helpers
│   ├── Utils/          # Utility functions and API handlers
│   ├── assets/         # Static assets (images, etc.)
│   └── main.jsx        # App entry point
│
├── server/             # Backend source code (Node.js/Express)
│   ├── Controllers/    # Route controllers
│   ├── Models/         # Mongoose models
│   ├── Routes/         # Express route definitions
│   ├── middleware/     # Auth and other middleware
│   ├── Utils/          # Utility functions (DB, auth, etc.)
│   └── index.js        # Server entry point
│
├── public/             # Static files for frontend
├── package.json        # Frontend dependencies and scripts
├── server/package.json # Backend dependencies and scripts
└── README.md           # Project documentation
```

---

## Frontend

### Key Pages & Routing

- **Home, About, Contact, Collection:** Main public pages.
- **Product Pages:** `/product/:id` for detailed product view.
- **Category Pages:** `/mens`, `/womens`, `/kids` for gender/age-based browsing.
- **Cart & Favorites:** Shopping cart and wishlist.
- **User Account:** `/user/account/:userId` (protected).
- **Admin Dashboard:** `/admin/*` (protected, separate layout).

Routing is managed in `src/App.jsx` using `react-router-dom`, with lazy loading for performance.

### Product Filtering

- Filtering by category (Men, Women, Kids) and type (TopWear, BottomWear, WinterWear) is implemented in `src/Components/Pages/Collection.jsx`.
- Sorting options: Relevant, Price Low-to-High, Price High-to-Low.
- Category grids and subcategory filtering are available on each main section page.

### Authentication

- **Frontend Context:** Managed in `src/Context/AuthContext.jsx`.
  - Stores user/admin info and JWT token in localStorage.
  - Handles token refresh, expiration, and logout.
- **Routes:** `/signin`, `/signup`, `/admin/login`.
- **Protected Routes:** Implemented via `PrivateRoute` and `ProtectedRoute` components.

### Admin Dashboard

- **Layout:** `src/Components/AdminPage/AdminLayout.jsx` provides sidebar navigation, user profile, and main content area.
- **Pages:** Dashboard, Products, Users, Orders, Settings.
- **Access:** Only accessible to authenticated admins.

---

## Backend

### API Endpoints

- **User Auth:** `/api/data/login`, `/api/data/signup`, `/api/data/verifyotp`, `/api/data/resendotp`, `/api/data/user/logout`
- **Products:** `/api/data/products` (CRUD operations)
- **Cart:** `/api/data/cart`
- **Admin:** `/api/data/admin/*` (see below)

### Backend Authentication

- **JWT-based:** Tokens are issued on login and checked for protected routes.
- **Token Refresh:** Endpoint `/auth/refresh` for refreshing tokens.
- **Middleware:** `auth` middleware for user routes, `isAdmin` for admin routes.

### Admin Routes

Defined in `server/Routes/Admin.routes.js`:

- **Login/Signup:** `/admin/login`, `/admin/signup`
- **Dashboard Stats:** `/admin/dashboard/stats`
- **Product Management:** `/admin/products` (GET, POST, PUT, DELETE)
- **User Management:** `/admin/users`, `/admin/users/:id`
- **Order Management:** `/admin/orders`, `/admin/orders/:id`
- **Settings:** `/admin/settings`

### How the Backend Works

The backend of VogueVault is built with Node.js and Express, using MongoDB (via Mongoose) for data storage. It is structured for scalability, security, and maintainability. Here's how it works:

- **Architecture:**

  - Follows a modular MVC-like structure: routes, controllers, models, middleware, and utilities are separated for clarity and reusability.
  - Uses environment variables for configuration (via `dotenv`).

- **Database:**

  - MongoDB is used for persistent storage of users, products, orders, and admin data.
  - Mongoose models define the schema and provide validation.

- **API Routing:**

  - All API endpoints are prefixed (e.g., `/api/data/products`, `/api/data/admin`).
  - Routes are grouped by resource (products, users, cart, admin, etc.) and mapped to controller functions.

- **Authentication & Authorization:**

  - JWT-based authentication for both users and admins.
  - Middleware (`auth`, `isAdmin`) protects sensitive routes and checks token validity.
  - Token refresh endpoint (`/auth/refresh`) keeps sessions alive securely.

- **Security:**

  - Uses `helmet` for setting secure HTTP headers.
  - CORS is configured to allow only trusted origins.
  - Rate limiting and input validation are implemented to prevent abuse.

- **File Uploads:**

  - Uses `multer` for handling file uploads (e.g., product images), served from the `/uploads` directory.

- **Logging & Error Handling:**

  - Uses `winston` for logging requests and errors.
  - Centralized error handling middleware returns consistent error responses.

- **Admin Functionality:**

  - Admin routes allow for product, user, and order management, as well as dashboard statistics and settings.
  - All admin routes are protected and require a valid admin token.

- **Request Flow Example:**

  1. Client sends a request (e.g., login, fetch products).
  2. Express route receives the request and applies middleware (CORS, helmet, auth, etc.).
  3. Controller processes the request, interacts with the database, and returns a response.
  4. Errors are caught and handled by the error middleware.

- **Main Technologies:**
  - Node.js, Express, MongoDB, Mongoose, JWT, Helmet, Winston, Multer, dotenv.

---

## Data & Assets

- **Sample Data:** `products.json`, `users.products.json`, `users.userinfos.json`
- **Assets:** Product images and static files in `src/assets/` and `public/`

---

## Setup & Scripts

### Frontend

- **Install dependencies:** `npm install`
- **Run dev server:** `npm run dev`
- **Build for production:** `npm run build`
- **Preview build:** `npm run preview`
- **Lint:** `npm run lint`

### Backend

- **Install dependencies:** `cd server && npm install`
- **Run dev server:** `npm run dev`
- **Start server:** `npm start`
- **Run tests:** `npm test`
- **Lint:** `npm run lint`

---

## Future Enhancements

- Enable user accounts for personalization and order tracking.
- Integrate with APIs for real-time product data.
- Develop a more advanced admin dashboard for inventory and analytics.
- Add payment gateway integration.
- Improve accessibility and internationalization.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a clear description of your changes.

---

## License

This project is licensed under the ISC License.
