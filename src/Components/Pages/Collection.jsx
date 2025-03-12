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
  const {
    setProductDetails,
    setSearchInput,
    setSearchTerm: setGlobalSearchTerm,
  } = useContext(DataContext);
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
    <div className="flex gap-8">
      <aside className="w-64 flex-shrink-0">
        <h2 className="text-2xl font-semibold mb-6">Filter</h2>

        <div className="space-y-6">
          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  onClick={() => handleSortByCategory("Men")}
                  name="sortbycategory"
                  className="accent-red-600"
                />
                Men
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortbycategory"
                  onClick={() => handleSortByCategory("Women")}
                  className="accent-red-600"
                />
                Women
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortbycategory"
                  onClick={() => handleSortByCategory("Kids")}
                  className="accent-red-600"
                />
                Kids
              </label>
            </div>
          </div>

          <div className="border rounded-lg p-4">
            <h3 className="font-medium mb-3">Type</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortbytype"
                  onClick={() => handleSortByType("TopWear")}
                  className="accent-red-600"
                />
                TopWear
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortbytype"
                  onClick={() => handleSortByType("BottomWear")}
                  className="accent-red-600"
                />
                BottomWear
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="sortbytype"
                  onClick={() => handleSortByType("WinterWear")}
                  className="accent-red-600"
                />
                WinterWear
              </label>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2">
            <h1 className="font-bold text-2xl font-mono text-zinc-500">
              ALL <span className="text-black">Collections</span>
            </h1>
            <div className="border w-10"></div>
          </div>

          <div className="border rounded-lg p-2">
            <select
              value={selectedSortingOption}
              onChange={handleSortingOptionChange}
              className="outline-none bg-transparent"
            >
              {SORTING_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
