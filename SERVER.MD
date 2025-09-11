# VogueVault Backend Documentation

## Overview

The backend of VogueVault is a Node.js/Express application using MongoDB (via Mongoose) for data storage. It is designed for scalability, security, and maintainability, supporting all core e-commerce features and admin operations.

---

## Architecture & Workflow

- **MVC-like Structure:**

  - **Routes:** Define API endpoints and map them to controllers.
  - **Controllers:** Handle business logic and interact with models.
  - **Models:** Define MongoDB schemas and data validation.
  - **Middleware:** Handle authentication, authorization, validation, and error handling.
  - **Utils:** Utility functions for encryption, mailing, file uploads, etc.

- **Database:**

  - MongoDB is used for persistent storage.
  - Mongoose models: `User`, `Product`, `Order`, `Admin`, `Settings`.

- **API Routing:**

  - All endpoints are prefixed (e.g., `/api/data/products`, `/api/data/admin`).
  - Routes are grouped by resource and mapped to controller functions.

- **Authentication & Authorization:**

  - JWT-based authentication for users and admins.
  - Middleware (`auth`, `isAdmin`) protects sensitive routes.
  - Token refresh endpoint for session management.

- **Security:**

  - Uses `helmet` for HTTP headers.
  - CORS configured for trusted origins.
  - Rate limiting and input validation.

- **File Uploads:**

  - Uses `multer` for handling file uploads (e.g., product images).

- **Logging & Error Handling:**
  - Uses `winston` for logging.
  - Centralized error handling middleware.

---

## Main Request Flow

1. **Client Request:** Client sends a request (e.g., login, fetch products).
2. **Express Middleware:** Request passes through middleware (CORS, helmet, auth, etc.).
3. **Routing:** Route matches and calls the appropriate controller.
4. **Controller Logic:** Controller processes the request, interacts with the database via models, and returns a response.
5. **Error Handling:** Errors are caught and handled by centralized middleware.

---

## Controllers & Their Responsibilities

### User Controller (`User.controller.js`)

- `getUser`: Fetch user profile by token.
- `updateUser`: Update user profile information.
- `updateUserImg`: Update user avatar image.

### Authorization Controller (`Authorization.controller.js`)

- `signupUser`: Register a new user.
- `authenticateUser`: Login and send OTP for verification.
- `verifyotp`: Verify OTP and issue JWT.
- `resendOtp`: Resend OTP to user.
- `logoutUser`: Logout and invalidate token.

### Products Controller (`Products.controller.js`)

- `getProducts`: List all products.
- `getProduct`: Get a single product by ID.
- `addProduct`/`addProducts`: Add one or multiple products.
- `searchProduct`: Search products by name/category/subcategory.
- `productQuery`: Query products by category or subcategory.

### Cart Controller (`Cart.controller.js`)

- `getCart`: Get user's cart.
- `updateCartProduct`: Update quantity/size of a product in cart.
- `deleteCartProduct`: Remove a product from cart.
- `addToCart`: Add a product to cart.
- `getFavorate`: Get or update user's favorite products.
- `updateFavorate`: Update a single favorite product.

### Admin Controller (`adminController.js`)

- `adminLogin`/`adminSignUp`: Admin authentication.
- `getDashboardStats`: Get dashboard statistics.
- **Product Management:** `getProducts`, `createProduct`, `updateProduct`, `deleteProduct`.
- **User Management:** `getUsers`, `getUser`, `updateUser`, `deleteUser`.
- **Order Management:** `getOrders`, `getOrder`, `updateOrderStatus`, `deleteOrder`.
- **Settings:** `getSettings`, `updateSettings`.

---

## Models (Mongoose Schemas)

### User (`User.model.js`)

- Fields: name, email, mobile, password, role, avatar, address, cart, orders, favorite, otp, token, etc.
- Cart and favorite are arrays of embedded subdocuments.

### Product (`Products.model.js`)

- Fields: name, description, price, category, subCategory, image, sizes, stock, sold, rating, reviews, bestseller, featured, etc.

### Order (`Order.model.js`)

- Fields: user (ref), items (array of products), shippingAddress, paymentInfo, status, subtotal, tax, shippingFee, total, trackingNumber, etc.
- Methods: updateStatus, cancelOrder, findByDateRange, getOrderStats.

### Admin (`Admin.model.js`)

- Fields: name, email, password, role, token, avatar, created_at, updated_at.

### Settings (`Settings.model.js`)

- Fields: storeName, storeEmail, storePhone, storeAddress, currency, taxRate, shippingFee, maintenanceMode, enableNotifications, theme, etc.

---

## Middleware

- **auth.js:** User JWT authentication middleware. Checks for valid token and attaches user info to request.
- **authMiddleware.js:** Admin JWT authentication middleware. Checks for valid admin token and role.
- **multer.js:** Handles file uploads for images.
- **Connect.js:** Handles MongoDB connection pooling and caching.

---

## Utilities

- **EncData.js:** Password encryption.
- **compareEncryption.js:** Password comparison.
- **MailSender.js:** Sends OTP and other emails.
- **genrateOtp.js:** Generates OTP codes.

---

## Example: Adding a Product (Request Flow)

1. **Client** sends a POST request to `/api/data/products/addproducts` with product data.
2. **Express** applies middleware (CORS, helmet, validation, etc.).
3. **Route** matches `/addproducts` and calls `addProducts` in `Products.controller.js`.
4. **Controller** validates and saves the product(s) using the `Product` model.
5. **Response** is sent back to the client with success or error message.

---

## Running the Backend

- Install dependencies: `cd server && npm install`
- Start development server: `npm run dev`
- Start production server: `npm start`
- Environment variables: Set in `.env` (e.g., `MONGODB_URI`, `JWT_SECRET`)

---

## Technologies Used

- Node.js, Express, MongoDB, Mongoose, JWT, Helmet, Winston, Multer, dotenv

---

For more details, see the code in the `server/` directory or reach out to the maintainers.
