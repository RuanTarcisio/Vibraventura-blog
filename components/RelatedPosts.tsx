// import Link from "next/link";

// export default function RelatedPosts({ posts }: { posts: any[] }) {
//     if (!posts.length) return null;
//     return (
//         <div className="mt-10">
//             <h4 className="text-xl font-semibold mb-4">Outras aventuras</h4>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {posts.map(post => (
//                     <div key={post.slug} className="bg-white rounded-xl shadow p-4">
//                         <Link href={`/${post.slug}`} className="font-medium hover:text-green-600 transition">
//                             {post.title}
//                         </Link>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }


'use client';

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import CategoryBadge from "./CategoryBadge";
import { getCategoryConfig } from "@/app/lib/design-system";

export default function RelatedPosts({ posts }: { posts: any[] }) {
    if (!posts.length) return null;

    return (
        <div className="mt-20">
            {/* Título da seção */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-primary font-bold text-secondary mb-3">
                    Continue Explorando
                </h2>
                <p className="text-grey font-primary text-lg">
                    Outras aventuras que você vai adorar
                </p>
                <div className="w-20 h-1 bg-gradient-to-r from-accent via-tertiary to-secondary mx-auto rounded-full mt-4" />
            </motion.div>

            {/* Grid de posts */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post, index) => {
                    const metadata = post.metadata || {};
                    const config = getCategoryConfig(metadata.tipo_post || metadata.categoria);

                    return (
                        <motion.div
                            key={post.slug}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.1,
                                ease: [0.22, 1, 0.36, 1]
                            }}
                            whileHover={{ y: -8 }}
                            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                        >
                            {/* Imagem */}
                            <Link href={`/${post.slug}`}>
                                <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-2xl">
                                    <motion.div
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.6 }}
                                        className="w-full h-full"
                                    >
                                        <Image
                                            src={metadata.imagem_base?.url || "/images/fallback.png"}
                                            alt={metadata.titulo || post.title}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                    </motion.div>

                                    {/* Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                    {/* Badge */}
                                    <div className="absolute top-4 left-4 z-10">
                                        <CategoryBadge category={metadata.tipo_post || metadata.categoria} />
                                    </div>

                                    {/* Ícone de leitura */}
                                    <motion.div
                                        className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100"
                                        initial={{ scale: 0 }}
                                        whileHover={{ scale: 1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </motion.div>
                                </div>
                            </Link>

                            {/* Conteúdo */}
                            <div className="p-6 space-y-3">
                                {/* Título */}
                                <Link href={`/${post.slug}`}>
                                    <h3 className="text-xl font-primary font-bold text-secondary line-clamp-2 group-hover:text-accent transition-colors duration-300">
                                        {metadata.titulo || post.title}
                                    </h3>
                                </Link>

                                {/* Descrição */}
                                {metadata.descricao && (
                                    <div
                                        className="text-grey text-sm line-clamp-2 font-primary"
                                        dangerouslySetInnerHTML={{
                                            __html: metadata.descricao.substring(0, 100) + '...'
                                        }}
                                    />
                                )}

                                {/* Meta */}
                                <div className="flex items-center justify-between pt-3 border-t border-grey/10">
                                    <span className="text-xs text-grey font-primary">
                                        {metadata.autor || "Vibraventura"}
                                    </span>
                                    <span className="text-xs text-grey font-primary">
                                        {new Date(metadata.publicada_em).toLocaleDateString('pt-BR', {
                                            day: '2-digit',
                                            month: 'short'
                                        })}
                                    </span>
                                </div>

                                {/* Barra de progresso decorativa */}
                                <motion.div
                                    className={`h-1 bg-gradient-to-r ${config.gradient} rounded-full overflow-hidden`}
                                    initial={{ scaleX: 0 }}
                                    whileInView={{ scaleX: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                    style={{ originX: 0 }}
                                />
                            </div>

                            {/* Efeito de brilho */}
                            <div className={`absolute -right-10 -bottom-10 w-40 h-40 bg-gradient-to-br ${config.gradient} rounded-full blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                        </motion.div>
                    );
                })}
            </div>

            {/* Botão ver todos */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center mt-12"
            >
                <Link href="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="inline-flex items-center gap-3 bg-gradient-to-r from-accent to-accent-hover text-white font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                    >
                        Ver todas as aventuras
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
                    </motion.button>
                </Link>
            </motion.div>
        </div>
    );
}