import React from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { products } from "../../assets/frontend_assets/assets";
import ProductCard from "../ProductPages/ProductsCard";
import { Link } from "react-router-dom";

const Mens = () => {
  // Filter Women' products from assets.products
  const [mensProducts, setMensProducts] = React.useState(() => {
    return products.filter((product) => product.category === "Men");
  });
  // Get unique subcategories from products
  const [subCategory, setsubCategory] = React.useState(() => {
    const product = products.filter((product) => product.category === "Men");
    return [...new Set(product.map((product) => product.subCategory))];
  });
  const handleCategoryFilter = (category) => {
    // Filter products based on subcategory
    const filteredProducts = products.filter(
      (product) =>
        product.subCategory === category && product.category === "Men"
    );
    setMensProducts(filteredProducts);
  };

  return (
    <div className="space-y-16 fade-in">
      {/* Hero Section */}
      <section className="relative h-[400px] max-xs:h-[25 0px]">
        <img
          src={assets.mens_hero}
          loading="lazy"
          alt="Men's Collection"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl font-bold max-xs:text-3xl">
              Men's Collection
            </h1>
            <p className="text-lg max-xs:text-md">
              Discover our latest trends and styles
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subCategory?.map((subcategory) => {
            const firstProduct = products.find(
              (product) =>
                product.subCategory === subcategory &&
                product.category === "Men"
            );
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
                  <h2 className="text-white text-2xl min-xs:text-sm font-semibold">
                    {subcategory}
                  </h2>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 min-sm:max-lg:px-0">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mensProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`mx-auto card-mount delay-${index % 5}`}
            >
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Mens;
