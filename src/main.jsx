
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DataContext } from './Components/ContextFile/DataContext.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "./Components/Pages/NotFound.jsx";
import AdminLayout from './Components/AdminPage/AdminLayout.jsx'
import AdminLoginIn from './Components/AdminPage/AdminLogin.jsx'
import Home from './Components/Pages/Home.jsx'
import About from './Components/Pages/About.jsx'
import Collection from './Components/Pages/Collection.jsx'
import Contact from './Components/Pages/Contact.jsx'
import SignIn from './Components/Pages/SignIn.jsx'
import SignUp from './Components/Pages/SignUp.jsx'
import UserAccount from './Components/Pages/UserAccount.jsx'
import ProductPage from './Components/ProductsCard/ProductPage.jsx'
import Cart from './Components/Pages/Cart.jsx'
import AdminDashBoard from './Components/AdminPage/AdminDashBoard.jsx'
import DashBoard from './Components/AdminPage/DashBoard.jsx'
import AddItemsPage from './Components/AdminPage/AddItemsPage.jsx'
import OrdersPage from './Components/AdminPage/OrdersPage.jsx'
import ListItems from './Components/AdminPage/ListItems.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <DataContext>
      

        <Routes>
          <Route path="/" element={<App ><Home /></App>} />
          <Route path="/about" element={<App ><About /></App>} />
          <Route path="/collection" element={<App ><Collection /></App>} />
          <Route path="/contact" element={<App ><Contact /></App>} />
          <Route path="/signin" element={<App ><SignIn /></App>} />
          <Route path="/signup" element={<App ><SignUp /></App>} />
          <Route path="/cart" element={<App ><Cart /></App>} />
          <Route path="/product" element={<App ><ProductPage /></App>} />
          <Route path="/user/:user" element={<App ><UserAccount/></App>} />
          <Route path="/admin/login" element={
            <AdminLayout>
              <AdminLoginIn />
            </AdminLayout>
          } />
          <Route path='/admin/' element={<AdminDashBoard><DashBoard /></AdminDashBoard>} />
          <Route path="/admin/itemslist" element={<AdminDashBoard><ListItems /></AdminDashBoard>} />
          <Route path="/admin/additems" element={<AdminDashBoard><AddItemsPage /></AdminDashBoard>} />
          <Route path="/admin/orders" element={<AdminDashBoard><OrdersPage /></AdminDashBoard>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </DataContext>
    </Router>
  </StrictMode>,
)