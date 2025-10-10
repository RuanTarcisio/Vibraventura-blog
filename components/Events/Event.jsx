import { EventContext } from "@/contexts/EventContext";
import Image from "next/image";
import { useContext } from "react";
import { BiCalendar, BiTime, BiMap } from "react-icons/bi";

const Event = ({ event }) => {
  const { formatDate } = useContext(EventContext);
  const dbDate = event.date;
  const formattedDate = formatDate(dbDate);

  return (
   <div className="bg-white/5 hover:bg-white/10 transition-all rounded-3xl flex flex-col justify-start p-4 w-full max-w-[320px] sm:max-w-full mx-auto sm:mx-0 h-[400px]">

      <div className="relative w-full aspect-[4/3] mb-10">
        <Image
          src={event.img_sm}
          fill
          alt=""
          quality={100}
          className="rounded-2xl object-cover"
          sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, (max-width: 1309px) 33vw, 25vw"
        />
        <div className="absolute -bottom-[24px] left-4 bg-accent w-[110px] h-[40px] text-[13px] uppercase font-medium rounded-full flex items-center justify-center shadow-md">
          {event.type}
        </div>
      </div>
      <div className="pl-4 flex flex-col justify-between h-[50%]">
        <div>
          <div className="flex items-center gap-3 text-accent mb-2">
            <div className="flex items-center gap-1">
              <BiCalendar />
              <div className="text-[15px] capitalize">{formattedDate}</div>
            </div>

            <div className="flex items-center gap-1">
              <BiTime />
              <div className="text-[15px]">{event.hour}</div>
            </div>
          </div>
          <h4 className="h4">{event.title}</h4>
        </div>
        <div className="flex items-center gap-2 pb-2">
          <BiMap className="text-xl text-accent" />
          <p className="text-sm font-light text-white/70">{event.location}</p>
        </div>
      </div>
    </div>
  );
};

export default Event;
