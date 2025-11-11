"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Nav from "./Nav";

interface MobileNavProps {
    scrolled: boolean;
}

const MobileNav = ({ scrolled }: MobileNavProps) => {
    const [open, setOpen] = useState(false);

    const closeMenu = () => setOpen(false);

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <motion.button
                    whileTap={{ scale: 0.9 }}
                    className={`
                        relative z-50 p-2 rounded-lg transition-all
                        ${scrolled ? "text-secondary" : "text-white"}
                        ${scrolled ? "bg-secondary/10 hover:bg-secondary/20" : "bg-white/10 hover:bg-white/20"} 
                        backdrop-blur-sm border border-white/10
                    `}
                    aria-label="Abrir menu"
                >
                    <FiMenu size={28} />
                </motion.button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px] sm:w-[320px] p-0 border-0 overflow-y-auto bg-white">
                {/* Título acessível para screen readers - escondido visualmente */}
                <SheetTitle className="sr-only">Menu de Navegação - Vibraventura</SheetTitle>

                {/* Header do menu */}
                <div className="bg-gradient-to-br from-secondary to-accent p-6">
                    <div className="flex items-center justify-between mb-6">
                        <Image
                            src="/assets/header/logo1.png"
                            alt="Vibraventura"
                            width={50}
                            height={50}
                            className="w-12 h-12"
                        />
                    </div>

                    <h3 className="text-white font-primary font-bold text-xl">
                        Navegação
                    </h3>
                    <p className="text-white/90 text-sm font-primary mt-1">
                        Explore nossas aventuras
                    </p>
                </div>

                {/* Links */}
                <div className="p-6 space-y-4 bg-white">
                    <Nav mobile onLinkClick={closeMenu} />

                    {/* Separador */}
                    <div className="h-px bg-gradient-to-r from-transparent via-grey/30 to-transparent my-6" />

                    {/* Link do Vibraventura */}
                    {/* <Link href="https://vibraventura.com.br" onClick={closeMenu}>
                        <motion.div
                            whileHover={{ scale: 1.02, x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-secondary to-accent text-white p-4 rounded-xl font-secondary font-bold uppercase tracking-wider text-sm shadow-lg shadow-secondary/25 flex items-center justify-between border border-white/10"
                        >
                            <span className="flex items-center gap-2">🚀 Vibraventura</span>
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </motion.div>
                    </Link> */}

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 p-4 bg-gradient-to-br from-secondary/5 to-accent/5 rounded-xl border border-secondary/20"
                    >
                        <p className="text-secondary font-primary font-semibold text-sm mb-3">
                            Pronto para sua aventura?
                        </p>
                        <a
                            href="https://vibraventura.com.br"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block w-full text-center bg-gradient-to-r from-secondary to-accent hover:from-secondary/90 hover:to-accent/90 text-white py-3 rounded-lg font-secondary font-bold text-sm uppercase shadow-lg hover:shadow-xl transition-all duration-300"
                            onClick={closeMenu}
                        >
                            Explorar Marketplace
                        </a>
                    </motion.div>
                </div>
            </SheetContent>
        </Sheet>
    );
};

export default MobileNav;