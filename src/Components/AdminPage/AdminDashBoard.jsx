import React from "react";
import { Link} from "react-router-dom";
import { assets } from "../../assets/admin_assets/assets";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LiaListUlSolid } from "react-icons/lia";
import { BsBoxes } from "react-icons/bs";

const AdminDashBoard = ({ children }) => {
  return (
    <section className="w-full min-h-[100dvh] bg-white flex flex-col items-center mx-auto">
      <nav className="flex justify-between w-full py-3 border-b border-gray-300 px-16">
        <Link to={'/admin/'} className="w-40 relative">
          <img
            src={assets.VogueVault}
            alt="logo"
            className="h-16 w-full mix-blend-darken"
          />
        </Link>
        <div className="flex justify-center items-center">
          <Link
            className="h-10 py-2 px-6 text-sm bg-zinc-700 text-white rounded-full"
            to="/admin"
          >
            Logout
          </Link>
        </div>
      </nav>
      <section className="w-[90%] min-h-screen flex justify-between relative">
        <article className="w-[220px] min-h-[100%] flex flex-col gap-3 items-end py-10 border-r border-zinc-300">
          <Link to={"/admin/additems"} className="w-full cursor-pointer flex gap-2 items-center p-3 border-t border-b border-l border-zinc-300">
            <IoIosAddCircleOutline /> <p>Add items</p>
          </Link>
          <Link to={'/admin/itemslist'} className="w-full cursor-pointer flex gap-2 items-center p-3 border-t border-b border-l border-zinc-300">
            <LiaListUlSolid /> <p>List items</p>
          </Link>
          <Link to={"/admin/orders"} className="w-full cursor-pointer flex gap-2 items-center p-3 border-t border-b border-l border-zinc-300">
            <BsBoxes /> <p>Orders</p>
          </Link>
        </article>
        {children}
      </section>
    </section>
  );
};

export default AdminDashBoard;
