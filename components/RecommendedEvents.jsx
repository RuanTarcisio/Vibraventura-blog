"use client";

import { EventContext } from "@/contexts/EventContext";
import { useContext, useEffect, useRef, useState } from "react";

// import swiper react components
import { Swiper, SwiperSlide } from "swiper/react";

// import swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import swiper required modules
import { Pagination, Navigation } from "swiper/modules";

// import components
import Link from "next/link";
import Image from "next/image";
import Event from "./Events/Event";
import SkeletonGrid from "./SkeletonGrid";

const RecommendedEvents = () => {
  const { events } = useContext(EventContext);
  const [eventValue, setEventValue] = useState("all");

  const filterRecommendedEvents = events.filter(
    (event) => event.recommended === true
  );

  const swiperRef = useRef(null);

  return (
    <section className="mb-32"> 
      <div className="mb-12 text-center">
        <h3 className="pretitle">Recommended for you</h3>
        <h2 className="h2">Events You Might Like</h2>
      </div>
      {filterRecommendedEvents.length > 0 ? (
        <div className="relative group">
          <Swiper
            ref={swiperRef}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ dynamicBullets: true, clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1310: { slidesPerView: 4 },
            }}
            modules={[Pagination, Navigation]}
            className="relative"
            onSwiper={(swiper) => {
              // Atribui a instância do Swiper à ref
              swiperRef.current = swiper;
            }}
          >
            {filterRecommendedEvents.map((event, index) => (
              <SwiperSlide key={index} className="select-none mb-14">
                <Link href={`/event/${event.id}`}>
                  <Event event={event} />
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
          {/* Botões de navegação personalizados */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Anterior"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center cursor-pointer hover:bg-gray-100 transition-all opacity-100 md:opacity-0 md:group-hover:opacity-100"
            aria-label="Próximo"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      ) : (
        <SkeletonGrid itemCount={4} />
      )}
    </section>
  );
};

export default RecommendedEvents;
