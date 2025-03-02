import React from "react";

const DashBoard = () => {
  return (
    <section className="w-[calc(100%-220px)] p-10">
      <h1 className="text-xl font-semibold">Admin DashBoard</h1>
      <article className="flex flex-wrap gap-4 mt-4">
        <div className="w-[300px] p-4 text-gray-500 border border-zinc-400 rounded-sm hover:bg-zinc-100 hover:text-zinc-700">
          <p
            className="text-sm  hover:text-gray-900 transition duration
                300 ease-in-out"
          >
            Total Orders
          </p>
          <p className="text-2xl font-semibold text-zinc-700">100</p>
        </div>
        <div className="w-[300px] p-4 border border-zinc-400 rounded-sm hover:bg-zinc-100 hover:text-zinc-700">
          <p
            className="text-sm text-gray-500 hover:text-gray-900 transition duration
                300 ease-in-out"
          >
            Total Sales
          </p>
          <p className="text-2xl font-semibold text-zinc-700">1000</p>
          <div className="flex justify-between">
            <p>Last Month :</p> <p>900</p>
          </div>
        </div>
        <div className="w-[300px] p-4 border border-zinc-400 rounded-sm hover:bg-zinc-100 hover:text-zinc-700">
          <p
            className="text-sm text-gray-500 hover:text-gray-900 transition duration
                    300 ease-in-out"
          >
            Total Customers
          </p>
          <p className="text-2xl font-semibold text-zinc-700">1000</p>
          <div className="flex justify-between">
            <p>New Customers :</p> <p>100</p>
          </div>
        </div>
        <div className="w-[300px] p-4 border border-zinc-400 rounded-sm hover:bg-zinc-100 hover:text-zinc-700">
          <p
            className="text-sm text-gray-500 hover:text-gray-900 transition duration
                        300 ease-in-out"
          >
            Total Products
          </p>
          <p className="text-2xl font-semibold text-zinc-700">1000</p>
        </div>
        <div className="w-[300px] p-4 border border-zinc-400 rounded-sm hover:bg-zinc-100 hover:text-zinc-700">
          <p
            className="text-sm text-gray-500 hover:text-gray-900 transition duration
                            300 ease-in-out"
          >
            Total Revenue
          </p>
          <p className="text-2xl font-semibold text-zinc-700">1000</p>
          <div className="flex justify-between">
            <p>Last Month :</p> <p>100</p>
          </div>
        </div>
        <div className="w-[300px] p-4 border border-zinc-400 rounded-sm hover:bg-zinc-100 hover:text-zinc-700">
          <p
            className="text-sm text-gray-500 hover:text-gray-900 transition duration
                                300 ease-in-out"
          >
            Total Expenses
          </p>
          <p className="text-2xl font-semibold text-zinc-700">1000</p>
          <div className="flex justify-between">
            <p>Last Month :</p> <p>100</p>
          </div>

        </div>
        <div className="w-[300px] p-4 border border-zinc-400 rounded-sm hover:bg-zinc-100 hover:text-zinc-700">
          <p
            className="text-sm text-gray-500 hover:text-gray-900 transition duration
                                    300 ease-in-out"
          >
            Total Profit
          </p>
          <p className="text-2xl font-semibold text-zinc-700">1000</p>
          <div className="flex justify-between">
            <p>Today :</p> <p>100</p>
          </div>
          <div className="flex justify-between">
            <p>Last Month :</p> <p>100</p>
          </div>
        </div>
      </article>
    </section>
  );
};

export default DashBoard;
