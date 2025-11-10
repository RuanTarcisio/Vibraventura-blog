import { createBucketClient } from "@cosmicjs/sdk";

const bucket = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
  readKey: process.env.COSMIC_READ_KEY!,
});

// lib/cosmic.ts - atualize as props
export async function getBlogPosts() {
  try {
    console.log('📡 Buscando posts do Cosmic...');
    
    const data = await bucket.objects
      .find({ 
        type: "posts" 
      })
      .props(`
        slug,
        title,
        metadata,
        metadata.titulo,
        metadata.conteudo,
        metadata.descricao,
        metadata.imagem_base,
        metadata.categoria,
        metadata.tags,
        metadata.autor,
        metadata.publicada,
        metadata.publicada_em,
        metadata.destaque,
        metadata.tipo_post,
        metadata.tipo_post.slug,
        metadata.tipo_post.metadata.tipo
      `)
      .sort("-metadata.publicada_em")
      .limit(20);

    console.log('✅ Posts recebidos:', data.objects?.length || 0);
    return data.objects || [];
  } catch (error) {
    console.error('❌ Erro ao buscar posts:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    console.log('🔍 Buscando post por slug:', slug);
    
    const data = await bucket.objects
      .findOne({ 
        type: "posts", 
        slug 
      })
      .props(`
        slug,
        title,
        metadata,
        metadata.titulo,
        metadata.conteudo,
        metadata.descricao,
        metadata.imagem_base,
        metadata.categoria,
        metadata.tags,
        metadata.autor,
        metadata.publicada,
        metadata.publicada_em,
        metadata.destaque,
        metadata.tipo_post,
        metadata.tipo_post.slug,
        metadata.tipo_post.metadata.tipo
      `)
      .depth(1);

    console.log('✅ Post encontrado:', data.object ? 'Sim' : 'Não');
    return data.object;
  } catch (error) {
    console.error('❌ Erro ao buscar post:', error);
    return null;
  }
}


// import { createBucketClient } from '@cosmicjs/sdk'

// export const cosmic = createBucketClient({
//   bucketSlug: process.env.COSMIC_BUCKET_SLUG!,
//   readKey: process.env.COSMIC_READ_KEY!,
// })
