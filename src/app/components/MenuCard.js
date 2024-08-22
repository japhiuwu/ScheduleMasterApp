import React from 'react';
import Link from 'next/link';
import Skeleton from '../components/Skeleton'

const MenuCard = ({ icon, name, url, description, onClick, loading = false }) => {
  return (
    <div className="relative mx-4 my-2">
      {loading ? (
        <div className="relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-48 animate-pulse">
          <div className="relative grid h-24 mx-4 mt-4 overflow-hidden text-gray-700 bg-gray-300 bg-clip-border rounded-xl place-items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-12 h-12 text-gray-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z">
              </path>
            </svg>
          </div>
          <div className="p-6">
            <div className="block w-32 h-3 mb-4 bg-gray-300 rounded-full"></div>
            <div className="block w-full h-2 mb-2.5 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      ) : (
        <Link href={url} onClick={onClick}>
          <div className="flex flex-col mt-6 hover:bg-blue-50 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-48">
            <div className="relative grid h-32 mx-4 mt-4 overflow-hidden text-gray-700 bg-gray-300 bg-clip-border rounded-xl place-items-center">
              {icon ? icon : (
                <svg className="w-12 h-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V3zM3 7a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
                </svg>
              )}
            </div>
            <div className="p-6">
              <div className="block w-full mb-1 text-xl text-center font-semibold">
                {name}
              </div>
              <div className="block w-full mb-2 text-sm text-center text-gray-400 font-light">
                {description}
              </div>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
};

export default MenuCard;
