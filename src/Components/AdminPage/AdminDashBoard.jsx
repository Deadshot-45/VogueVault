import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/admin_assets/assets";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaListUlSolid } from "react-icons/lia";
import { BsBoxes } from "react-icons/bs";
import { AuthContext } from "../../Context/AuthContext";
import { DataContext } from "../../Context/DataContext";

const AdminDashBoard = ({ children }) => {
  const navigate = useNavigate();
  const { setAdmin, setIsLoggedIn } = useContext(AuthContext);
  const { setCart, setCartCount, setCartTotal, setIsCart } =
    useContext(DataContext);

  const handleLogout = () => {
    try {
      // First clear all authentication data
      setAdmin(null);
      setIsLoggedIn("");

      // Clear cart data from state
      setCart([]);
      setCartCount(0);
      setCartTotal(0);
      setIsCart(false);

      // Clear all localStorage data
      localStorage.removeItem("admin");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("cart");
      localStorage.removeItem("carttotal");
      localStorage.removeItem("shipping");
      localStorage.removeItem("gst");
      localStorage.removeItem("totalPrice");
      localStorage.removeItem("Coupon");

      // Use a small delay to ensure state is cleared before navigation
      setTimeout(() => {
        navigate("/admin/login", { replace: true });
      }, 100);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <section className="w-full min-h-[100dvh] bg-white flex flex-col items-center mx-auto">
      <nav className="flex justify-between w-full py-3 border-b border-gray-300 px-16">
        <Link to={"/admin/"} className="w-40 relative">
          <img
            src={assets.VogueVault}
            alt="logo"
            className="h-16 w-full mix-blend-darken"
          />
        </Link>
        <div className="flex justify-center items-center">
          <button
            type="button"
            onClick={handleLogout}
            className="h-10 py-2 px-6 text-sm bg-zinc-700 text-white rounded-full hover:bg-zinc-800 transition-colors duration-200"
          >
            Logout
          </button>
        </div>
      </nav>
      <section className="w-[90%] min-h-screen flex justify-between relative">
        <article className="w-[220px] min-h-[100%] flex flex-col gap-3 items-end py-10 border-r border-zinc-300">
          <Link
            to={"/admin/additems"}
            className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-black transition-colors duration-200"
          >
            <IoIosAddCircleOutline className="h-5 w-5" />
            Add Items
          </Link>
          <Link
            to={"/admin/listitems"}
            className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-black transition-colors duration-200"
          >
            <LiaListUlSolid className="h-5 w-5" />
            List Items
          </Link>
          <Link
            to={"/admin/orders"}
            className="flex items-center gap-2 text-sm font-medium text-zinc-700 hover:text-black transition-colors duration-200"
          >
            <BsBoxes className="h-5 w-5" />
            Orders
          </Link>
        </article>
        <article className="w-[calc(100%-240px)] min-h-screen py-10">
          {children}
        </article>
      </section>
    </section>
  );
};

export default AdminDashBoard;
