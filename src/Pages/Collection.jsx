import { useState, useMemo, useContext, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

// Context
import { DataContext } from "../Context/DataContext";

// Hooks
import { useGetApiProducts } from "../Hooks/UseGetApiProducts";

// Components
import ProductsCard from "../Components/ProductPages/ProductsCard";

const SORTING_OPTIONS = [
  { value: "Relavent", label: "Sort By : Relavent" },
  { value: "Low-to-high", label: "Sort By : Low-to-high" },
  { value: "High-to-low", label: "Sort By : High-to-low" },
];

const Collection = () => {
  const { products, setProducts } = useContext(DataContext);
  const { setSearchInput, setSearchTerm: setGlobalSearchTerm } =
    useContext(DataContext);
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [selectedSortingOption, setSelectedSortingOption] = useState(
    SORTING_OPTIONS[0].value
  );
  const [page, setPage] = useState(1);
  const { data, isLoading, error, totalPages } = useGetApiProducts(page);
  const location = useLocation();
  // const observer = useRef(null);
  // const lastProductRef = useCallback(
  //   (node) => {
  //     if (isLoading || isLoadingMore) return;
  //     if (observer.current) observer.current.disconnect();
  //     observer.current = new IntersectionObserver((entries) => {
  //       if (entries[0].isIntersecting && data && data.length > 0) {
  //         setPage((prevPage) => prevPage + 1);
  //       }
  //     });
  //     if (node) observer.current.observe(node);
  //   },
  //   [isLoading, isLoadingMore, data]
  // );

  // Initialize products when data is available
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data, setProducts]);

  // Reset search term when navigating away
  useEffect(() => {
    return () => {
      setGlobalSearchTerm("");
      setSearchInput(false);
    };
  }, [location.pathname, setGlobalSearchTerm, setSearchInput]);

  let filteredProducts = useMemo(() => {
    let filtered = products || [];

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

          // Then by newness using date field
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          if (dateA > dateB) return -1;
          if (dateA < dateB) return 1;

          // Finally by rating
          return (b.rating || 0) - (a.rating || 0);
        });
        break;
      default:
        break;
    }

    return filtered;
  }, [category, type, selectedSortingOption, products]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleCategory = (e) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleType = (e) => {
    setType(e.target.value);
    setPage(1);
  };

  const handleSortingOptionChange = (event) => {
    setSelectedSortingOption(event.target.value);
    setPage(1);
  };

  if (isLoading && page === 1) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="responsive-container py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-64 space-y-6">
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-semibold">Filter</h2>
            <div className="flex flex-col space-y-4">
              {/* Category Select */}
              <div className="relative">
                <select
                  onChange={handleCategory}
                  value={category}
                  className="block w-full appearance-none border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700 py-2 px-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black/40 focus:border-black/60 text-gray-700 dark:text-gray-200 text-responsive transition-colors duration-200 hover:border-black"
                >
                  <option value="" disabled>
                    (select category)
                  </option>
                  {["Men", "Women", "Kids"].map((category, index) => (
                    <option
                      key={index}
                      value={category}
                      className="text-gray-700 dark:text-gray-200"
                    >
                      {category}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
              {/* Type Select */}
              <div className="relative">
                <select
                  onChange={handleType}
                  value={type}
                  className="block w-full appearance-none border border-gray-300 bg-white dark:bg-gray-900 dark:border-gray-700 py-2 px-4 pr-10 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-black/40 focus:border-black/60 text-gray-700 dark:text-gray-200 text-responsive transition-colors duration-200 hover:border-black"
                >
                  <option value="" disabled>
                    (select type)
                  </option>
                  {["TopWear", "BottomWear", "WinterWear"].map(
                    (category, index) => (
                      <option
                        key={index}
                        value={category}
                        className="text-gray-700 dark:text-gray-200"
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-zinc-500">
                ALL <span className="text-black">Collections</span>
              </h1>
              <div className="hidden sm:block border w-10"></div>
            </div>

            <div className="border rounded-lg p-2">
              <select
                value={selectedSortingOption}
                onChange={handleSortingOptionChange}
                className="outline-none bg-transparent text-responsive"
              >
                {SORTING_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="responsive-grid">
            {isLoading && page === 1 ? (
              <div className="col-span-full flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
              </div>
            ) : error ? (
              <p className="col-span-full text-red-500 text-center">{error}</p>
            ) : filteredProducts.length > 0 ? (
              <>
                {filteredProducts.map((product) => (
                  <Link
                    key={product._id}
                    to={`/product/${product._id}`}
                    className="block"
                  >
                    <ProductsCard product={product} />
                  </Link>
                ))}
              </>
            ) : (
              <p className="col-span-full text-black text-center">
                No products found
              </p>
            )}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              <button
                onClick={() => handlePageChange(1)}
                disabled={page === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(page - 1)}
                disabled={page === 1}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (pageNum) => (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`px-4 py-2 border rounded-md ${
                      page === pageNum ? "bg-black text-white" : ""
                    }`}
                  >
                    {pageNum}
                  </button>
                )
              )}

              <button
                onClick={() => handlePageChange(page + 1)}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Next
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={page === totalPages}
                className="px-4 py-2 border rounded-md disabled:opacity-50"
              >
                Last
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Collection;
