"use client";

import { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";

// components
import Hero from "@/components/Hero";
import EventList from "@/components/Events/EventList";
import UpcomingEvents from "@/components/UpcomingEvents";
import RecommendedEvents from "@/components/RecommendedEvents";
import DownloadApp from "@/components/DownloadApp";

const Home = () => {
  const { showEventList, handleClearSearch } = useContext(EventContext);

  return (
    <div>
      <Hero />
      <div className="flex flex-col justify-center items-center"></div>
      HomePage
    </div>
  );
};

export default Home;
