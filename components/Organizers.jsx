import Image from "next/image";
import Link from "next/link";
import React from "react";

const Organizers = ({ event }) => {
  return (
    <div className="bg-secondary py-8 px-6 md:px-12 xl:px-16 w-full flex flex-col gap-8 rounded-2xl">
      <div className="">
        <h3 className="h3 mb-4">Organizers</h3>
        <div className="w-[74px] h-[3px] bg-accent rounded-3xl"></div>
      </div>
      {event.organizers.map((organizer, index) => {
        return (
          <div 
            className="flex items-center gap-8 border-b last-of-type:border-none border-white/10 pb-8" 
            key={index}
          >
            <Image 
              src={organizer.img_avatar} 
              width={72} 
              height={72} alt="" 
            />
            {/* organizer info */}
            <div className="">
              <div className="flex flex-col gap-2">
                <h4 className="h4 text-lg font-medium">{organizer.name}</h4>
                <p className="text-accent">{organizer.job}</p>
                {/* social */}
                <div className="flex gap-4">
                  {organizer.social.map((social, index) => {
                    return (
                      <Link href={social.path} key={index}>
                        <Image
                          src={social.icon}
                          width={20}
                          height={20}
                          alt=""
                        />
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Organizers;
