import { useEffect, useRef, useState, useCallback } from "react";
import { useSearchProducts } from "./UseSearchProducts";

// Custom hook for handling search logic
const useSearch = (initialSearchTerm = "") => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const debounceTimeout = useRef(null);
  const observer = useRef(null);
  const lastResultRef = useCallback(node => {
    if (isSearching) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isSearching]);

  const {
    data,
    isLoading,
    error: searchError,
    hasMore
  } = useSearchProducts(searchTerm.length >= 3 ? searchTerm : "", page);

  // Immediate search term update for UI responsiveness
  const updateSearchTerm = useCallback((value) => {
    setSearchTerm(value);
    setPage(1);
    if (value.length < 3) {
      setError(null);
      setSearchResults([]);
    }
  }, []);

  // Debounced search term update for API calls
  const debouncedSetSearchTerm = useCallback((value) => {
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      if (value.length >= 3) {
        setSearchTerm(value);
        setPage(1);
      }
    }, 300);
  }, []);

  useEffect(() => {
    setIsSearching(isLoading);
    if (data) {
      setSearchResults(prevResults => page === 1 ? data : [...prevResults, ...data]);
      setError(null);
    }
    if (searchError) {
      setError(searchError);
      if (page === 1) {
        setSearchResults([]);
      }
    }
  }, [data, isLoading, searchError, page]);

  // Save recent searches to localStorage
  useEffect(() => {
    if (searchTerm.length >= 3 && !isSearching && searchResults.length > 0 && !error) {
      try {
        const recentSearches = JSON.parse(
          localStorage.getItem("recentSearches") || "[]"
        );
        if (!recentSearches.includes(searchTerm)) {
          const updatedSearches = [searchTerm, ...recentSearches].slice(0, 5);
          localStorage.setItem(
            "recentSearches",
            JSON.stringify(updatedSearches)
          );
        }
      } catch (error) {
        console.error("Error saving recent searches:", error);
      }
    }
  }, [searchTerm, searchResults, isSearching, error]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  return {
    searchTerm,
    setSearchTerm: updateSearchTerm,
    debouncedSetSearchTerm,
    searchResults,
    isSearching,
    error,
    lastResultRef,
    hasMore,
    clearSearch: () => {
      setSearchTerm("");
      setSearchResults([]);
      setError(null);
      setPage(1);
    },
  };
};

// Custom hook for click outside detection
const useClickOutside = (handler) => {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        !event.target.closest("#btn-disable")
      ) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handler]);

  return ref;
};

export { useSearch, useClickOutside };
