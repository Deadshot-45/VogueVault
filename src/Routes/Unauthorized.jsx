import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Access Denied</h1>
      <p className="text-xl text-gray-600 mb-6">
        Sorry, you don't have permission to access this page.
      </p>
      <div className="space-x-4">
        <Link
          to="/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Go Home
        </Link>
        <Link
          to="/signin"
          className="inline-block px-6 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default Unauthorized;