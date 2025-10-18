"use client";

import React, { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";
import { BiSearch, BiRightArrowAlt } from "react-icons/bi";

const Searchbar = () => {
  const { searchTerm, setSearchTerm, handleSubmit } = useContext(EventContext);

  return (
    <div
      className="
        w-full bg-white/10 backdrop-blur-md border border-white/10
        rounded-full shadow-lg flex items-center
        px-3 sm:px-4 py-[6px] sm:py-2
        transition-all duration-300
      "
    >
      {/* Ícone de busca */}
      <BiSearch className="text-lg sm:text-xl text-accent flex-shrink-0 mr-2" />

      {/* Campo de texto */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Buscar aventuras..."
        className="
          bg-transparent w-full text-sm sm:text-base text-white 
          placeholder:text-gray-300 border-0 outline-none focus:ring-0
        "
      />

      {/* Botão de envio */}
      <button
        onClick={handleSubmit}
        className="
          flex items-center justify-center
          bg-accent hover:bg-accent-hover 
          text-white rounded-full
          ml-2 sm:ml-3 
          p-2 sm:p-2.5
          focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-black
          transition-all duration-300
        "
        aria-label="Buscar aventuras"
      >
        <BiRightArrowAlt className="text-lg sm:text-xl" />
      </button>
    </div>
  );
};

export default Searchbar;
