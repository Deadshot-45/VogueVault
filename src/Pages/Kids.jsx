import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Assets
import { assets } from "../assets/frontend_assets/assets";

// Components
import ProductCard from "../Components/ProductPages/ProductCard";
import CategoryGrid from "../Components/SubPage/CategoryGrid";

// Hooks
import { useProductQuery } from "../Hooks/UseProductQuery";

const Kids = () => {
  // Filter kids' products from assets.products
  const [kidsProducts, setKidsProducts] = useState([]);
  const [subCategory, setsubCategory] = useState([]);
  const { data } = useProductQuery("Kids"); // Call the custom hook for products

  useEffect(() => {
    if (data && data.length > 0) {
      setKidsProducts(data);
      setsubCategory([
        ...new Set(data.map((product) => product.subCategory.toLowerCase())),
      ]);
    }
  }, [data, kidsProducts]);

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
            <h1 className="text-4xl max-xs:text-3xl font-bold">
              Kids Collection
            </h1>
            <p className="text-lg max-xs:text-md">
              Adorable styles for your little ones
            </p>
          </div>
        </div>
      </section>
      {/* Categories Grid */}
      <CategoryGrid
        subCategory={subCategory}
        products={data}
        setFunc={setKidsProducts}
      />

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kidsProducts.map((product) => (
            <Link key={product._id} to={`/product/${product._id}`}>
              <ProductCard product={product} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Kids;
