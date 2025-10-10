"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale"; // Already imported, good!
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar"; // Your custom Calendar component
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"; // Assuming PopoverTrigger is correctly imported

import { BiCalendar, BiChevronDown } from "react-icons/bi";
import { useContext, useState } from "react"; // Import useState
import { EventContext } from "@/contexts/EventContext";

const EventDate = () => {
  const { selectedDate, setSelectedDate } = useContext(EventContext);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false); // New state to control popover

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setIsPopoverOpen(false); // Close the popover when a date is selected
  };

  return (
    <div className="flex w-full items-center gap-[10px] xl:w-[190px]">
      <div className="text-lg text-accent">
        <BiCalendar />
      </div>
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}> {/* Control popover state */}
        <PopoverTrigger asChild>
          <Button className="w-full justify-start p-0 bg-transparent hover:bg-transparent">
            {selectedDate ? (
              format(selectedDate, "PPP", { locale: ptBR }) // Added locale here for proper formatting
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 bg-secondary border-0 text-white">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={handleDateChange} // This calls handleDateChange
            initialFocus
          />
        </PopoverContent>
        <div className="text-[26px]">
          <BiChevronDown />
        </div>
      </Popover>
    </div>
  );
};

export default EventDate;