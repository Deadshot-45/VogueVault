import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { products } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import ProductCard from "../ProductPages/ProductsCard";

const Kids = () => {
  // Filter kids' products from assets.products
  const kidsProducts = products.filter(
    (product) => product.category === "Kids"
  );

  // // Get unique subcategories from products
  // const subcategories = [
  //   ...new Set(kidsProducts.map((product) => product.subCategory)),
  // ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px]">
        <img
          src={assets.kids_hero}
          alt="Kids Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl font-bold">Kids Collection</h1>
            <p className="text-lg">Adorable styles for your little ones</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      {/* <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategories.map((subcategory) => {
            const firstProduct = kidsProducts.find(
              (product) => product.subCategory === subcategory
            );
            return (
              <Link
                key={subcategory}
                to={`/product/${firstProduct?.id}`}
                className="group relative overflow-hidden rounded-lg"
              >
                <img
                  src={firstProduct?.image}
                  alt={subcategory}
                  className="w-full h-[400px] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-2xl font-semibold">
                    {subcategory}
                  </h2>
                </div>
              </Link>
            );
          })}
        </div>
      </section> */}

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kidsProducts.map((product) => (
            <Link key={product.id}  to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Kids;
