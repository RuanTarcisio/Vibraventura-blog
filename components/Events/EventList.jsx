import { EventContext } from "@/contexts/EventContext";
import React, { useContext } from "react";
import Event from "./Event";
import SkeletonGrid from "../SkeletonGrid";
import Link from "next/link";

const EventList = () => {
  const { filteredEvents, isLoading, error } = useContext(EventContext);
  if (error) return <p>Error: {error}</p>;

  if (filteredEvents.length === 0 && !isLoading) {
    return (
      <div>
        <p>No events available</p>
      </div>
    );
  }

  if (isLoading) {
    return <SkeletonGrid itemCount={4} />;
  } else {
    return (
      <div>
        <h4 className="h4 mb-6">{filteredEvents.length} results found</h4>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-[30px] mb-32">
          {filteredEvents.map((event, index) => {
            return (
              <div key={index}>
                <Link href={`/event/${event.id}`}>
                  <Event event={event} />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return <div>Event List</div>;
};

export default EventList;
