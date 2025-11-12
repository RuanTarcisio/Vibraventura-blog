'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import CategoryBadge from '@/components/CategoryBadge';
import RelatedPosts from '@/components/RelatedPosts';
import { getCategoryConfig } from '@/app/lib/design-system';

export default function PostPageClient({ post, related }: { post: any; related: any[] }) {
    const [readProgress, setReadProgress] = useState(0);
    const config = getCategoryConfig(post.metadata?.tipo_post || post.metadata?.categoria);

    // Progresso de leitura
    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;
            const trackLength = documentHeight - windowHeight;
            const progress = (scrollTop / trackLength) * 100;
            setReadProgress(Math.min(progress, 100));
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    if (!post) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center">
                <h1 className="text-2xl font-bold text-secondary">Post não encontrado</h1>
            </div>
        );
    }

    const metadata = post.metadata || {};

    return (
        <>
            {/* Barra de progresso de leitura */}
            <motion.div
                className={`fixed top-0 left-0 right-0 h-1 bg-gradient-to-r ${config.gradient} z-50`}
                style={{
                    scaleX: readProgress / 100,
                    transformOrigin: 'left'
                }}
            />

            {/* Espaçamento para o header fixo */}
            <div className="h-20 lg:h-24" />

            {/* Container principal */}
            <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">

                {/* Breadcrumb */}
                <motion.nav
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-sm text-grey mb-6 flex-wrap"
                >
                    <Link href="/" className="hover:text-accent transition-colors">
                        Home
                    </Link>
                    <span>→</span>
                    <Link href="/" className="hover:text-accent transition-colors">
                        Blog
                    </Link>
                    <span>→</span>
                    <span className="text-secondary font-medium">
                        {metadata.titulo || post.title}
                    </span>
                </motion.nav>

                {/* Header do post */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-8"
                >
                    {/* Badge de categoria */}
                    <div className="mb-6">
                        <CategoryBadge category={metadata.tipo_post || metadata.categoria} />
                    </div>

                    {/* Título */}
                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-primary font-bold text-secondary leading-tight mb-6">
                        {metadata.titulo || post.title}
                    </h1>

                    {/* Meta informações */}
                    <div className="flex flex-wrap items-center gap-4 lg:gap-6 text-grey">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-accent via-tertiary to-secondary flex items-center justify-center text-white font-bold font-secondary text-sm lg:text-base shadow-md">
                                {(metadata.autor || "V")[0].toUpperCase()}
                            </div>
                            <div>
                                <p className="font-secondary font-bold text-secondary text-sm lg:text-base">
                                    {metadata.autor || "Vibraventura"}
                                </p>
                                <p className="text-xs lg:text-sm">
                                    {new Date(metadata.publicada_em).toLocaleDateString('pt-BR', {
                                        day: '2-digit',
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>

                        <div className="hidden sm:block w-px h-10 bg-grey/20" />

                        <div className="flex items-center gap-2 text-sm lg:text-base">
                            <svg className="w-4 h-4 lg:w-5 lg:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>5 min de leitura</span>
                        </div>
                    </div>
                </motion.header>

                {/* Imagem de destaque */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="relative w-full rounded-2xl overflow-hidden shadow-2xl mb-12"
                >
                    <Image
                        src={metadata.imagem_base?.url || "/images/fallback.png"}
                        alt={metadata.titulo || post.title}
                        width={1200}
                        height={800}
                        className="w-full h-auto"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                        priority
                    />

                    {/* Overlay gradiente sutil */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none" />
                </motion.div>

                {/* Descrição em destaque */}
                {metadata.descricao && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mb-12 pb-8 border-b-2 border-grey/10"
                    >
                        <div
                            className="text-lg sm:text-xl lg:text-2xl font-primary leading-relaxed text-secondary/80"
                            style={{
                                wordBreak: 'break-word',
                                overflowWrap: 'break-word'
                            }}
                            dangerouslySetInnerHTML={{ __html: metadata.descricao }}
                        />
                    </motion.div>
                )}

                {/* Conteúdo principal */}
                {metadata.conteudo ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="
                            prose prose-base sm:prose-lg lg:prose-xl
                            max-w-none
                            
                            prose-headings:font-primary 
                            prose-headings:font-bold 
                            prose-headings:text-secondary
                            prose-headings:break-words
                            
                            prose-h2:text-2xl sm:prose-h2:text-3xl lg:prose-h2:text-4xl
                            prose-h2:mt-12 
                            prose-h2:mb-6
                            
                            prose-h3:text-xl sm:prose-h3:text-2xl lg:prose-h3:text-3xl
                            prose-h3:mt-8 
                            prose-h3:mb-4
                            
                            prose-p:font-primary 
                            prose-p:text-grey 
                            prose-p:leading-relaxed 
                            prose-p:mb-6
                            prose-p:break-words
                            
                            prose-a:text-accent 
                            prose-a:font-semibold 
                            prose-a:no-underline 
                            prose-a:break-words
                            hover:prose-a:underline
                            
                            prose-strong:text-secondary 
                            prose-strong:font-bold
                            
                            prose-ul:my-6 
                            prose-ul:pl-6
                            prose-ol:my-6
                            prose-ol:pl-6
                            prose-li:my-2 
                            prose-li:text-grey
                            prose-li:break-words
                            
                            prose-img:rounded-xl 
                            prose-img:shadow-lg 
                            prose-img:my-8
                            prose-img:w-full
                            prose-img:h-auto
                            
                            prose-blockquote:border-l-4 
                            prose-blockquote:border-accent 
                            prose-blockquote:pl-6 
                            prose-blockquote:italic 
                            prose-blockquote:text-grey/80
                            prose-blockquote:my-8
                            prose-blockquote:break-words
                            
                            prose-code:text-accent
                            prose-code:bg-accent/10
                            prose-code:px-2
                            prose-code:py-1
                            prose-code:rounded
                            prose-code:text-sm
                            prose-code:break-words
                            
                            prose-pre:bg-secondary/5
                            prose-pre:border
                            prose-pre:border-grey/20
                            prose-pre:rounded-xl
                            prose-pre:p-4
                            prose-pre:my-6
                            prose-pre:overflow-x-auto
                        "
                        style={{
                            wordBreak: 'break-word',
                            overflowWrap: 'break-word',
                            width: '100%',
                            maxWidth: '100%'
                        }}
                        dangerouslySetInnerHTML={{ __html: metadata.conteudo }}
                    />
                ) : (
                    <div className="text-center py-20 bg-grey/5 rounded-2xl">
                        <div className="text-6xl mb-4">📝</div>
                        <p className="text-grey font-primary text-lg">Conteúdo em breve...</p>
                    </div>
                )}

                {/* Tags */}
                {metadata.tags && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="flex flex-wrap items-center gap-3 mt-16 pt-8 border-t border-grey/20"
                    >
                        <span className="text-sm font-secondary text-grey uppercase tracking-wider font-bold">
                            Tags:
                        </span>
                        {metadata.tags.split(',').map((tag: string) => (
                            <motion.span
                                key={tag.trim()}
                                whileHover={{ scale: 1.05, y: -2 }}
                                className="text-xs sm:text-sm font-secondary bg-gradient-to-r from-accent/10 to-tertiary/10 text-accent px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-accent/20 hover:border-accent/40 hover:shadow-lg transition-all cursor-default"
                            >
                                #{tag.trim()}
                            </motion.span>
                        ))}
                    </motion.div>
                )}

                {/* Compartilhar */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-12 p-6 sm:p-8 bg-gradient-to-r from-accent/5 to-tertiary/5 rounded-2xl border border-accent/10"
                >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl sm:text-2xl font-primary font-bold text-secondary mb-2">
                                Gostou desta aventura?
                            </h3>
                            <p className="text-grey font-primary text-sm sm:text-base">
                                Compartilhe com seus amigos!
                            </p>
                        </div>
                        <div className="flex gap-3">
                            {/* Facebook */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                                aria-label="Compartilhar no Facebook"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </motion.button>

                            {/* Twitter */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${window.location.href}&text=${metadata.titulo}`, '_blank')}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-sky to-blue-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                                aria-label="Compartilhar no Twitter"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                </svg>
                            </motion.button>

                            {/* WhatsApp */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => window.open(`https://wa.me/?text=${metadata.titulo} ${window.location.href}`, '_blank')}
                                className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                                aria-label="Compartilhar no WhatsApp"
                            >
                                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                                </svg>
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </article>

            {/* Posts relacionados */}
            {related && related.length > 0 && (
                <section className="bg-grey/5 py-16 lg:py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <RelatedPosts posts={related} />
                    </div>
                </section>
            )}

            {/* CTA Footer */}
            <section className="bg-gradient-to-r from-secondary via-tertiary to-accent py-16 lg:py-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="text-5xl sm:text-6xl mb-6">🌟</div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-primary font-bold text-white mb-4 leading-tight">
                            Pronto para sua aventura?
                        </h2>
                        <p className="text-white/90 font-primary text-base sm:text-lg lg:text-xl mb-8 max-w-2xl mx-auto">
                            Explore nosso marketplace e reserve experiências incríveis!
                        </p>
                        <Link href="/">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="bg-white text-secondary font-secondary font-bold uppercase tracking-wider px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all text-sm sm:text-base"
                            >
                                Ver mais aventuras
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    );
}