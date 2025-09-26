import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200"></div>
        <div className="w-12 h-12 rounded-full border-4 border-blue-500 border-t-transparent absolute top-0 left-0 animate-spin"></div>
      </div>
      <span className="ml-3 text-gray-600 font-medium">Loading...</span>
    </div>
  );
};

export default LoadingSpinner;