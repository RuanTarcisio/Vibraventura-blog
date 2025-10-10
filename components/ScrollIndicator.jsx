'use client'

import { FaChevronDown } from "react-icons/fa";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [progress, setProgress] = useState(0);
  const [showIndicator, setShowIndicator] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Verifica se é mobile na montagem e em redimensionamentos
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight * 0.8,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;
      const totalScroll = docHeight - windowHeight;
      const scrollProgress = (scrollY / totalScroll) * 100;

      setProgress(scrollProgress);
      
      // Mostra/oculta o indicador baseado na posição do scroll e no tipo de dispositivo
      if (isMobile) {
        setShowIndicator(scrollProgress < 80);
      } else {
        // Em desktop, mostra apenas se o usuário não tiver rolado ainda
        setShowIndicator(scrollY < windowHeight * 0.2);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);

  if (!showIndicator) return null;

  return (
    <div className={`fixed ${isMobile ? 'bottom-4 left-1/2 transform -translate-x-1/2' : 'bottom-8 right-8'} z-50`}>
      {/* Barra de progresso - mostrada apenas em mobile */}
      {isMobile && (
        <div className="w-24 h-1 bg-gray-600 rounded-full mb-2 mx-auto">
          <motion.div 
            className="h-full bg-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      )}

      {/* Ícone clicável */}
      <motion.button
        onClick={handleScrollDown}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`flex flex-col items-center ${!isMobile ? 'p-3 bg-gray-800/50 rounded-full backdrop-blur-sm' : ''}`}
        aria-label="Role para baixo"
      >
        <motion.div
          animate={{
            y: isMobile ? [0, 10, 0] : 0,
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <FaChevronDown className={`${isMobile ? 'text-white text-2xl' : 'text-accent text-3xl'}`} />
          {isMobile && <span className="text-lime-200 text-xs mt-1">Veja mais</span>}
        </motion.div>
      </motion.button>
    </div>
  );
}