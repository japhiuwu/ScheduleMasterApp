'use client';
import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useAppContext } from "../context/AppContext";
import GetTerms from "../services/term"

const Header = ({ title, img, initials }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTerm, setSelectedTerm] = useState("");
  const { toastMessage, profile } = useAppContext();

  useEffect(() => {
    // Retrieve the stored term from local storage
    const storedTerm = localStorage.getItem('selectedTerm');
    if (storedTerm) {
      setSelectedTerm(storedTerm);
    }

    GetTerms().then((response) => {
      if(response.status != 200){
        toastMessage("warnign", `${response.error}`);
      } else{
        setData(response.data);
      }
      console.log(response);
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
    <header className="bg-white mb-2 mx-2 pl-16">
      <div className="mx-auto flex h-12 max-w-screen-xl items-center justify-between">
        
        {/* Título centrado */}
        <div className="flex-1 flex">
          <span className="text-md text-gray-800">{title}</span>
        </div>
        
        {/* Selector de términos centrado */}
        <form className="w-40 justify-center">
          <select
            id="terms"
            className="bg-gray-200 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full max-w-sm p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
        <div className="flex-1 flex justify-end">
          <Avatar>
            <AvatarImage src={img ? img : profile} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
};

export default Header;
