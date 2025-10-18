"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Searchbar from "./SearchBar/Searchbar";
import Nav from "./Nav";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="absolute top-0 left-0 w-full bg-black/10 backdrop-blur-md border-b border-white/10 z-50">

      <div className="container mx-auto flex flex-col lg:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-3 lg:py-4">

        {/* Linha principal: logo + menu toggle */}
        <div className="flex items-center justify-between w-full lg:w-auto">
          {/* Logo */}
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className="flex items-center gap-2 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded-lg"
            aria-label="Vibraventura - Página inicial"
          >
            <Image
              src="/assets/header/logo1.png"
              alt="Vibraventura"
              width={80}
              height={80}
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 transition-all"
              priority
            />
          </Link>

          {/* Botão hamburguer (mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-2xl text-white focus:outline-none"
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        {/* Searchbar */}
        <div className="w-full lg:flex-1 order-3 lg:order-none">
          <div className="w-full max-w-3xl mx-auto">
            <Searchbar />
          </div>
        </div>

        {/* Nav desktop */}
        <div className="hidden lg:block">
          <Nav />
        </div>

        {/* Menu mobile */}
        {menuOpen && (
          <div className="lg:hidden w-full bg-black/70 backdrop-blur-md mt-3 rounded-2xl py-4 px-4 animate-fadeIn">
            <Nav />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
