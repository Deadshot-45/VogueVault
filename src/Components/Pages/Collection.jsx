import React, { useState, useMemo, useContext } from "react";
import { products } from "../../assets/frontend_assets/assets";
import ProductsCard from "../ProductsCard/ProductsCard";
import { Link } from "react-router-dom";
import { DataFile } from "../ContextFile/DataContext";

const SORTING_OPTIONS = [
  { value: "Relavent", label: "Sort By : Relavent" },
  { value: "Low-to-high", label: "Sort By : Low-to-high" },
  { value: "High-to-low", label: "Sort By : High-to-low" },
];

const Collection = () => {
  const { setProductDetails } = useContext(DataFile);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    SORTING_OPTIONS[0].value
  );

  const filteredProducts = useMemo(() => {
    let filtered = products;

    if (category) {
      filtered = filtered.filter(
        (product) => product.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (type) {
      filtered = filtered.filter(
        (product) => product.subCategory.toLowerCase() === type.toLowerCase()
      );
    }

    switch (selectedSortingOption) {
      case "Low-to-high":
        filtered = filtered.sort((a, b) => a.price - b.price);
        break;
      case "High-to-low":
        filtered = filtered.sort((a, b) => b.price - a.price);
        break;
      default: // Relavent
        break;
    }

    return filtered;
  }, [category, type, selectedSortingOption]);

  const handleSortByCategory = (value) => {
    setCategory(value);
  };

  const handleSortByType = (value) => {
    setType(value);
  };

  const handleSortingOptionChange = (event) => {
    setSelectedSortingOption(event.target.value);
  };

  return (
    <section className="w-full flex border-t border-zinc-300 justify-between mb-16 pt-6">
      <article className="w-[20%] flex flex-col gap-4">
        <h2 className="text-3xl">Filter</h2>
        <div className="flex flex-col px-3 py-2 border border-zinc-300">
          <label htmlFor="sortbycategory" className="py-2 border-b">
            Category
          </label>
          <p className="flex gap-1">
            <input
              type="radio"
              onClick={() => handleSortByCategory("Men")}
              name="sortbycategory"
              className="py-2 accent-red-600"
            />
            Men
          </p>
          <p className="flex gap-1">
            <input
              type="radio"
              name="sortbycategory"
              onClick={() => handleSortByCategory("Women")}
              className="py-2 accent-red-600"
            />
            Women
          </p>
          <p className="flex gap-1">
            <input
              type="radio"
              name="sortbycategory"
              onClick={() => handleSortByCategory("Kids")}
              className="py-2 accent-red-600"
            />
            Kids
          </p>
        </div>
        <div className="flex flex-col px-3 py-2 border border-zinc-300">
          <label htmlFor="sortbytype" className="py-2 border-b">
            Type
          </label>
          <p className="flex gap-1">
            <input
              type="radio"
              name="sortbytype"
              onClick={() => handleSortByType("TopWear")}
              className="py-2 accent-red-600"
            />
            TopWear
          </p>
          <p className="flex gap-1">
            <input
              type="radio"
              name="sortbytype"
              onClick={() => handleSortByType("BottomWear")}
              className="py-2 accent-red-600"
            />
            BottomWear
          </p>
          <p className="flex gap-1">
            <input
              type="radio"
              name="sortbytype"
              onClick={() => handleSortByType("WinterWear")}
              className="py-2 accent-red-600"
            />
            WinterWear
          </p>
        </div>
      </article>

      <article className="w-[78%] flex flex-col gap-4">
        <div className="w-full h-10 flex justify-between ">
          <div className="w-[60%] flex items-center gap-2">
            <h1 className="font-bold text-xl font-mono text-zinc-500">
              ALL <span className="text-black">Collections</span>
            </h1>
            <div className="border w-10"></div>
          </div>

          <div className="flex justify-center items-center p-2  shadow-[0_0_2px_gray]">
            <select
              id="sortby"
              name="sortby"
              value={selectedSortingOption}
              onChange={handleSortingOptionChange}
              className="outline-none px-2 py-1"
            >
              {SORTING_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-center">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <button
                key={product.id}
                onClick={() => setProductDetails(product)}
              >
                <Link to="/product">
                  <ProductsCard product={product} key={product.id} />
                </Link>
              </button>
            ))
          ) : (
            <p className="text-black">No products found</p>
          )}
        </div>
      </article>
    </section>
  );
};

export default Collection;
