import React, { useContext } from "react";
// import { DataFile } from '../ContextFile/DataContext';
import { products } from "../../assets/frontend_assets/assets";

const ListItems = () => {
  // const  = useContext(DataFile);
  const [items, setItems] = React.useState([...products]);
  return (
    <section className="w-[calc(100%-220px)] space-y-3 p-10">
      <h2 className="text-md font-semibold mb-4">All Products List</h2>
      <article className="w-full flex flex-wrap justify-between py-2 bg-gray-100 border border-zinc-300">
        <div className="w-[10%] px-6">Image</div>
        <div className="w-[30%]">Name</div>
        <div className="w-[10%]">Category</div>
        <div className="w-[10%]">Price</div>
        <div className="w-[10%]">Action</div>
      </article>
      {products.map((product) => (
        <article
          key={product.id}
          className="w-full flex flex-wrap justify-between border border-gray-300"
        >
          <div className="w-[10%] px-6 py-1"><img src={product.image} alt={product.name} className="w-12 h-16 object-cover"/></div>
          <div className="w-[30%] flex items-center">{product.name}</div>
          <div className="w-[10%] flex items-center">{product.price}</div>
          <div className="w-[10%] flex items-center">{product.category}</div>
          <div className="w-[10%] flex items-center">Action</div>
        </article>
      ))}
    </section>
  );
};

export default ListItems;
