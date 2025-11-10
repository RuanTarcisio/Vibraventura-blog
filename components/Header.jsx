"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "./Nav";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detectar scroll para alterar o header
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fechar menu ao clicar em link
  const closeMenu = () => setMenuOpen(false);

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
            onClick={closeMenu}
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
            <Link href="/blog" onClick={closeMenu}>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`
                  relative overflow-hidden
                  px-6 py-3 rounded-xl
                  font-secondary font-bold uppercase tracking-wider text-sm
                  transition-all duration-300
                  ${scrolled
                    ? 'bg-gradient-to-r from-accent to-accent-hover text-white shadow-lg hover:shadow-xl'
                    : 'bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30'
                  }
                `}
              >
                {/* Efeito de brilho animado */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                />

                <span className="relative flex items-center gap-2">
                  📝 Blog
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Botão Menu Mobile */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(!menuOpen)}
            className={`
              lg:hidden relative z-50 p-2 rounded-lg transition-all
              ${scrolled ? 'text-secondary' : 'text-white'}
              ${menuOpen ? 'bg-accent text-white' : 'bg-white/10 backdrop-blur-sm'}
            `}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <motion.div
              animate={{ rotate: menuOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
            </motion.div>
          </motion.button>
        </div>
      </div>

      {/* Menu Mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={closeMenu}
            />

            {/* Menu */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-white z-50 shadow-2xl lg:hidden overflow-y-auto"
            >
              {/* Header do menu */}
              <div className="bg-gradient-to-br from-secondary via-tertiary to-accent p-6">
                <div className="flex items-center justify-between mb-6">
                  <Image
                    src="/assets/header/logo1.png"
                    alt="Vibraventura"
                    width={50}
                    height={50}
                    className="w-12 h-12"
                  />
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={closeMenu}
                    className="p-2 rounded-lg bg-white/20 text-white"
                  >
                    <FiX size={24} />
                  </motion.button>
                </div>

                <h3 className="text-white font-primary font-bold text-xl">
                  Navegação
                </h3>
                <p className="text-white/80 text-sm font-primary mt-1">
                  Explore nossas aventuras
                </p>
              </div>

              {/* Links */}
              <div className="p-6 space-y-4">
                <Nav mobile onLinkClick={closeMenu} />

                {/* Separador */}
                <div className="h-px bg-grey/20 my-6" />

                {/* Link do Blog */}
                <Link href="/blog" onClick={closeMenu}>
                  <motion.div
                    whileHover={{ scale: 1.02, x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-gradient-to-r from-accent to-accent-hover text-white p-4 rounded-xl font-secondary font-bold uppercase tracking-wider text-sm shadow-lg flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      📝 Blog
                    </span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </motion.div>
                </Link>

                {/* CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-8 p-4 bg-gradient-to-br from-accent/10 to-tertiary/10 rounded-xl border border-accent/20"
                >
                  <p className="text-secondary font-primary text-sm mb-3">
                    Pronto para sua aventura?
                  </p>
                  <a
                    href="https://vibraventura.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center bg-gradient-to-r from-secondary to-secondary-hover text-white py-3 rounded-lg font-secondary font-bold text-sm uppercase hover:shadow-lg transition-all"
                  >
                    Explorar Marketplace
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Indicador de scroll (barra de progresso) */}
      <motion.div
        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-accent via-tertiary to-secondary origin-left"
        style={{
          scaleX: scrolled ? 1 : 0,
          transition: "transform 0.3s ease-out"
        }}
      />
    </motion.header>
  );
};

export default Header;