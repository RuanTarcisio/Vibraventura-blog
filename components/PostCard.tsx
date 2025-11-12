'use client';

import Link from "next/link";
import CategoryBadge from "./CategoryBadge";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { getCategoryConfig } from "@/app/lib/design-system";
import { useState } from "react";

export default function PostCard({ post, index = 0 }: { post: any; index?: number }) {
    const metadata = post.metadata || {};
    const config = getCategoryConfig(metadata.tipo_post || metadata.categoria);
    const [isHovered, setIsHovered] = useState(false);

    // Efeito 3D no hover
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useTransform(y, [-100, 100], [5, -5]);
    const rotateY = useTransform(x, [-100, 100], [-5, 5]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        x.set(e.clientX - centerX);
        y.set(e.clientY - centerY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
        setIsHovered(false);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.22, 1, 0.36, 1]
            }}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
            whileHover={{
                scale: 1.03,
                y: -12,
                transition: { duration: 0.3 }
            }}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
        >
            {/* Gradient Border animado */}
            <motion.div
                className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                style={{ padding: '2px' }}
            >
                <div className="w-full h-full bg-white rounded-2xl" />
            </motion.div>

            <div className="relative z-10">
                <Link href={`/post/${post.slug}`}>
                {/* Imagem com parallax */}
                <div className="relative w-full aspect-[16/9] overflow-hidden rounded-t-2xl">
                    <motion.div
                        className="w-full h-full"
                        animate={isHovered ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <Image
                            src={metadata.imagem_base?.url || "/images/fallback.png"}
                            alt={metadata.titulo || post.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </motion.div>

                    {/* Overlay com gradiente */}
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                    {/* Badge de categoria */}
                    <div className="absolute top-4 left-4 z-20">
                        <CategoryBadge category={metadata.tipo_post || metadata.categoria} />
                    </div>

                    {/* Ícone de leitura animado */}
                    <motion.div
                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={isHovered ? {
                            scale: 1,
                            rotate: 0,
                            transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
                        } : {
                            scale: 0,
                            rotate: -180
                        }}
                    >
                        <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </motion.div>
                </div>

                {/* Conteúdo */}
                <div className="p-6 space-y-4">
                    {/* Meta informações */}
                    <div className="flex items-center justify-between text-sm text-grey">
                        <motion.span
                            className="flex items-center gap-2 font-secondary"
                            whileHover={{ x: 5 }}
                        >
                            <span className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-tertiary flex items-center justify-center text-white font-bold">
                                {(metadata.autor || "V")[0].toUpperCase()}
                            </span>
                            {metadata.autor || "Vibraventura"}
                        </motion.span>
                        <span className="font-primary">
                            {new Date(metadata.publicada_em).toLocaleDateString('pt-BR', {
                                day: '2-digit',
                                month: 'short'
                            })}
                        </span>
                    </div>

                    {/* Título */}
                    
                        <motion.h3
                            className="text-xl font-primary font-bold text-secondary line-clamp-2 group-hover:text-accent transition-colors duration-300"
                            style={{ transformStyle: "preserve-3d", transform: "translateZ(20px)" }}
                        >
                            {metadata.titulo || post.title}
                        </motion.h3>

                    {/* Descrição */}
                    <div
                        className="text-grey text-sm line-clamp-3 font-primary leading-relaxed"
                        dangerouslySetInnerHTML={{
                            __html: metadata.descricao?.substring(0, 140) + '...' || "Explore esta aventura..."
                        }}
                    />

                    {/* Tags */}
                    {metadata.tags && (
                        <div className="flex flex-wrap gap-2 pt-2">
                            {metadata.tags.split(',').slice(0, 3).map((tag: string, i: number) => (
                                <motion.span
                                    key={tag.trim()}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.1 * i + 0.3 }}
                                    className="text-xs font-secondary bg-gradient-to-r from-accent/10 to-tertiary/10 text-accent px-3 py-1 rounded-full border border-accent/20 hover:border-accent/40 transition-all"
                                >
                                    #{tag.trim()}
                                </motion.span>
                            ))}
                        </div>
                    )}

                    {/* Barra de progresso de leitura decorativa */}
                    <motion.div
                        className="h-1 bg-gradient-to-r from-accent via-tertiary to-secondary rounded-full overflow-hidden"
                        initial={{ scaleX: 0 }}
                        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                        style={{ originX: 0 }}
                    />
                    </div>
                </Link>

            </div>

            {/* Efeito de brilho no canto */}
            <motion.div
                className="absolute -right-20 -top-20 w-40 h-40 bg-gradient-to-br from-accent/20 to-transparent rounded-full blur-3xl"
                animate={{
                    scale: isHovered ? [1, 1.2, 1] : 1,
                    opacity: isHovered ? [0.5, 0.8, 0.5] : 0,
                }}
                transition={{
                    duration: 2,
                    repeat: isHovered ? Infinity : 0,
                }}
            />
        </motion.div>
    );
}