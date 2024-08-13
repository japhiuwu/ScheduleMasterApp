import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const Header = ({ title, img, initials }) => {
  return (
    <header className="bg-white">
      <div className="mx-auto flex h-12 max-w-screen-xl items-center justify-between px-3 sm:px-3 lg:px-3">
        
        {/* Botón de menú a la izquierda */}
        <button className="block rounded bg-gray-200 p-2.5 text-gray-600 transition hover:text-gray-600/75">
          <span className="sr-only">Toggle menu</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Título centrado */}
        <div className="flex-1 text-center">
          <span className="text-md text-gray-800">{title}</span>
        </div>

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
