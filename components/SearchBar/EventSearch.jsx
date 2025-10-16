import React, { useContext } from "react";
import { Input } from "../ui/input";
import { EventContext } from "@/contexts/EventContext";

import { BiSearch } from "react-icons/bi"

const EventSearch = () => {
  const { searchTerm, setSearchTerm } = useContext(EventContext);

  return (
    <div className="flex items-center gap-[10px] w-full text-white">
      <div className="text-lg text-accent">
        <BiSearch />
      </div>
      <Input
        value={searchTerm}
        type="text"
        placeholder="Nome da aventura"
        onChange={(e)=> setSearchTerm(e.target.value)}
        className="w-full p-1 border-0 text-white placeholder:text-gray focus-visible:ring-0 focus-visible:ring-offset-0"
      />
    </div>
  );
};

export default EventSearch;
