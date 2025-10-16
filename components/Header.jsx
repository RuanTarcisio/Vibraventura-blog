"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import { CgShoppingBag } from "react-icons/cg";
import CartSidebar from "./CartSidebar";
import { useShoppingCart } from "use-shopping-cart";
import Searchbar from "./SearchBar/Searchbar";
import { useContext } from "react";
import { EventContext } from "@/contexts/EventContext";

const Header = () => {
  const { cartCount, handleCartClick } = useShoppingCart();
  const { handleClearSearch } = useContext(EventContext);

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto h-full border-b border-white/20 py-3 xl:py-6 px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-4 lg:gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded-lg transition-transform hover:scale-105"
            aria-label="Vibraventura - Página inicial"
          >
            <Image
              src="/assets/header/logo1.png"
              width={85}
              height={85}
              alt="Vibraventura - Aventuras e Experiências"
              className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 transition-all duration-300"
              priority
            />
          </Link>

          {/* Searchbar + texto + limpar */}
          <div className="flex flex-col items-center lg:items-start flex-1 w-full max-w-3xl text-center lg:text-left">
            <div className="w-full">
              <Searchbar />
            </div>
            <div className="flex flex-col xl:flex-row justify-between items-center gap-2 mt-2 px-2">
              <p className="text-xs sm:text-sm md:text-base italic font-light text-white/80">
                Explore por atividade, local ou categoria — ou veja todas as experiências.
              </p>
              <button
                onClick={handleClearSearch}
                className="text-accent text-xs sm:text-sm font-medium hover:underline transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 rounded-lg px-3 py-1"
                aria-label="Limpar busca atual"
              >
                Limpar busca
              </button>
            </div>
          </div>

          {/* Navegação e carrinho */}
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-[26px]">
            {/* Menu desktop */}
            <div className="hidden sm:block">
              <Nav />
            </div>

            {/* Botão carrinho */}
            <button
              onClick={() => handleCartClick()}
              className="relative p-2 rounded-lg transition-all duration-300 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50"
              aria-label={`Abrir carrinho de compras. ${cartCount} itens no carrinho`}
            >
              <CgShoppingBag className="text-2xl sm:text-[26px] text-white" />
              {cartCount > 0 && (
                <div className="absolute -top-1 -right-1 bg-accent text-white rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs font-bold px-1 animate-pulse">
                  {cartCount > 99 ? "99+" : cartCount}
                </div>
              )}
            </button>

            <CartSidebar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
