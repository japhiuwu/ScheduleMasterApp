import React from "react";

const HeaderCard = ({ term, year, startDate, endDate, background }) => {
  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-md flex align-baseline justify-between items-center m-6 h-52">
      <div>
        <h2 className="text-3xl font-bold text-gray-700">
          {term} {year}
        </h2>
        <p className="text-gray-600">
          {startDate} - {endDate}
        </p>
      </div>
      <button className="bg-purple-600 text-white text-sm py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300">
        Iniciar Asignación
      </button>
    </div>
  );
};

export default HeaderCard;
