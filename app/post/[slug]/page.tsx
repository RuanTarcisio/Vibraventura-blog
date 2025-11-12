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