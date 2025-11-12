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