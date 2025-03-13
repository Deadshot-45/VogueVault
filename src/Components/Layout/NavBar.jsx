import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from "react";
import { assets, products } from "../../assets/frontend_assets/assets";
import { NavigationLinks } from "./NavigationLinks";
import { ActionButtons } from "./ActionButtons";
import { Link, useLocation } from "react-router-dom";
import { FaSearch, FaTimes, FaSearchDollar } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";

const NavBar = () => {
  const [searchInput, setSearchInput] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const location = useLocation();
  const searchRef = useRef(null);
  // Check if current route is auth or cart page
  const hideSearchPaths = ["/signin", "/signup", "/cart"];
  const shouldHideSearch = hideSearchPaths.some(
    (path) => location.pathname === path
  );

  // Reset search state when route changes
  useEffect(() => {
    setSearchInput(false);
    setSearchTerm("");
    setSearchResults([]);
  }, [location.pathname]);

  // Reset search state when navigating to these pages
  useEffect(() => {
    if (shouldHideSearch && searchInput) {
      setSearchInput(false);
      setSearchTerm("");
      setSearchResults([]);
    }
    document.getElementById("show-navbar").classList.remove("max-[650px]:flex");
  }, [location.pathname, shouldHideSearch, searchInput]);

  // Focus search input when opened
  useEffect(() => {
    if (searchInput && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchInput]);

  const ShowSearch = useCallback(() => {
    if (shouldHideSearch) return;
    setSearchInput(!searchInput);
    if (searchInput) {
      setSearchTerm("");
      setSearchResults([]);
    }
  }, [searchInput, shouldHideSearch]);

  const handleSearch = useCallback((e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term.length >= 3) {
      const filteredProducts = products
        .filter((product) =>
          product.name.toLowerCase().includes(term.toLowerCase())
        )
        .slice(0, 5);
      setSearchResults(filteredProducts);
    } else {
      setSearchResults([]);
    }
  }, []);

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50 sm:px-4">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-0 lg:max-2xl:px-8 2xl:px-12">
        <div className="flex items-center justify-between h-16 2xl:h-20">
          <button className="min-[650px]:hidden mr-4" id="btn-disable"
          onClick={()=>{
            document.getElementById("show-navbar").classList.add("max-[650px]:flex");
            document.getElementById("show-navbar").setAttribute("disabled", true);
          }}>
            <MdOutlineMenu />
          </button>
          <div id="show-navbar" className="hidden h-screen w-[200px] left-0 absolute top-0 bg-gray-700/90  flex-col">
            {/* Navigation Links */}
            <NavigationLinks />
          </div>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={assets.VogueVault}
              alt="logo"
              className="h-8 w-auto mix-blend-multiply 2xl:h-10"
            />
          </Link>

          {/* Navigation Links */}
          <div className="max-[650px]:hidden ml-4">
          <NavigationLinks />
          </div>

          {/* Action Buttons */}
          <div className="flex max-md:w-full max-md:justify-end ">
            <ActionButtons ShowSearch={ShowSearch} />
          </div>
        </div>

        {/* Search Bar */}
        {searchInput && !shouldHideSearch && (
          <div className="py-4 border-t border-gray-100">
            <div className="relative max-w-3xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-gray-400 2xl:h-6 2xl:w-6" />
                </div>
                <input
                  ref={searchRef}
                  type="search"
                  name="search"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="block w-full pl-12 pr-12 py-3 2xl:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm 2xl:text-base bg-white/50 backdrop-blur-sm"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchTerm("");
                      setSearchResults([]);
                    }}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    <FaTimes className="h-4 w-4 2xl:h-5 2xl:w-5" />
                  </button>
                )}
              </div>

              {/* Search Results */}
              {searchTerm.length >= 3 && (
                <div className="absolute left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="py-2">
                    {searchResults.length > 0 ? (
                      <>
                        <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider 2xl:text-sm">
                          Search Results
                        </div>
                        {searchResults.map((item) => (
                          <Link
                            key={item.id}
                            to={`/product/${item.id}`}
                            className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/80 transition-colors duration-150"
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={item.image[0]}
                                alt={item.name}
                                className="w-12 h-12 object-cover rounded-md 2xl:w-16 2xl:h-16"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate 2xl:text-base">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500 2xl:text-base">
                                ${item.price}
                              </p>
                            </div>
                          </Link>
                        ))}
                      </>
                    ) : (
                      <div className="px-4 py-8 text-center">
                        <FaSearchDollar className="h-12 w-12 text-gray-400 mx-auto mb-3 2xl:h-16 2xl:w-16" />
                        <p className="text-sm text-gray-500 2xl:text-base">
                          No products found for "{searchTerm}"
                        </p>
                        <p className="text-xs text-gray-400 mt-1 2xl:text-sm">
                          Try adjusting your search terms
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
