import React from "react";
import Link from "next/link";
import { useAppContext } from "../context/AppContext";


const HeaderCard = () => {
  const { setTitle, setShowMenu, linkBanner, titleBanner, descriptionBanner } = useAppContext();
  return (
    <div className="bg-gray-200 p-6 mb-10 rounded-lg shadow-md flex align-baseline justify-between items-center h-52 w-full">
      <div>
        <h2 className="text-3xl font-bold text-gray-700">
          {titleBanner}
        </h2>
        <p className="text-gray-600 mt-1">
          {descriptionBanner}
        </p>
      </div>
      {
        linkBanner != "" && (
          <Link href={linkBanner}>
            <button className="bg-purple-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
              Iniciar Asignación
            </button>
          </Link>
        )
      }


    </div>
  );
};

export default HeaderCard;
