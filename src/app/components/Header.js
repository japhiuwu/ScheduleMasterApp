'use client';
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import GetTerms from "../services/term"

const Header = ({ title, img, initials }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState("");

  useEffect(() => {
    // Retrieve the stored term from local storage
    const storedTerm = localStorage.getItem('selectedTerm');
    if (storedTerm) {
      setSelectedTerm(storedTerm);
    }

    GetTerms().then((data) => {
      setData(data);
      setLoading(false);
    });
  }, []);

  const handleTermChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedTerm(selectedValue);
    window.location.reload();

    // Store the selected term in local storage
    localStorage.setItem('selectedTerm', selectedValue);
  };

  return (
    <header className="bg-white mb-2">
      <div className="mx-auto flex h-12 max-w-screen-xl items-center justify-between pr-3 pl-16">

        {/* Título centrado */}
        <div className="ml-6">
          <span className="text-md text-gray-800">{title}</span>
        </div>
        
        <form className="max-w-sm mx-auto">
          <select
            id="countries"
            className="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedTerm} // Set the value from state
            onChange={handleTermChange} // Handle change events
          >
            <option value="">Choose a term</option>
            {data.map((term) => (
              <option key={term.Cod_Periodo} value={term.Cod_Periodo}>
                {term.Cod_Periodo} {term.Orden === 1 ? "⭐" : term.Orden === 2 ? "🔜" : "🔙"}
              </option>
            ))}
          </select>
        </form>

        {/* IM a la derecha */}
        <div className="inline-flex items-center justify-center">
          <Avatar>
            <AvatarImage src={img} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
