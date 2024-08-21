import React from 'react';
import Link from 'next/link';

const MenuCard = ({icon, name, url, description}) => {
  return (
    <Link href={url}>
      <button className="p-6 w-48 justify-center rounded-lg h-48 flex bg-gray-200 items-center mx-4 my-2 hover:bg-blue-200">
            <div className="flex flex-col justify-center items-center">
                <div className="mb-2 rounded-lg">
                <svg className="w-12 h-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 3a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V3zM3 7a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
                </svg>
                </div>
                <div className="mt-3">
                <h3 className="text-xl mb-1 font-semibold text-gray-700">{name}</h3>
                <p className="text-gray-400 text-xs">{description}</p>
                </div>
            </div>
      </button>
    </Link>
  );
};

export default MenuCard;