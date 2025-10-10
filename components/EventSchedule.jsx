"use client";

import { EventContext } from "@/contexts/EventContext";
import { useContext } from "react";

import { BiCalendar, BiMap } from "react-icons/bi";

const EventSchedule = ({ event }) => {
  const { formatDate } = useContext(EventContext);
  const dbDate = event.date;
  const formattedDate = formatDate(dbDate);

  return (
    <div className="flex flex-col  gap-4 items-start justify-between ">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <BiCalendar className="text-2xl text-accent" />
          <div className="capitalize">{formattedDate}</div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-accent ml-2">⦁</div>
          <p>{event.hour}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <BiMap className="text-2xl text-accent" />
        <p className="">{event.location}</p>
      </div>
    </div>
  );
};

export default EventSchedule;
