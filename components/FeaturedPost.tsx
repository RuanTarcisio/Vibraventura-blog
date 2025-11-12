'use client';

import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { getCategoryConfig } from "@/app/lib/design-system";
import { useRef } from "react";

export default function FeaturedPost({ post }: { post: any }) {
    const metadata = post.metadata || {};
    const config = getCategoryConfig(metadata.tipo_post || metadata.categoria);
    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax scroll effect
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity, scale }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative group"
        >
            {/* Container principal */}
            <div className="mt-20 relative bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-transparent hover:border-accent/20 transition-all duration-500">

                {/* Gradiente de borda animado */}
                <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none`} />

                <div className="grid lg:grid-cols-2 gap-0">
                    {/* Imagem com parallax */}
                    <div className="relative h-[400px] lg:h-[600px] overflow-hidden">
                        <motion.div
                            style={{ y }}
                            className="absolute inset-0 w-full h-full"
                        >
                            <Image
                                src={metadata.imagem_base?.url || "/images/fallback.png"}
                                alt={metadata.titulo || post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                priority
                            />
                        </motion.div>

                        {/* Overlay gradiente */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/60" />

                        {/* Badge flutuante */}
                        <motion.div
                            className="absolute top-6 left-6 z-20"
                            initial={{ x: -100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            <CategoryBadge category={metadata.tipo_post || metadata.categoria} />
                        </motion.div>

                        {/* Tag de destaque */}
                        <motion.div
                            initial={{ rotate: -45, scale: 0 }}
                            animate={{ rotate: 0, scale: 1 }}
                            transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                            className="absolute top-6 right-6 bg-gradient-to-r from-adventureOrange to-accent text-white px-4 py-2 rounded-full font-secondary text-xs font-bold uppercase tracking-wider shadow-lg"
                        >
                            ⭐ Destaque
                        </motion.div>

                        {/* Padrão decorativo */}
                        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-white via-white/50 to-transparent lg:hidden" />
                    </div>

                    {/* Conteúdo */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center space-y-6 relative">

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
                            className="flex items-center gap-2 text-accent font-secondary text-sm font-bold uppercase tracking-wider"
                        >
                            <motion.div
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="w-2 h-2 bg-accent rounded-full"
                            />
                            Aventura em Destaque
                        </motion.div>

                        {/* Título */}
                        <Link href={`/post/${post.slug}`}>
                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-4xl lg:text-5xl font-primary font-bold text-secondary leading-tight group-hover:text-accent transition-colors duration-300"
                            >
                                {metadata.titulo || post.title}
                            </motion.h2>
                        </Link>

                        {/* Descrição */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-grey text-lg font-primary leading-relaxed line-clamp-4"
                            dangerouslySetInnerHTML={{
                                __html: metadata.descricao || "Embarque nesta aventura incrível..."
                            }}
                        />

                        {/* Meta informações */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-6 pt-4 border-t border-grey/20"
                        >
                            {/* Autor */}
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent via-tertiary to-secondary flex items-center justify-center text-white font-bold font-secondary text-lg shadow-lg">
                                    {(metadata.autor || "V")[0].toUpperCase()}
                                </div>
                                <div>
                                    <p className="text-sm text-grey font-primary">Por</p>
                                    <p className="font-secondary font-bold text-secondary">
                                        {metadata.autor || "Vibraventura"}
                                    </p>
                                </div>
                            </div>

                            {/* Separador */}
                            <div className="w-px h-12 bg-grey/20" />

                            {/* Data */}
                            <div>
                                <p className="text-sm text-grey font-primary">Publicado em</p>
                                <p className="font-secondary font-bold text-secondary">
                                    {new Date(metadata.publicada_em).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
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
                            <Link href={`/post/${post.slug}`}>
                                <motion.button
                                    whileHover={{ scale: 1.05, x: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group/btn relative overflow-hidden bg-gradient-to-r from-accent to-accent-hover text-white font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                                >
                                    {/* Fundo animado */}
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-adventureOrange to-accent"
                                        initial={{ x: '-100%' }}
                                        whileHover={{ x: 0 }}
                                        transition={{ duration: 0.3 }}
                                    />

                                    <span className="relative flex items-center gap-3">
                                        Explorar Aventura
                                        <motion.svg
                                            className="w-5 h-5"
                                            animate={{ x: [0, 5, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </motion.svg>
                                    </span>
                                </motion.button>
                            </Link>
                        </motion.div>

                        {/* Tags */}
                        {metadata.tags && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-wrap gap-2 pt-4"
                            >
                                {metadata.tags.split(',').slice(0, 4).map((tag: string, i: number) => (
                                    <motion.span
                                        key={tag.trim()}
                                        initial={{ opacity: 0, scale: 0 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.8 + (i * 0.1) }}
                                        whileHover={{ scale: 1.1, y: -2 }}
                                        className="text-sm font-secondary bg-gradient-to-r from-accent/10 to-tertiary/10 text-accent px-4 py-2 rounded-full border border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all cursor-default"
                                    >
                                        #{tag.trim()}
                                    </motion.span>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Sombra decorativa */}
            <motion.div
                className={`absolute -bottom-4 left-10 right-10 h-8 bg-gradient-to-r ${config.gradient} blur-2xl opacity-30 -z-10`}
                animate={{
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    );
}