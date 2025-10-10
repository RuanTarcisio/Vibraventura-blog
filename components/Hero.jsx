import { useContext } from "react";
import Searchbar from "./SearchBar/Searchbar";
import { EventContext } from "@/contexts/EventContext";

const Hero = () => {
  const { handleClearSearch } = useContext(EventContext);

  return (
    <section className="relative flex flex-col justify-center items-center min-h-[90vh] xl:min-h-[800px] py-20 px-4 text-center overflow-hidden">
      {/* BG com gradiente sobre imagem */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/assets/hero/hero.jpg)", // ou sua imagem
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed", // efeito parallax
          }}
        />
        
      </div>

      {/* Conteúdo */}
      <div className="container mx-auto flex flex-col items-center justify-center gap-6 max-w-[680px] relative z-10">
        <div className="flex flex-col gap-2">
          <div className="pretitle mt-14 text-accent">Viva novas emoções</div>
          <h1 className="h1 leading-tight text-white">
            Conecte-se com a natureza <br /> e viva a aventura
          </h1>
          <p className="text-sm md:text-base xl:text-lg font-light text-white mb-4 xl:mb-10 max-w-[480px] mx-auto">
            O Vibraventura conecta pessoas a experiências únicas de turismo e esportes
            radicais. Descubra lugares incríveis, explore seu limite e compartilhe
            momentos que fazem o coração vibrar.
          </p>
        </div>

        {/* Search */}
        <div className="w-full flex flex-col items-center gap-3">
          <Searchbar />
          <div className="w-full flex flex-col xl:flex-row justify-center xl:justify-between items-center">
            <p className="text-xs md:text-sm italic font-light text-white text-center">
              Explore por atividade, local ou categoria — ou veja todas as experiências.
            </p>
            <button
              onClick={handleClearSearch}
              className="text-accent text-sm mt-2 xl:mt-0 hover:underline transition-all"
            >
              Limpar busca
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;