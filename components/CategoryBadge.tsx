// 'use client';
// import { motion } from 'framer-motion';

// const categoryStyles = {
//     eventos: 'bg-green-100 text-green-800 border-green-200',
//     desenvolvimento: 'bg-blue-100 text-blue-800 border-blue-200',
//     colaboradores: 'bg-purple-100 text-purple-800 border-purple-200',
//     tecnologia: 'bg-orange-100 text-orange-800 border-orange-200',
//     default: 'bg-gray-100 text-gray-800 border-gray-200'
// };

// const categoryIcons = {
//     eventos: '🎪',
//     desenvolvimento: '📈',
//     colaboradores: '👥',
//     tecnologia: '💻',
//     default: '📝'
// };

// // Função para extrair o tipo da categoria
// function getCategoryType(category: any): string {
//     if (!category) return 'default';

//     // Se é uma string, retorna direto
//     if (typeof category === 'string') return category;

//     // Se é um objeto do Cosmic, pega o tipo do metadata
//     if (category.metadata?.tipo) return category.metadata.tipo;

//     // Se tem slug, tenta inferir do slug
//     if (category.slug) return category.slug;

//     return 'default';
// }

// export default function CategoryBadge({ category }: { category: any }) {
//     const categoryType = getCategoryType(category);
//     const style = categoryStyles[categoryType] || categoryStyles.default;
//     const icon = categoryIcons[categoryType] || categoryIcons.default;

//     return (
//         <motion.span
//             whileHover={{ scale: 1.05 }}
//             className={`inline-flex items-center gap-1 px-3 py-1 text-xs font-medium rounded-full border ${style}`}
//         >
//             {icon} {getCategoryName(categoryType)}
//         </motion.span>
//     );
// }

// function getCategoryName(categoryType: string) {
//     const names = {
//         eventos: 'Eventos',
//         desenvolvimento: 'Desenvolvimento',
//         colaboradores: 'Colaboradores',
//         tecnologia: 'Tecnologia'
//     };
//     return names[categoryType] || categoryType;
// }

'use client';
import { motion } from 'framer-motion';
import { getCategoryConfig } from '@/app/lib/design-system';

export default function CategoryBadge({ category }: { category: any }) {
    const config = getCategoryConfig(category);

    return (
        <motion.div
            whileHover={{ scale: 1.1, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
        >
            <div className={`
                relative overflow-hidden
                flex items-center gap-2 
                px-4 py-2 
                rounded-full 
                border-2 ${config.border}
                ${config.bg}
                backdrop-blur-sm
                shadow-lg
                group
                cursor-default
            `}>
                {/* Gradient animado no fundo */}
                <div className={`
                    absolute inset-0 
                    bg-gradient-to-r ${config.gradient}
                    opacity-0 group-hover:opacity-20
                    transition-opacity duration-500
                `} />

                {/* Ícone com animação de bounce */}
                <motion.span
                    className="text-lg"
                    animate={{
                        y: [0, -3, 0],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    {config.icon}
                </motion.span>

                {/* Texto */}
                <span className={`
                    ${config.text} 
                    font-secondary 
                    text-xs 
                    uppercase 
                    tracking-wider 
                    font-bold
                    relative
                `}>
                    {config.name}
                </span>

                {/* Brilho animado */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                        x: ['-100%', '200%'],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 2,
                    }}
                />
            </div>
        </motion.div>
    );
}