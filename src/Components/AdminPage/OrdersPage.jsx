import React from "react";
import { BsBoxFill } from "react-icons/bs";
import { assets } from "../../assets/admin_assets/assets";

const OrdersPage = () => {
  return (
    <section className="w-[90%] min-h-screen flex flex-col gap-2 py-10 px-16 relative">
      <h2 className="text-md font-semibold mb-4">Order Page</h2>

      <article className="flex justify-between text-sm p-4 bg-[#ffffff] rounded-sm border border-zinc-300">
        {/* <img src= alt="" /> */}
        <div className="w-[10%] h-20 flex justify-center items-center">
          <img src={assets.parcel_icon} alt="parcel-img" className="h-12 mix-blend-multiply" />
        </div>
        <div className="w-[30%] p-4 flex flex-col gap-2 flex-wrap">
          <h3>Product Name</h3>
          <p>Address</p>
        </div>
        <div className="w-[25%] p-4">
          <p>Items : 0</p>
          <p>Method : COD</p>
          <p>Payment : Pending</p>
          <p>Date : 10/10/2025</p>
        </div>
        <p className="w-[10%] p-4">$10</p>
        <div className="w-[20%] py-2 px-4 rounded">
          <select
            name="status"
            className="bg-white  p-2 outline-red-700 rounded-lg border border-zinc-400"
          >
            <option value="order-placed">Order Placed</option>
            <option value="packing">Packing</option>
            <option value="shipped">Shipped</option>
            <option value="out-of-delivery">Out of Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </article>
    </section>
  );
};

export default OrdersPage;
