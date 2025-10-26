import React, { useContext, useEffect } from "react";
import { assets } from "../../assets/frontend_assets/assets";
import { Link } from "react-router-dom";
import ProductCard from "../ProductPages/ProductsCard";
import CategoryGrid from "../SubPage/CategoryGrid";
import { useProductQuery } from "../../Hooks/UseProductQuery";

const Womens = () => {
  // Filter Women' products from assets.products
  const [womensProducts, setWomensProducts] = React.useState([]);
  // Get unique subcategories from products
  const [subCategory, setsubCategory] = React.useState([]);

  const { data, isLoading, error } = useProductQuery("Women"); // Call the custom hook for products

  useEffect(() => {
    if (data && data.length > 0) {
      setWomensProducts(data);
      setsubCategory([
        ...new Set(data.map((product) => product.subCategory.toLowerCase())),
      ]);
    }
  }, [data]);

  const handleCategoryFilter = (category) => {
    // Filter products based on subcategory
    const filteredProducts = products.filter(
      (product) => product.subCategory.toLowerCase() === category.toLowerCase()
    );
    setWomensProducts(filteredProducts);
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative h-[400px] max-xs:h-[250px]">
        <img
          src={assets.womens_hero}
          alt="Women's Collection"
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white space-y-4">
            <h1 className="text-4xl font-bold max-xs:text-3xl">
              Women's Collection
            </h1>
            <p className="text-lg max-xs:text-md">
              Explore our latest fashion trends
            </p>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <CategoryGrid
        subCategory={subCategory}
        products={data}
        setFunc={setWomensProducts}
      />

      {/* Featured Products */}
      <section className="mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {womensProducts &&
            womensProducts.map((product) => (
              <Link key={product._id} to={`/product/${product._id}`}>
                <ProductCard product={product} />
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
};

export default Womens;
