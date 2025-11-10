import { useContext } from "react";
import Searchbar from "./SearchBar/Searchbar";
import { EventContext } from "@/contexts/EventContext";

const Hero = () => {
  

  return (
    <section
      className="relative flex flex-col justify-center items-center min-h-[90vh] xl:min-h-[800px] py-10 px-4 text-center overflow-hidden"
      aria-label="Seção principal - Vibraventura"
    >
      {/* Background otimizado com overlay gradiente */}
      <div className="absolute inset-0 -z-10">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url(/assets/hero/fmarcelo.png)",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />
        {/* Overlay gradiente para melhor legibilidade */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
      </div>

      {/* Conteúdo principal com animações */}
      <div className="container mx-auto flex flex-col items-center justify-center gap-8 max-w-[680px] relative z-10">
        {/* Header com hierarquia melhorada */}
        <header className="flex flex-col gap-4 animate-fade-in-up">
          <div className="pretitle -mt-48 md:-mt-40 text-accent font-semibold tracking-wider">
            Viva novas emoções
          </div>
          <h1 className="h1 leading-tight text-white font-bold">
            Conecte-se com a <span className="text-accent">natureza</span>
            <br />
            e viva a <span className="text-accent">aventura</span>
          </h1>
          {/* <p className="text-base md:text-lg xl:text-xl font-light text-white/90 mb-4 xl:mb-10 max-w-[480px] mx-auto leading-relaxed">
            O Vibraventura conecta pessoas a experiências únicas de turismo e esportes
            radicais. Descubra lugares incríveis, explore seu limite e compartilhe
            momentos que fazem o coração vibrar.
          </p> */}
        </header>
      </div>
    </section>
  );
};

export default Hero;