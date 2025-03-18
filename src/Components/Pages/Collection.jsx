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

  const handleCategory = (e) => {
    const category = e.target.value;
    category && setCategory(e.target.value);
  };

  const handleSortByType = (value) => {
    setType(value);
  };

  const handleSortingOptionChange = (event) => {
    setSelectedSortingOption(event.target.value);
  };

  return (
    <div className="flex gap-8 max-md:flex-col fade-in">
      <aside className="w-64 relative max-lg:w-40 max-md:w-full max-md:flex max-md:justify-between flex-shrink-0">
        <div className="max-xs:flex justify-between max-md:items-center w-full">
          <h2 className="text-2xl font-semibold mb-6 max-md:mb-0 max-xs:mr-6">
            Filter
          </h2>
          <div className="flex gap-2">
            <select
              onClick={handleCategory}
              className="border border-zinc-700 outline-none bg-transparent py-1 rounded-sm hidden max-xs:block max-md:text-[10px] max-xs:[8px]"
            >
              <option value="">(select category)</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
            <select
              onClick={handleCategory}
              className="border border-zinc-700 outline-none bg-transparent py-1 rounded-sm hidden max-xs:block max-md:text-[10px] max-xs:[8px]"
            >
              <option value="">(select type)</option>
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>
        </div>

        {/* SubCategory/ Type Filter */}
        <div
          className="border rounded-lg p-4 max-md:py-0 mx-auto max-md:hidden mb-3"
          id="type-filter"
        >
          <h3 className="font-medium mb-3">Type</h3>
          <div className="space-y-2 max-md:flex flex-wrap items-center space-x-2">
            {["TopWear", "BottomWear", "WinterWear"].map((category, index) => (
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
            ))}
          </div>
        </div>
        {/* Category Filter */}
        <div
          className="border max-md:border-none rounded-lg p-4 max-xs:hidden max-sm:py-0 mx-auto max-md:hidden"
          id="category-filter"
        >
          <h3 className="font-medium mb-3 max-xs:mb-0">Category</h3>
          <div className="space-y-2 max-md:flex flex-wrap items-center space-x-2">
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
      </aside>

      <main className="flex-1">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-2 max-xs:gap-1">
            <h1 className="font-bold text-2xl max-xs:text-xl font-mono text-zinc-500">
              ALL <span className="text-black">Collections</span>
            </h1>
            <div className="border w-10 max-xs:hidden"></div>
          </div>

          <div className="border rounded-lg p-2 max-xs:p-1 ">
            <select
              value={selectedSortingOption}
              onChange={handleSortingOptionChange}
              className="outline-none bg-transparent max-md:min-xs:w-44 max-xs:w-28  max-md:text-[10px] max-xs:[8px]"
            >
              {SORTING_OPTIONS.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  className="max-xs:px-2"
                >
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid  grid-cols-2 max-md:min-xs:grid-cols-2 min-xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product, index) => (
              <Link
                key={product.id}
                to={`/product/${product.id}`}
                className={`mx-auto card-mount delay-${index % 5}`}
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
