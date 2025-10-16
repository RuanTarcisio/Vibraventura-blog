"use client";

import React, { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";
import EventSearch from "./EventSearch";
import EventLocation from "./EventLocation";
import EventDate from "./EventDate";
import EventType from "./EventType";
import { BiRightArrowAlt } from "react-icons/bi";

const Searchbar = () => {
  const { handleSubmit } = useContext(EventContext);

  return (
    <div
      className="
        w-full max-w-3xl mx-auto
        bg-white/5 backdrop-blur-xl rounded-2xl lg:rounded-full 
        border border-white/10
        flex flex-col sm:flex-row items-stretch sm:items-center gap-3 p-4 sm:p-3 lg:p-2
        transition-all duration-300 shadow-lg
      "
    >
      {/* Campo principal */}
      <div className="flex-1 min-w-0">
        <EventSearch />
      </div>

      {/* Filtros responsivos */}
      <div
        className="
          flex flex-col sm:flex-row items-stretch sm:items-center 
          gap-3 sm:gap-2 lg:gap-1 flex-wrap justify-center sm:justify-end
        "
      >
        {/* Filtros secundários - ocultos em mobile */}
        <div className="hidden sm:flex items-center gap-2 lg:gap-1 flex-wrap">
          <div className="hidden lg:block h-6 border-r border-white/10"></div>
          <div className="min-w-[110px] lg:min-w-[100px]">
            <EventLocation />
          </div>
          <div className="hidden lg:block h-6 border-r border-white/10"></div>
          <div className="min-w-[110px] lg:min-w-[100px]">
            <EventDate />
          </div>
          <div className="hidden lg:block h-6 border-r border-white/10"></div>
          <div className="min-w-[110px] lg:min-w-[100px]">
            <EventType />
          </div>
        </div>

        {/* Botão de busca */}
        <button
          onClick={handleSubmit}
          className="
            w-full sm:w-12 h-12 lg:h-11 
            rounded-xl lg:rounded-full 
            bg-accent hover:bg-accent-hover 
            transition-all flex items-center justify-center flex-shrink-0
            shadow-md hover:shadow-lg
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-gray-900
          "
          aria-label="Buscar eventos"
        >
          <BiRightArrowAlt className="text-xl lg:text-2xl" />
        </button>
      </div>

      {/* Versão mobile ultra compacta */}
      <div className="sm:hidden flex flex-col gap-2 mt-2">
        <div className="text-xs text-white/60 text-center">
          Toque nos filtros para mais opções
        </div>
      </div>
    </div>
  );
};

export default Searchbar;
