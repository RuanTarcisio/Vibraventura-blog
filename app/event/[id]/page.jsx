// components/EventDetails.jsx

// (imports permanecem os mesmos)
import BuyTicket from "@/components/BuyTicket";
import CustonSelect from "@/components/CustonSelect";
import EventSchedule from "@/components/EventSchedule";
import Organizers from "@/components/Organizers";
import Timer from "@/components/Timer";
import Image from "next/image";

import { FaRegCircleCheck } from "react-icons/fa6";

const EventDetails = async ({ params }) => {
  const { id } = await params;
  const COSMIC_URL = process.env.NEXT_PUBLIC_COSMIC_URL;
  const READ_KEY = process.env.NEXT_PUBLIC_READ_KEY;

  const fetchEvents = async () => {
    const res = await fetch(
      `${COSMIC_URL}/objects/68925629b032ab872be93aed?read_key=${READ_KEY}&depth=1&props=slug,title,metadata`,
      { next: { revalidate: 120 } }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch events from Cosmic");
    }

    const data = await res.json();
    return data.object.metadata.events.events;
  };

  const allEvents = await fetchEvents();

  // Encontra o evento com base no ID
  const event = allEvents.find((e) => e.id === id);

  // Lida com o caso de o evento não ser encontrado
  if (!event) {
    return (
      <div className="container mx-auto py-48 text-center">
        <h1 className="h1">Event Not Found</h1>
        <p>The event you are looking for does not exist.</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen flex items-center py-8 sm:py-48">
      <div className="container mx-auto">
        <div className="w-full max-w-[600px] xl:max-w-none mx-auto">
          {/* event details 1 */}
          <div className="flex flex-col gap-8 xl:gap-24 xl:flex-row pt-28 pb-12 sm:py-0 xl:mb-24">
            {/* image */}
            <div className="relative w-full h-[320px] xl:max-w-[670px] xl:h-[500px] rounded-2xl overflow-hidden mb-12 xl:mb-0">
              <Image
                src={event.img_lg}
                fill
                className="object-cover mix-blend-lighten"
                alt=""
              />
            </div>
            {/* info */}
            <div className="flex w-full max-w-[460px] flex-col justify-center gap-8 flex-1 sm:mb-12 xl:mb-0">
              <div>
                <h2 className="h2 mb-4">{event.title}</h2>
                <EventSchedule event={event} />
              </div>
              {/* Note: The Timer, CustomSelect, and BuyTicket components will need to be Client Components if they use hooks like useState or useEffect */}
              <Timer event={event} />
              <CustonSelect event={event} />
              <BuyTicket event={event} />
            </div>
          </div>

          {/* event details 2 */}
          <div className="flex flex-col xl:flex-row gap-8 xl:gap-24">
            {/* text */}
            <div className="w-full xl:max-w-[670px] flex flex-col gap-8 xl:gap-12">
              <p className="text-grey">{event.description} </p>
              <div>
                <h3 className="h3 mb-6">Requirements for the event</h3>
                <ul className="flex flex-col gap-4">
                  <li className="flex gap-3 items-center">
                    <span className="text-accent text-xl">
                      <FaRegCircleCheck />
                    </span>
                    <p className="text-gray-">
                      Chegue com antecedência": Recomenda-se chegar 1 hora antes
                      do horário de início para garantir seu assento e evitar
                      filas.
                    </p>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-accent text-xl">
                      <FaRegCircleCheck className="justify-around" />
                    </span>
                    <p className="text-gray-">
                      Documento de identificação com foto": Necessário
                      apresentar um documento válido (RG, CNH) na entrada.
                    </p>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-accent text-xl">
                      <FaRegCircleCheck />
                    </span>
                    <p className="text-gray-">
                      Proibido fumar em áreas fechadas": Respeite a legislação
                      local e as regras do local do evento.
                    </p>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-accent text-xl">
                      <FaRegCircleCheck />
                    </span>
                    <p className="text-gray-">
                      Não é permitida a entrada de alimentos e bebidas": O local
                      conta com uma variedade de opções de lanchonetes e bares.
                    </p>
                  </li>
                  <li className="flex gap-3 items-center">
                    <span className="text-accent text-xl">
                      <FaRegCircleCheck />
                    </span>
                    <p className="text-gray-">
                      Proibido objetos cortantes ou de vidro": A segurança do
                      estádio fará uma revista na entrada.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="w-full max-w-[460px]">
              <Organizers event={event} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
