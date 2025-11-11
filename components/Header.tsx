"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { motion } from "framer-motion";
import Nav from "./Nav";
import MobileNav from "./MobileNav";

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para alterar o header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-2xl border-b border-grey/10"
          : "bg-gradient-to-b from-black/40 via-black/20 to-transparent backdrop-blur-md border-b border-white/10"
        }`}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo */}
          <Link
            href="/"
            className="relative z-50 group"
            aria-label="Vibraventura - Página inicial"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <Image
                src="/assets/header/logo1.png"
                alt="Vibraventura"
                width={60}
                height={60}
                className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 transition-all"
                priority
              />

              {/* Efeito de brilho ao passar o mouse */}
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-tertiary opacity-0 group-hover:opacity-20 rounded-full blur-xl transition-opacity duration-300" />
            </motion.div>
          </Link>

          {/* Nav Desktop + Blog Link */}
          <div className="hidden lg:flex items-center gap-8">
            <Nav />

            {/* Link do Blog com destaque */}
            <Link href="/blog">
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative overflow-hidden
                  px-6 py-3 rounded-xl
                  font-secondary font-bold uppercase tracking-wider text-sm
                  transition-all duration-300
                  ${scrolled
                    ? "bg-gradient-to-r from-accent to-accent-hover text-white shadow-lg hover:shadow-xl"
                    : "bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30"
                  }
                `}
              >
                {/* Efeito de brilho animado */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 2,
                  }}
                />

                <span className="relative flex items-center gap-2">📝 Blog</span>
              </motion.div>
            </Link>
          </div>

          {/* Botão Menu Mobile */}
          <div className="lg:hidden">
            <MobileNav scrolled={scrolled} />
          </div>
        </div>
      </div>

      {/* Indicador de scroll (barra de progresso) */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-tertiary to-secondary origin-left"
        style={{
          scaleX: scrolled ? 1 : 0,
          transition: "transform 0.3s ease-out",
        }}
      />
    </motion.header>
  );
};

export default Header;