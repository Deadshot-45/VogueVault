import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  FaSearchDollar,
  FaExclamationTriangle,
  FaSpinner,
} from "react-icons/fa";

// Extracted SearchResults component for better organization
const SearchResults = React.memo(
  ({
    results,
    searchTerm,
    onResultClick,
    error,
    isSearching,
    lastResultRef,
    hasMore,
  }) => {
    if (!searchTerm) return null;

    return (
      <div className="absolute left-0 right-0 mt-2 bg-white/90 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg z-50">
        <div className="py-2">
          {error ? (
            <div className="px-4 py-4 text-center">
              <FaExclamationTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-red-500 2xl:text-base">{error}</p>
              <p className="text-xs text-gray-400 mt-1 2xl:text-sm">
                Please try again later
              </p>
            </div>
          ) : searchTerm.length < 3 ? (
            <div className="px-4 py-4 text-center">
              <p className="text-sm text-gray-500 2xl:text-base">
                Please enter at least 3 characters to search
              </p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wider 2xl:text-sm">
                Search Results
              </div>
              <div className="max-h-64 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                {results.map((item, index) => (
                  <Link
                    key={item.id || item._id}
                    to={`/product/${item._id}`}
                    onClick={onResultClick}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50/80 transition-colors duration-150"
                    tabIndex="0"
                    ref={index === results.length - 1 ? lastResultRef : null}
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={
                          Array.isArray(item.image) ? item.image[0] : item.image
                        }
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-md 2xl:w-16 2xl:h-16"
                        onError={(e) => {
                          e.target.src =
                            "https://via.placeholder.com/150?text=No+Image";
                        }}
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
                {isSearching && (
                  <div className="flex justify-center py-4">
                    <FaSpinner className="animate-spin h-6 w-6 text-gray-500" />
                  </div>
                )}
                {!hasMore && results.length > 0 && (
                  <div className="text-center py-2 text-sm text-gray-500">
                    No more results
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="px-4 py-8 text-center">
              <FaSearchDollar className="h-12 w-12 text-gray-400 mx-auto mb-3 2xl:h-16 2xl:w-16" />
              <p className="text-sm text-gray-500 2xl:text-base">
                No products found for &quot;{searchTerm}&quot;
              </p>
              <p className="text-xs text-gray-400 mt-1 2xl:text-sm">
                Try adjusting your search terms
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }
);

SearchResults.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      name: PropTypes.string.isRequired,
      image: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string),
      ]).isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  searchTerm: PropTypes.string.isRequired,
  onResultClick: PropTypes.func.isRequired,
  error: PropTypes.string,
  isSearching: PropTypes.bool,
  lastResultRef: PropTypes.func,
  hasMore: PropTypes.bool,
};

SearchResults.displayName = "SearchResults";

export default SearchResults;
