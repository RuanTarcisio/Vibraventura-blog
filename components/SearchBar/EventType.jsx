import { BiLayer } from "react-icons/bi";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";

const EventType = () => {
  const { events, selectedType, setSelectedType } = useContext(EventContext);

  const uniqueTypes = [
    "Todos os tipos",
    ...new Set(events.map((event) => event.type)),
  ];

  return (
    <div className="flex items-center gap-[10px] w-full xl:w-[190px] select-none">
      {/* icon */}
      <div className="text-lg text-accent">
        <BiLayer />
      </div>
      <Select
        value={selectedType}
        onValueChange={(value) => setSelectedType(value)}
      >
        <SelectTrigger className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 text-left p-1 capitalize">
          <SelectValue placeholder="Tipo de aventura" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Tipo </SelectLabel>
            {uniqueTypes.map((type, index) => {
              return (
                <SelectItem
                  value={type == "Todos os tipos" ? null : type}
                  key={index}
                  className="capitalize"
                >
                  {type}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventType;