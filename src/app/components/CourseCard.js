import React from 'react';
import Link from 'next/link';

const CourseCard = ({ code, className, subtitle, url, description, onClick, icon, loading }) => {
  return (
    <div className="px-6 rounded-lg flex items-center justify-between mb-6">
       
        <>
          <div className="flex items-center">
            <div className="bg-gray-200 p-4 rounded-lg">
              {icon ? icon : (
                <svg className="w-12 h-12 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 3a1 1 0 011-1h10a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V3zM3 7a1 1 0 011-1h12a1 1 0 011 1v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" />
                </svg>
              )}
            </div>
            <div className="ml-4">
              <h3 className="text-xl font-semibold text-gray-700">{code} <span className="font-light">| {className}</span></h3>
              <p className="text-gray-600">{subtitle}</p>
              <p className="text-gray-400 text-sm">{description}</p>
            </div>
          </div>
          <Link href={url} onClick={onClick}>
            <button className="bg-purple-600 text-white p-4 rounded-full hover:bg-purple-700 transition duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
              </svg>
            </button>
          </Link>
        </>
    </div>
  );
};

export default CourseCard;
