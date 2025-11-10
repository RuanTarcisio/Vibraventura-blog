// import { getBlogPosts } from "./lib/cosmic";
// import FeaturedPost from "@/components/FeaturedPost";
// import PostCard from "@/components/PostCard";
// import EmptyState from "@/components/EmptyState";

// export default async function HomePage() {
//     console.log('🏠 HomePage carregando...');

//     let posts = [];

//     try {
//         posts = await getBlogPosts();
//     } catch (error) {
//         console.error('Erro na HomePage:', error);
//     }

//     // Debug: ver que posts temos
//     console.log('📝 Posts recebidos:', posts.length);
//     posts.forEach(post => {
//         console.log('Post:', {
//             slug: post.slug,
//             title: post.title,
//             metadata: post.metadata
//         });
//     });

//     if (posts.length === 0) {
//         return <EmptyState />;
//     }

//     const featured = posts.find(post => post.metadata?.destaque === true);
//     const others = posts.filter(post => post.metadata?.destaque !== true);

//     return (
//         <main className="max-w-6xl mx-auto px-6 py-10">
//             <h1 className="text-4xl font-bold text-center mb-12">Blog Vibraventura</h1>

//             {featured && <FeaturedPost post={featured} />}

//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
//                 {others.map((post) => (
//                     <PostCard key={post.slug} post={post} />
//                 ))}
//             </div>
//         </main>
//     );
// }


// // // components
// // import Hero from "@/components/Hero";
// // import UpcomingEvents from "@/components/UpcomingEvents";
// // import RecommendedEvents from "@/components/RecommendedEvents";
// // import DownloadApp from "@/components/DownloadApp";
// // import ScrollIndicator from "@/components/ScrollIndicator";

// // const Home = () => {

// //   return (
// //     <div className="h-full">
// //       <ScrollIndicator />
// //       <Hero />
// //       <div className="flex flex-col justify-center items-center"></div>
     
// //         <div>
// //           <div className="container mx-auto">
// //             {/* upcoming events slider */}
// //             <UpcomingEvents />
// //             {/* download app section */}
// //             {/* <DownloadApp /> */}
// //             {/* recomended events slider*/}
// //             {/* <RecommendedEvents /> */}
// //           </div>
// //         </div>
// //       )
// //     </div>
// //   );
// // };

// // export default Home;


import { getBlogPosts } from "./lib/cosmic";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import PostCard from "@/components/PostCard";
import EmptyState from "@/components/EmptyState";

export default async function HomePage() {
    console.log('🏠 HomePage carregando...');

    let posts = [];

    try {
        posts = await getBlogPosts();
    } catch (error) {
        console.error('Erro na HomePage:', error);
    }

    if (posts.length === 0) {
        return <EmptyState />;
    }

    // Pega todos os posts em destaque (ou os 3 primeiros se não houver nenhum em destaque)
    const featuredPosts = posts.filter(post => post.metadata?.destaque === true);
    const displayFeatured = featuredPosts.length > 0 ? featuredPosts : posts.slice(0, 3);

    // Posts que não estão em destaque
    const others = posts.filter(post => !displayFeatured.includes(post));

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-secondary via-tertiary to-accent">
                {/* Padrão de fundo animado */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Textura de mapa */}
                <div
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}
                />

                <div className="relative z-10 text-center px-6 py-20 max-w-5xl mx-auto mt-10">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full font-secondary text-sm font-bold uppercase tracking-wider mb-6 border border-white/30">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
                        </span>
                        Blog Oficial
                    </div>

                    {/* Título */}
                    <h1 className="text-5xl md:text-7xl font-primary font-bold text-white mb-6 leading-tight">
                        Vibraventura
                        <span className="block text-3xl md:text-5xl mt-2 bg-gradient-to-r from-white via-sky to-white bg-clip-text text-transparent">
                            Histórias de Aventura
                        </span>
                    </h1>

                    {/* Subtítulo */}
                    <p className="text-lg md:text-xl text-white/90 font-primary max-w-2xl mx-auto mb-8 leading-relaxed">
                        Explore destinos incríveis, descubra experiências únicas e inspire-se para sua próxima aventura! 🌍
                    </p>

                    {/* Estatísticas */}
                    <div className="flex flex-wrap justify-center gap-8 text-black">
                        <div className="text-center">
                            <div className="text-3xl font-bold font-secondary">{posts.length}+</div>
                            <div className="text-sm font-primary opacity-80">Aventuras</div>
                        </div>
                        <div className="w-px h-12 bg-white/30" />
                        <div className="text-center">
                            <div className="text-3xl font-bold font-secondary">
                                {new Set(posts.map(p => p.metadata?.categoria)).size}+
                            </div>
                            <div className="text-sm font-primary opacity-80">Categorias</div>
                        </div>
                        <div className="w-px h-12 bg-white/30" />
                        <div className="text-center">
                            <div className="text-3xl font-bold font-secondary">∞</div>
                            <div className="text-sm font-primary opacity-80">Inspiração</div>
                        </div>
                    </div>
                </div>

                {/* Ondas decorativas */}
                <div className="absolute bottom-0 left-0 right-0">
                    <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F8F8F8" />
                    </svg>
                </div>
            </section>

            {/* Conteúdo principal */}
            <main className="max-w-7xl mx-auto px-6 py-16">
                {/* Carrossel de posts em destaque */}
                {displayFeatured.length > 0 && (
                    <section className="mb-20">
                        <div className="text-center mb-8">
                            <h2 className="text-4xl font-primary font-bold text-secondary mb-3 inline-flex items-center gap-3">
                                <span className="text-3xl">⭐</span>
                                Aventuras em Destaque
                                <span className="text-3xl">⭐</span>
                            </h2>
                            <p className="text-grey font-primary text-lg mt-2">
                                As experiências mais incríveis selecionadas para você
                            </p>
                        </div>
                        <FeaturedCarousel posts={displayFeatured} />
                    </section>
                )}

                {/* Título da seção */}
                <div className="mb-12 text-center">
                    <h2 className="text-4xl font-primary font-bold text-secondary mb-4">
                        Mais Aventuras
                    </h2>
                    <div className="w-20 h-1 bg-gradient-to-r from-accent via-tertiary to-secondary mx-auto rounded-full" />
                </div>

                {/* Grid de posts */}
                {others.length > 0 ? (
                    <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {others.map((post, index) => (
                            <PostCard key={post.slug} post={post} index={index} />
                        ))}
                    </section>
                ) : (
                    <div className="text-center py-12">
                        <p className="text-grey font-primary text-lg">
                            Mais aventuras em breve! 🎒
                        </p>
                    </div>
                )}

                {/* CTA Section */}
                <section className="mt-20 relative overflow-hidden rounded-3xl bg-gradient-to-r from-secondary via-tertiary to-accent p-12 text-center">
                    {/* Decoração de fundo */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
                        <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
                    </div>

                    <div className="relative z-10">
                        <div className="text-6xl mb-4">🎒</div>
                        <h3 className="text-3xl font-primary font-bold text-white mb-4">
                            Pronto para sua próxima aventura?
                        </h3>
                        <p className="text-white/90 font-primary text-lg mb-8 max-w-2xl mx-auto">
                            Explore nosso marketplace e encontre experiências incríveis de turismo e atividades ao ar livre!
                        </p>
                        <a
                            href="https://vibraventura.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-white text-secondary font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:scale-105 hover:shadow-2xl transition-all duration-300"
                        >
                            Visitar Vibraventura
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                </section>
            </main>
        </>
    );
}