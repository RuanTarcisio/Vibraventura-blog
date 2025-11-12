// // app/[slug]/page.tsx
// import { getPostBySlug, getBlogPosts } from "@/app/lib/cosmic";
// import RelatedPosts from "@/components/RelatedPosts";
// import CategoryBadge from "@/components/CategoryBadge";
// import Image from "next/image";

// export default async function PostPage({
//     params
// }: {
//     params: Promise<{ slug: string }>
// }) {
//     // AGUARDE os params primeiro - ESSENCIAL no Next.js 15
//     const { slug } = await params;

//     // Busque os dados
//     const [post, allPosts] = await Promise.all([
//         getPostBySlug(slug),
//         getBlogPosts()
//     ]);

//     // Verifique se o post existe
//     if (!post) {
//         return (
//             <div className="max-w-4xl mx-auto px-6 py-20 text-center">
//                 <h1 className="text-2xl font-bold text-gray-800">Post não encontrado</h1>
//                 <p className="text-gray-600 mt-4">O post "{slug}" não existe ou foi removido.</p>
//             </div>
//         );
//     }

//     // Filtra posts relacionados
//     const related = allPosts.filter(p => {
//         const sameCategory = p.metadata?.categoria === post.metadata?.categoria;
//         const notSamePost = p.slug !== post.slug;
//         const isPublished = p.metadata?.publicada !== false;

//         return sameCategory && notSamePost && isPublished;
//     }).slice(0, 3);

//     return (
//         <article className="max-w-4xl mx-auto px-6 py-10">
//             {/* Categoria */}
//             <CategoryBadge category={post.metadata?.tipo_post || post.metadata?.categoria} />

//             {/* Título */}
//             <h1 className="text-3xl font-bold mb-4 mt-4">
//                 {post.metadata?.titulo || post.title}
//             </h1>

//             {/* Metadados */}
//             <div className="flex items-center gap-4 text-gray-500 mb-6">
//                 {post.metadata?.autor && (
//                     <span>Por {post.metadata.autor}</span>
//                 )}
//                 {post.metadata?.publicada_em && (
//                     <span>• {new Date(post.metadata.publicada_em).toLocaleDateString('pt-BR')}</span>
//                 )}
//             </div>

//             {/* Imagem principal */}
//             <div className="relative w-full h-96 mb-8 rounded-xl overflow-hidden">
//                 <Image
//                     src={post.metadata?.imagem_base?.url || "/images/fallback.png"}
//                     alt={post.metadata?.titulo || post.title}
//                     fill
//                     className="object-cover"
//                     priority
//                 />
//             </div>

//             {/* Conteúdo */}
//             {post.metadata?.conteudo ? (
//                 <div
//                     className="prose prose-lg max-w-none prose-headings:text-gray-800 prose-p:text-gray-600 prose-a:text-green-600"
//                     dangerouslySetInnerHTML={{ __html: post.metadata.conteudo }}
//                 />
//             ) : (
//                 <div className="text-center py-10">
//                     <p className="text-gray-500">Conteúdo em breve...</p>
//                 </div>
//             )}

//             {/* Tags */}
//             {post.metadata?.tags && (
//                 <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t">
//                     {post.metadata.tags.split(',').map((tag: string) => (
//                         <span
//                             key={tag.trim()}
//                             className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
//                         >
//                             #{tag.trim()}
//                         </span>
//                     ))}
//                 </div>
//             )}

//             {/* Posts relacionados */}
//             {related.length > 0 && <RelatedPosts posts={related} />}
//         </article>
//     );
// }


// // import { cosmic } from "@/lib/cosmic"
// // import Image from "next/image"
// // import { notFound } from "next/navigation"

// // export const revalidate = 60

// // export default async function PostPage({ params }: { params: { slug: string } }) {
// //     const { slug } = params
// //     const { object: post } = await cosmic.objects
// //         .findOne({ type: "posts", slug })
// //         .props("title,metadata,slug")

// //     if (!post) return notFound()

// //     return (
// //         <article className="max-w-3xl mx-auto px-4 py-12 prose prose-emerald">
// //             <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
// //             {post.metadata.cover_image && (
// //                 <Image
// //                     src={post.metadata.cover_image.imgix_url}
// //                     alt={post.title}
// //                     width={800}
// //                     height={500}
// //                     className="rounded-2xl mb-6 object-cover w-full"
// //                 />
// //             )}
// //             <div
// //                 className="prose max-w-none"
// //                 dangerouslySetInnerHTML={{ __html: post.metadata.content }}
// //             />
// //             <hr className="my-8" />
// //             <p className="text-sm text-gray-500">
// //                 Publicado em {new Date(post.created_at).toLocaleDateString("pt-BR")}
// //             </p>
// //         </article>
// //     )
// // }


import { getPostBySlug, getBlogPosts } from "@/app/lib/cosmic";
import PostPageClient from "@/components/PostPageClient";

export default async function PostPage({
    params
}: {
    params: Promise<{ slug: string }>
}) {
    // Aguarda os params
    const { slug } = await params;

    // Busca os dados
    const [post, allPosts] = await Promise.all([
        getPostBySlug(slug),
        getBlogPosts()
    ]);

    // Verifica se o post existe
    <div className=""></div>
    if (!post) {
        return (
            <div className="max-w-4xl mx-auto px-6 py-20 text-center mt-20 h-[vh-80]">
                <h1 className="text-2xl font-bold text-secondary font-primary">
                    Post não encontrado
                </h1>
                <p className="text-grey font-primary mt-4">
                    O post "{slug}" não existe ou foi removido.
                </p>
            </div>
        );
    }

    // Filtra posts relacionados
    const related = allPosts.filter(p => {
        const sameCategory = p.metadata?.categoria === post.metadata?.categoria;
        const notSamePost = p.slug !== post.slug;
        const isPublished = p.metadata?.publicada !== false;

        return sameCategory && notSamePost && isPublished;
    }).slice(0, 3);

    // Passa os dados para o componente cliente
    return <PostPageClient post={post} related={related} />;
}