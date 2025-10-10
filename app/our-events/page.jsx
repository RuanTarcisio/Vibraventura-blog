"use client";

import EventCategories from "@/components/Events/EventCategories";
import { RadioGroup } from "@/components/ui/radio-group";
import { EventContext } from "@/contexts/EventContext";
import { useContext } from "react";


const page = () => {
  const { events } = useContext(EventContext);

  return <div className="bg-white">
    <EventCategories />
  </div>;
};

export default page;
