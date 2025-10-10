"use client";

import { EventContext } from "@/contexts/EventContext";
import { useContext, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Slider } from "../ui/slider";
import { BiRightArrowAlt } from "react-icons/bi";
import Event from "./Event";
import Link from "next/link";

const EventCategories = () => {
  const {
    events,
    selectedType,
    setSelectedType,
    handleSubmit,
    filteredEvents,
  } = useContext(EventContext);
  const [price, setPrice] = useState(100);
  // const [filteredEvents, setFilteredEvents] = useState([]);
  console.log(events);
  const uniqueTypes = [
    "All type",
    ...new Set(events.map((event) => event.type)),
  ];

  return (
    <section className="min-h-screen py-20 text-black">
      <div className="container mx-auto">
        <div className="flex flex-col xl:grid xl:grid-cols-[300px_1fr] xl:gap-20">
          {/* sidebar */}
          <aside className="w-full xl:w-[300px] mb-8 xl:mb-0">
            <div className="bg-white rounded-lg p-6 shadow-md">
              <RadioGroup
                defaultValue="all"
                className="flex flex-col gap-6 mb-12 text-black"
              >
                {uniqueTypes.map((type, index) => (
                  <div className="flex items-center space-x-2" key={index}>
                    <RadioGroupItem
                      value={type}
                      id={type}
                      onClick={() =>
                        setSelectedType(type === "All type" ? null : type)
                      }
                    />
                    <label htmlFor={type} className="capitalize">
                      {type}
                    </label>
                  </div>
                ))}
              </RadioGroup>

              {/* price slider */}
              <div className="max-w-[56] ">
                <div className="text-lg mb-4 font-medium">
                  Preço Máximo:
                  <span className="text-accent font-semibold ml-2">
                    R${price}
                  </span>
                  <div>
                    <span className="">
                      
                      {filteredEvents.length === 1
                        ? `${filteredEvents.length} item`
                        : `${filteredEvents.length} itens`}
                    </span>
                  </div>
                </div>
                <Slider
                  defaultValue={[900]}
                  max={1000}
                  step={1}
                  onValueChange={(val) => setPrice(val[0])}
                  className="mb-6"
                />
              </div>

              <button
                onClick={handleSubmit}
                className="w-full h-[54px] rounded-lg bg-accent hover:bg-accent-hover transition-all flex items-center justify-center text-white"
              >
                <BiRightArrowAlt className="text-3xl" />
              </button>
            </div>
          </aside>

          {/* events list */}
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-[10px] bg-blue-200">
              {filteredEvents.map((event, index) => (
                <Link href={`/event/${event.id}`} key={index}>
                  <Event event={event} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventCategories;
