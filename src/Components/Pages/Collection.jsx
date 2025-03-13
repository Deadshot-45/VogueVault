import React, { useState, useMemo, useContext, useEffect } from "react";
import { products } from "../../assets/frontend_assets/assets";
import ProductsCard from "../ProductPages/ProductsCard";
import { Link, useLocation } from "react-router-dom";
import { DataContext } from "../../Context/DataContext";

const SORTING_OPTIONS = [
  { value: "Relavent", label: "Sort By : Relavent" },
  { value: "Low-to-high", label: "Sort By : Low-to-high" },
  { value: "High-to-low", label: "Sort By : High-to-low" },
];

const Collection = () => {
  const { setSearchInput, setSearchTerm: setGlobalSearchTerm } =
    useContext(DataContext);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    SORTING_OPTIONS[0].value
  );
  const location = useLocation();

  // Reset search term when navigating away
  useEffect(() => {
    return () => {
      setGlobalSearchTerm("");
      setSearchInput(false);
    };
  }, [location.pathname, setGlobalSearchTerm, setSearchInput]);

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
      case "Relavent":
        filtered = filtered.sort((a, b) => {
          // First, sort by featured status
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;

          // Then by newness (assuming there's a date field, if not we can use id as newer items might have higher ids)
          if (a.id > b.id) return -1;
          if (a.id < b.id) return 1;

          // Finally by rating if available
          const aRating = a.rating || 0;
          const bRating = b.rating || 0;
          return bRating - aRating;
        });
        break;
      default:
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
    <div className="flex gap-8 max-md:flex-col">
      <aside className="w-64 max-lg:w-40 max-md:w-full max-md:flex max-md:justify-between flex-shrink-0">
        <h2 className="text-2xl font-semibold mb-6 max-md:mb-0">Filter</h2>

        <div className="space-y-6 max-lg:flex">
          <div className="space-y-6">
            {/* Category Filter */}
          <div
            className="border max-md:border-none rounded-lg p-4 max-md:py-0 mx-auto max-md:hidden"
            id="category-filter"
          >
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2 max-md:flex items-center max-md:gap-3">
              {["Men", "Women", "Kids"].map((category, index) => (
                <React.Fragment key={index}>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sortbycategory"
                      onClick={() => handleSortByCategory(category)}
                      className="accent-red-600"
                    />
                    {category}
                  </label>
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* SubCategory Filter */}
          <div
            className="border max-md:border-none rounded-lg p-4 max-md:py-0 mx-auto max-md:hidden"
            id="type-filter"
          >
            <h3 className="font-medium mb-3 max-md:mx-auto">Type</h3>
            <div className="space-y-2 max-md:flex items-center max-md:gap-3">
              {["TopWear", "BottomWear", "WinterWear"].map(
                (category, index) => (
                  <React.Fragment key={index}>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="sortbycategory"
                        onClick={() => handleSortByType(category)}
                        className="accent-red-600"
                      />
                      {category}
                    </label>
                  </React.Fragment>
                )
              )}
            </div>
          </div>
          </div>

          {/* Collapsible Filter Buttons */}
          <div className="max-md:flex max-md:justify-center max-md:gap-3 md:hidden">
            <button
              className="bg-black text-white py-2 px-4 h-[50px] rounded-lg max-md:block"
              onClick={() => {
                const categoryFilter =
                  document.getElementById("category-filter");
                categoryFilter.classList.toggle("max-md:hidden");

              }}
            >
              Category
            </button>
            <button
              className="bg-black text-white py-2 px-4 h-[50px] rounded-lg max-md:block"
              onClick={() => {
                const typeFilter = document.getElementById("type-filter");
                typeFilter.classList.toggle("max-md:hidden");
              }}
            >
              Type
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 max-xs:gap-1">
            <h1 className="font-bold text-2xl max-xs:text-xl font-mono text-zinc-500">
              ALL <span className="text-black">Collections</span>
            </h1>
            <div className="border w-10 max-xs:hidden"></div>
          </div>

          <div className="border rounded-lg p-2 ">
            <select
              value={selectedSortingOption}
              onChange={handleSortingOptionChange}
              className="outline-none bg-transparent  max-md:min-xs:w-44 max-xs:w-36"
            >
              {SORTING_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="max-md:text-[10px] max-xs:[5px]"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid  grid-cols-2 max-md:min-xs:grid-cols-2 min-xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className="mx-auto"
              >
                <ProductsCard product={product} />
              </Link>
            ))
          ) : (
            <p className="text-black col-span-full text-center">
              No products found
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Collection;
