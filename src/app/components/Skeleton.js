import React from 'react';

const Skeleton = ({}) => {
  return (
    <div className="px-6 mt-4 rounded-lg flex items-center">
    <div className="bg-gray-200 p-4 rounded-lg animate-pulse">
      <svg className="w-12 h-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M4 3a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V3zM3 7a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
      </svg>
    </div>
    <div className="ml-4">
      <div className="w-48 h-4 bg-gray-300 rounded-full mb-2 animate-pulse"></div>
      <div className="w-32 h-3 bg-gray-300 rounded-full mb-2 animate-pulse"></div>
      <div className="w-64 h-2 bg-gray-300 rounded-full animate-pulse"></div>
    </div>
  </div>
  );
};

export default Skeleton;
