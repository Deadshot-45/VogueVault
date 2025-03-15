import React, { useEffect, useState } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { products } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import ProductCard from "../ProductPages/ProductsCard";

const Kids = () => {
  // Filter kids' products from assets.products
  const [kidsProducts, setKidsProducts] = useState(() => {
    return products.filter((product) => product.category === "Kids");
  });
  const [subCategory, setsubCategory] = useState(()=>{
    const product = products.filter((product) => product.category === "Kids");
    return [...new Set(product.map((product) => product.subCategory))];
  });

  const handleCategoryFilter = (category) => {
    
    // Filter products based on subcategory
    const filteredProducts = products.filter(
      (product) => product.subCategory === category && product.category === "Kids"
    );
    setKidsProducts(filteredProducts);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px] max-xs:h-[250px]">
        <img
          src={assets.kids_hero}
          alt="Kids Collection"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl max-xs:text-3xl font-bold">Kids Collection</h1>
            <p className="text-lg max-xs:text-md">Adorable styles for your little ones</p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subCategory.map((subcategory) => {
            const firstProduct = products.find(product=> product.subCategory === subcategory && product.category === "Kids");
            return (
              <button
                key={subcategory}
                onClick={() => handleCategoryFilter(subcategory)}
                className="group relative overflow-hidden mx-auto rounded-lg"
              >
                <img
                  src={firstProduct?.image}
                  alt={subcategory}
                  loading="lazy"
                  className="w-full h-[400px] max-sm:min-xs:h-[15dvh] max-sm:w-[20dvh] max-xs:h-[18dvh] object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h2 className="text-white text-2xl max-xs:text-sm font-semibold">
                    {subcategory}
                  </h2>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kidsProducts.map((product) => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Kids;
