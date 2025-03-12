import React, { useState, useEffect } from "react";

const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);
  const [error, setError] = useState(null);
  const [errorInfo, setErrorInfo] = useState(null);

  useEffect(() => {
    const errorHandler = (error) => {
      setHasError(true);
      setError(error);
      // Log the error to an error reporting service
      console.error("Error caught by ErrorBoundary:", error);
    };

    const rejectionHandler = (event) => {
      errorHandler(event.reason);
    };

    window.addEventListener("error", errorHandler);
    window.addEventListener("unhandledrejection", rejectionHandler);

    return () => {
      window.removeEventListener("error", errorHandler);
      window.removeEventListener("unhandledrejection", rejectionHandler);
    };
  }, []);

  if (hasError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
          <h1 className="text-2xl font-bold text-red-600 mb-4">
            Something went wrong
          </h1>
          <p className="text-gray-600 mb-4">
            We're sorry, but something went wrong. Please try refreshing the
            page or contact support if the problem persists.
          </p>
          <button
            onClick={() => {
              setHasError(false);
              setError(null);
              setErrorInfo(null);
              window.location.reload();
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Refresh Page
          </button>
          {process.env.NODE_ENV === "development" && error && (
            <div className="mt-4 p-4 bg-gray-100 rounded overflow-auto">
              <pre className="text-sm text-red-800">{error.toString()}</pre>
              {errorInfo && (
                <pre className="text-sm text-gray-600 mt-2">
                  {errorInfo.componentStack}
                </pre>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  try {
    return children;
  } catch (error) {
    setHasError(true);
    setError(error);
    return null;
  }
};

export default ErrorBoundary;
