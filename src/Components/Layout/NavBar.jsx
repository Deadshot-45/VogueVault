import { useEffect, useState, useCallback, useRef } from "react";
import { NavigationLinks } from "./NavigationLinks";
import { ActionButtons } from "./ActionButtons";
import { Link, useLocation } from "react-router-dom";
import {
  FaSearch,
  FaTimes,
  FaMicrophone,
  FaSearchDollar,
} from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { CSSTransition } from "react-transition-group";
import { useClickOutside, useSearch } from "../../Hooks/UseSearch";
import SearchResults from "./SerachResults";

const NavBar = () => {
  const [searchInput, setSearchInput] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const searchRef = useRef(null);
  const searchContainerRef = useRef(null);
  const menuRef = useRef(null);

  // Using custom hooks
  const {
    searchTerm,
    setSearchTerm,
    debouncedSetSearchTerm,
    searchResults,
    isSearching,
    error,
    clearSearch,
  } = useSearch();

  // Handle click outside to close menu
  useClickOutside(menuRef, () => setIsMenuOpen(false));

  // Check if current route is auth or cart page
  const hideSearchPaths = ["/signin", "/signup", "/cart"];
  const shouldHideSearch = hideSearchPaths.some(
    (path) => location.pathname === path
  );

  // Handle click outside search container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target) &&
        !event.target.closest("#search-button") // Exclude the search toggle button
      ) {
        if (searchInput) {
          setSearchInput(false);
        }
      }
    };

    if (searchInput) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchInput]);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Reset search state when route changes
  useEffect(() => {
    setSearchInput(false);
    clearSearch();
    setIsMenuOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Focus search input when opened
  useEffect(() => {
    if (searchInput && searchRef.current) {
      searchRef.current.focus();
    }
  }, [searchInput]);

  // Handle escape key press to close search/menu
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        if (searchInput) {
          setSearchInput(false);
          clearSearch();
        }
        if (isMenuOpen) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener("keydown", handleEscKey);
    return () => document.removeEventListener("keydown", handleEscKey);
  }, [searchInput, isMenuOpen, clearSearch]);

  const toggleSearch = useCallback(() => {
    if (shouldHideSearch) return;
    setSearchInput(!searchInput);
    if (searchInput) {
      clearSearch();
    }
  }, [searchInput, shouldHideSearch, clearSearch]);

  const handleSearch = useCallback(
    (e) => {
      const term = e.target.value;
      setSearchTerm(term); // Immediate update for UI responsiveness
      debouncedSetSearchTerm(term); // Debounced update for API calls
    },
    [setSearchTerm, debouncedSetSearchTerm]
  );

  // Handle voice search
  const startVoiceSearch = useCallback(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      alert("Voice search is not supported in your browser");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
    };

    recognition.start();
  }, [setSearchTerm]);

  return (
    <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-999 sm:px-4">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-0 lg:max-2xl:px-8 2xl:px-12">
        <div className="flex items-center justify-between h-16 2xl:h-20">
          {/* Mobile Menu Button */}
          <button
            className="block sm:hidden text-xl mr-4"
            id="btn-disable"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open mobile menu"
            aria-expanded={isMenuOpen}
          >
            <MdOutlineMenu />
          </button>

          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img
              src={"http://localhost:5500/VogueVault.png"}
              alt="VogueVault logo"
              className="h-8 w-auto mix-blend-multiply 2xl:h-10"
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="ml-4 max-sm:hidden">
            <NavigationLinks onLinkClick={() => {}} isMobile={false} />
          </div>

          {/* Action Buttons */}
          <div className="flex max-md:w-full max-md:justify-end">
            <ActionButtons
              ShowSearch={toggleSearch}
              id="search-button" // Add an ID for click outside detection
            />
          </div>
        </div>

        {/* Mobile Menu */}
        <CSSTransition
          in={isMenuOpen}
          timeout={300}
          classNames="menu"
          unmountOnExit
          nodeRef={menuRef}
        >
          <div
            ref={menuRef}
            className="fixed h-screen w-[200px] menu-animate left-0 top-0 bg-gray-700/90 flex-col z-50"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <button
              className="absolute top-4 right-4 text-white"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Close mobile menu"
            >
              <FaTimes className="h-6 w-6" />
            </button>
            <div className="pt-16 px-6">
              <NavigationLinks
                onLinkClick={() => setIsMenuOpen(false)}
                isMobile={true}
              />
            </div>
          </div>
        </CSSTransition>

        {/* Search Bar */}
        {searchInput && !shouldHideSearch && (
          <div className="py-4 border-t border-gray-100">
            <div
              ref={searchContainerRef}
              className="relative max-w-3xl mx-auto"
            >
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
                  aria-label="Search products"
                  className="block w-full pl-12 pr-12 py-3 2xl:py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-sm 2xl:text-base bg-white/50 backdrop-blur-sm"
                />
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center gap-3">
                  {isSearching && (
                    <div
                      className="w-4 h-4 border-2 border-t-2 border-gray-500 rounded-full animate-spin"
                      aria-hidden="true"
                    ></div>
                  )}
                  {searchTerm && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <FaTimes className="h-4 w-4 2xl:h-5 2xl:w-5" />
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={startVoiceSearch}
                    className="text-gray-400 hover:text-gray-600 ml-2"
                    aria-label="Voice search"
                  >
                    <FaMicrophone className="h-4 w-4 2xl:h-5 2xl:w-5" />
                  </button>
                </div>
              </div>

              {/* Search Results */}
              {error ? (
                <div className="px-4 py-8 text-center">
                  <FaSearchDollar className="h-12 w-12 text-gray-400 mx-auto mb-3 2xl:h-16 2xl:w-16" />
                  <p className="text-sm text-gray-500 2xl:text-base">
                    No products found for &quot;{searchTerm}&quot;
                  </p>
                  <p className="text-xs text-gray-400 mt-1 2xl:text-sm">
                    Try adjusting your search terms
                  </p>
                </div>
              ) : (
                <SearchResults
                  results={searchResults}
                  searchTerm={searchTerm}
                  onResultClick={() => setSearchInput(false)}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
