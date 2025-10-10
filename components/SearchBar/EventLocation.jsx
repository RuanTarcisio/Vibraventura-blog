import { EventContext } from "@/contexts/EventContext";
import React, { useContext } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { BiMap } from "react-icons/bi";

const EventLocation = () => {
  const { events, selectedLocation, setSelectedLocation } =
    useContext(EventContext);

  // generate a list of unique locations from future events
  const uniqueLocation = [
    "All locations", //default locations
    ...new Set( // set to remove duplicate locations
      events
        .filter((event) => {
          const eventDate = new Date(event.date); // convert event date to Date object
          const currentDate = new Date();

          // include events that occur after the current date
          if (eventDate > currentDate) return true;

          //include events happening today but only of the time has not yet passed
          if (eventDate.toDateString() === currentDate.toDateString()) {
            const eventTime = eventDate.getTime();
            const currentTime = currentDate.getTime();
            return eventTime > currentTime; // include event if it's sill upcoming today
          }

          //exclude past events
          return false;
        })
        .map((event) => event.location)
    ),
  ];

  return (
    <div className="flex items-center gap-[10px] w-full xl:w-[190px] select-none">
      {/* icon */}
      <div className="text-lg text-accent">
        <BiMap />
      </div>
      <Select
        value={selectedLocation}
        onValueChange={(value) => setSelectedLocation(value)}
      >
        <SelectTrigger className="bg-transparent border-none focus:ring-0 focus:ring-offset-0 text-left p-0">
          <SelectValue placeholder="Event Location" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Location </SelectLabel>
            {uniqueLocation.map((location, index) => {
              return (
                <SelectItem
                  value={location == "All location" ? null : location}
                  key={index}
                >
                  {location}
                </SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default EventLocation;
