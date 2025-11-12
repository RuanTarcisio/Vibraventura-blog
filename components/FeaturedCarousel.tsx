'use client';

import { useState, useEffect, useRef } from 'react';
import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { getCategoryConfig } from '@/app/lib/design-system';

interface FeaturedCarouselProps {
    posts: any[];
}

export default function FeaturedCarousel({ posts }: FeaturedCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const currentPost = posts[currentIndex];
    const metadata = currentPost?.metadata || {};
    const config = getCategoryConfig(metadata.tipo_post || metadata.categoria);

    // Auto-play
    useEffect(() => {
        if (isAutoPlaying && posts.length > 1) {
            timerRef.current = setInterval(() => {
                nextSlide();
            }, 5000); // 5 segundos
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [currentIndex, isAutoPlaying, posts.length]);

    const nextSlide = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % posts.length);
    };

    const prevSlide = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
    };

    const goToSlide = (index: number) => {
        setDirection(index > currentIndex ? 1 : -1);
        setCurrentIndex(index);
    };

    const handleMouseEnter = () => setIsAutoPlaying(false);
    const handleMouseLeave = () => setIsAutoPlaying(true);

    // Variantes de animação
    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1,
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.8,
        }),
    };

    if (posts.length === 0) return null;

    return (
        <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Container do Carrossel - Altura aumentada */}
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-2xl">
                {/* Slides */}
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={slideVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 },
                            scale: { duration: 0.2 },
                        }}
                        className="absolute inset-0"
                    >
                        <div className="relative w-full h-full bg-white">
                            {/* Layout: Mobile = vertical, Desktop = 60% imagem + 40% conteúdo */}
                            <div className="flex flex-col lg:flex-row h-full">
                                {/* Imagem - 60% no desktop, 50% no mobile */}
                                <div className="relative h-1/2 lg:h-full lg:w-[60%] overflow-hidden">
                                    <Image
                                        src={metadata.imagem_base?.url || "/images/fallback.png"}
                                        alt={metadata.titulo || currentPost.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        quality={90}
                                        sizes="(max-width: 1024px) 100vw, 60vw"
                                    />

                                    {/* Overlay gradiente otimizado */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-black/10 lg:to-black/50" />

                                    {/* Badge flutuante */}
                                    <motion.div
                                        initial={{ x: -100, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.3 }}
                                        className="absolute top-4 left-4 lg:top-6 lg:left-6 z-20"
                                    >
                                        <CategoryBadge category={metadata.categoria} />
                                    </motion.div>

                                    {/* Tag de destaque */}
                                    <motion.div
                                        initial={{ rotate: -45, scale: 0 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="absolute top-4 right-4 lg:top-6 lg:right-6 bg-gradient-to-r from-adventureOrange to-accent text-white px-3 py-1.5 lg:px-4 lg:py-2 rounded-full font-secondary text-xs font-bold uppercase tracking-wider shadow-lg z-20"
                                    >
                                        ⭐ Destaque
                                    </motion.div>
                                </div>

                                {/* Conteúdo - 40% no desktop, 50% no mobile */}
                                <div className="h-1/2 lg:h-full lg:w-[40%] p-6 md:p-8 lg:p-10 flex flex-col justify-center space-y-4 lg:space-y-6 relative bg-white overflow-y-auto">
                                    {/* Decoração de fundo */}
                                    <motion.div
                                        className={`absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${config.gradient} rounded-full blur-3xl opacity-10`}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            rotate: [0, 90, 0],
                                        }}
                                        transition={{
                                            duration: 10,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />

                                    {/* Tag "Em Destaque" */}
                                    <motion.div
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="flex items-center gap-2 text-accent font-secondary text-xs lg:text-sm font-bold uppercase tracking-wider"
                                    >
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="w-2 h-2 bg-accent rounded-full"
                                        />
                                        {currentIndex + 1} de {posts.length} - Aventura em Destaque
                                    </motion.div>

                                    {/* Título */}
                                    <Link href={`/post/${currentPost.slug}`}>
                                        <motion.h2
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                            className="text-2xl md:text-3xl lg:text-4xl font-primary font-bold text-secondary leading-tight hover:text-accent transition-colors duration-300 line-clamp-3"
                                        >
                                            {metadata.titulo || currentPost.title}
                                        </motion.h2>
                                    </Link>

                                    {/* Descrição */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-grey text-sm md:text-base lg:text-lg font-primary leading-relaxed line-clamp-3 lg:line-clamp-4"
                                        dangerouslySetInnerHTML={{
                                            __html: metadata.descricao || "Embarque nesta aventura incrível..."
                                        }}
                                    />

                                    {/* Meta informações */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-center gap-4 lg:gap-6 pt-4 border-t border-grey/20"
                                    >
                                        <div className="flex items-center gap-2 lg:gap-3">
                                            <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-accent via-tertiary to-secondary flex items-center justify-center text-white font-bold font-secondary shadow-lg text-xs lg:text-sm">
                                                {(metadata.autor || "V")[0].toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-xs text-grey font-primary">Por</p>
                                                <p className="font-secondary font-bold text-secondary text-xs lg:text-sm">
                                                    {metadata.autor || "Vibraventura"}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="w-px h-8 lg:h-10 bg-grey/20" />

                                        <div>
                                            <p className="text-xs text-grey font-primary">Publicado</p>
                                            <p className="font-secondary font-bold text-secondary text-xs lg:text-sm">
                                                {new Date(metadata.publicada_em).toLocaleDateString('pt-BR', {
                                                    day: '2-digit',
                                                    month: 'short'
                                                })}
                                            </p>
                                        </div>
                                    </motion.div>

                                    {/* Botão CTA */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.6 }}
                                    >
                                        <Link href={`/post/${currentPost.slug}`}>
                                            <motion.button
                                                whileHover={{ scale: 1.05, x: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                className="relative overflow-hidden bg-gradient-to-r from-accent to-accent-hover text-white font-secondary font-bold uppercase tracking-wider px-5 py-2.5 lg:px-6 lg:py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 text-xs lg:text-sm"
                                            >
                                                <span className="relative flex items-center gap-2">
                                                    Explorar Aventura
                                                    <svg className="w-3 h-3 lg:w-4 lg:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                                    </svg>
                                                </span>
                                            </motion.button>
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Botões de navegação */}
                {posts.length > 1 && (
                    <>
                        {/* Botão anterior */}
                        <motion.button
                            whileHover={{ scale: 1.1, x: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={prevSlide}
                            className="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-secondary p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                            aria-label="Slide anterior"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </motion.button>

                        {/* Botão próximo */}
                        <motion.button
                            whileHover={{ scale: 1.1, x: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={nextSlide}
                            className="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/90 hover:bg-white text-secondary p-3 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm"
                            aria-label="Próximo slide"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </motion.button>
                    </>
                )}
            </div>

            {/* Indicadores de navegação */}
            {posts.length > 1 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center gap-2 mt-6"
                >
                    {posts.map((_, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => goToSlide(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? `w-12 bg-gradient-to-r ${config.gradient}`
                                    : 'w-2 bg-grey/30 hover:bg-grey/50'
                                }`}
                            aria-label={`Ir para slide ${index + 1}`}
                        />
                    ))}
                </motion.div>
            )}

            {/* Contador de slides */}
            {posts.length > 1 && (
                <div className="absolute bottom-6 right-6 z-20 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg font-secondary text-sm font-bold text-secondary">
                    {currentIndex + 1} / {posts.length}
                </div>
            )}

            {/* Indicador de auto-play */}
            {posts.length > 1 && (
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                    className="absolute bottom-6 left-6 z-20 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg text-secondary hover:bg-white transition-all"
                    aria-label={isAutoPlaying ? "Pausar auto-play" : "Iniciar auto-play"}
                >
                    {isAutoPlaying ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                        </svg>
                    ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </motion.button>
            )}
        </div>
    );
}