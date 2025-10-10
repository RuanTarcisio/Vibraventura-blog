"use client";

import { EventContext } from "@/contexts/EventContext";
import { useContext, useEffect, useState } from "react";

const Timer = ({ event }) => {
  // Não precisamos do EventContext aqui a menos que você o use para algo mais
  // const {} = useContext(EventContext);

  // Calcula a data e hora alvo do evento UMA VEZ.
  // Criar Date objects é melhor feito aqui para evitar recriação desnecessária.
  const eventDate = new Date(`${event.date}T${event.hour}`).getTime(); // Pegue o valor em milissegundos imediatamente

  // Estado para controlar se o componente foi montado no cliente
  const [hasMounted, setHasMounted] = useState(false);

  // Estado para rastrear o tempo restante em milissegundos
  // Inicialize com um valor que não cause problemas de hidratação
  // Pode ser 0, null, ou um cálculo inicial que seja consistente no servidor/cliente
  // A melhor abordagem é calcular o inicial APENAS NO CLIENTE (dentro do useEffect)
  const [timeRemaining, setTimeRemaining] = useState(0);

  // Função para calcular o tempo restante (reutilizável)
  const calculateTimeLeft = (targetTime) => {
    const now = new Date().getTime();
    const distance = targetTime - now;
    // Garante que o tempo não seja negativo
    return distance > 0 ? distance : 0;
  };

  // Lógica do cronômetro de contagem regressiva
  useEffect(() => {
    // Sinaliza que o componente foi montado no cliente
    setHasMounted(true);

    // Calcula o tempo inicial restante APENAS no cliente
    setTimeRemaining(calculateTimeLeft(eventDate));

    // Configura um intervalo que atualiza a cada segundo
    const interval = setInterval(() => {
      const timeLeft = calculateTimeLeft(eventDate);

      // Se o tempo acabou, limpa o intervalo e para a contagem regressiva
      if (timeLeft <= 0) {
        clearInterval(interval);
        setTimeRemaining(0); // Garante que fique em zero
      } else {
        setTimeRemaining(timeLeft); // Atualiza o estado do tempo restante
      }
    }, 1000); // Executa a cada 1000 milissegundos (1 segundo)

    // Função de limpeza para limpar o intervalo quando o componente é desmontado
    return () => clearInterval(interval);
  }, [eventDate]); // O array de dependência garante que o efeito seja executado quando 'eventDate' muda

  // Renderiza um estado de "carregando" ou vazio até que o componente seja hidratado no cliente
  if (!hasMounted) {
    return (
      <div className="flex flex-wrap gap-4">
        {/* Renderize placeholders enquanto espera a hidratação */}
        <div className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
          <div>
            <div className="text-3xl font-semibold">--</div>
            <div className="text-sm uppercase font-medium">Days</div>
          </div>
        </div>
        <div className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
          <div>
            <div className="text-3xl font-semibold">--</div>
            <div className="text-sm uppercase font-medium">Hours</div>
          </div>
        </div>
        <div className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
          <div>
            <div className="text-3xl font-semibold">--</div>
            <div className="text-sm uppercase font-medium">Minutes</div>
          </div>
        </div>
        <div className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
          <div>
            <div className="text-3xl font-semibold">--</div>
            <div className="text-sm uppercase font-medium">Seconds</div>
          </div>
        </div>
      </div>
    );
  }

  // Se a contagem regressiva terminou, exibe uma mensagem
  if (timeRemaining <= 0) {
    return (
      <div className="text-2xl font-semibold text-center w-full py-4">
        The event has already passed!
      </div>
    );
  }

  // Calcula os dias, horas, minutos e segundos a partir do timeRemaining
  const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

  return (
    <div className="flex flex-wrap gap-4">
      {/* days */}
      <div className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
        <div>
          <div className="text-3xl font-semibold">{days}</div>
          <div className="text-sm uppercase font-medium">Dias</div>
        </div>
      </div>
      {/* hours */}
      <div className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
        <div>
          <div className="text-3xl font-semibold">{hours}</div>
          <div className="text-sm uppercase font-medium">Horas</div>
        </div>
      </div>
      {/* minutes */}
      <div className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
        <div>
          <div className="text-3xl font-semibold">{minutes}</div>
          <div className="text-sm uppercase font-medium">Minutos</div>
        </div>
      </div>
      {/* seconds */}
      <div className="text-center border-[3px] border-accent rounded-full w-[100px] h-[100px] flex items-center justify-center">
        <div>
          <div className="text-3xl font-semibold">{seconds}</div>
          <div className="text-sm uppercase font-medium">Segundos</div>
        </div>
      </div>
    </div>
  );
};

export default Timer;
