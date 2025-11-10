// // components/EmptyState.jsx
// 'use client';

// import { motion } from 'framer-motion';

// export default function EmptyState() {
//     return (
//         <main className="max-w-4xl mx-auto px-6 py-20 text-center">
//             <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="space-y-6"
//             >
//                 <h1 className="text-4xl font-bold text-gray-800">
//                     Blog Vibraventura
//                 </h1>

//                 <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
//                     <p className="text-yellow-800 font-semibold">Configuração em Andamento</p>
//                     <p className="text-yellow-600 mt-2">
//                         Verifique as variáveis de ambiente no terminal do servidor.
//                     </p>
//                     <div className="mt-4 text-sm text-yellow-700 text-left">
//                         <p><strong>Verifique:</strong></p>
//                         <ul className="list-disc list-inside mt-2">
//                             <li>Arquivo .env.local na raiz do projeto</li>
//                             <li>Variáveis COSMIC_BUCKET_SLUG e COSMIC_READ_KEY</li>
//                             <li>Reinicie o servidor após alterar .env</li>
//                         </ul>
//                     </div>
//                 </div>
//             </motion.div>
//         </main>
//     );
// }

'use client';

import { motion } from 'framer-motion';

export default function EmptyState() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-primary via-sky/10 to-accent/10 flex items-center justify-center px-6 py-20">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl w-full"
            >
                {/* Card principal */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header com gradiente */}
                    <div className="relative bg-gradient-to-r from-secondary via-tertiary to-accent p-12 text-center">
                        {/* Decoração de fundo */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-0 left-1/4 w-60 h-60 bg-white rounded-full blur-3xl" />
                            <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-white rounded-full blur-3xl" />
                        </div>

                        {/* Logo/Ícone animado */}
                        <motion.div
                            animate={{
                                rotate: [0, 10, -10, 0],
                                scale: [1, 1.1, 1]
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="relative text-8xl mb-6"
                        >
                            🏕️
                        </motion.div>

                        <h1 className="text-4xl font-primary font-bold text-white mb-4 relative">
                            Blog Vibraventura
                        </h1>

                        <p className="text-white/90 font-primary text-lg relative">
                            Configuração em Andamento
                        </p>
                    </div>

                    {/* Conteúdo */}
                    <div className="p-8 space-y-6">
                        {/* Mensagem principal */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-gradient-to-r from-adventureOrange/10 to-accent/10 border-2 border-adventureOrange/20 rounded-2xl p-6"
                        >
                            <div className="flex items-start gap-4">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.2, 1],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                    }}
                                    className="text-3xl"
                                >
                                    ⚙️
                                </motion.div>
                                <div>
                                    <h3 className="font-secondary font-bold text-secondary text-lg mb-2">
                                        Estamos quase lá!
                                    </h3>
                                    <p className="text-grey font-primary">
                                        O blog está sendo configurado. Verifique as variáveis de ambiente no terminal do servidor.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Checklist */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="space-y-4"
                        >
                            <h4 className="font-secondary font-bold text-secondary text-lg flex items-center gap-2">
                                <span className="text-2xl">📋</span>
                                Checklist de Configuração
                            </h4>

                            <div className="space-y-3">
                                {[
                                    'Arquivo .env.local na raiz do projeto',
                                    'Variável COSMIC_BUCKET_SLUG configurada',
                                    'Variável COSMIC_READ_KEY configurada',
                                    'Servidor reiniciado após alterações'
                                ].map((item, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 + (index * 0.1) }}
                                        className="flex items-start gap-3 bg-grey/5 rounded-xl p-4 hover:bg-grey/10 transition-colors"
                                    >
                                        <motion.div
                                            animate={{ rotate: 360 }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                            className="mt-0.5"
                                        >
                                            <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                            </svg>
                                        </motion.div>
                                        <span className="text-grey font-primary text-sm flex-1">
                                            {item}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Código de exemplo */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="bg-secondary/5 rounded-2xl p-6 border border-secondary/10"
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xl">💻</span>
                                <h4 className="font-secondary font-bold text-secondary">
                                    Exemplo de .env.local
                                </h4>
                            </div>
                            <pre className="bg-secondary text-white p-4 rounded-xl overflow-x-auto font-mono text-sm">
                                {`COSMIC_BUCKET_SLUG=seu-bucket-slug
COSMIC_READ_KEY=sua-read-key`}
                            </pre>
                        </motion.div>

                        {/* Dica */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.9 }}
                            className="bg-gradient-to-r from-accent/10 to-tertiary/10 border border-accent/20 rounded-2xl p-6"
                        >
                            <div className="flex items-start gap-4">
                                <span className="text-3xl">💡</span>
                                <div>
                                    <h4 className="font-secondary font-bold text-secondary mb-2">
                                        Dica Importante
                                    </h4>
                                    <p className="text-grey font-primary text-sm">
                                        Após configurar as variáveis de ambiente, certifique-se de <strong className="text-accent">reiniciar o servidor</strong> com <code className="bg-secondary/10 px-2 py-1 rounded text-secondary">npm run dev</code> ou <code className="bg-secondary/10 px-2 py-1 rounded text-secondary">yarn dev</code>.
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Botão de ajuda */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="pt-6 text-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="inline-flex items-center gap-3 bg-gradient-to-r from-accent to-accent-hover text-white font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Documentação Cosmic CMS
                            </motion.button>
                        </motion.div>
                    </div>
                </div>

                {/* Animação de loading no rodapé */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.2 }}
                    className="mt-8 text-center"
                >
                    <div className="flex items-center justify-center gap-2 text-grey font-primary text-sm">
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                            </svg>
                        </motion.div>
                        Aguardando configuração...
                    </div>
                </motion.div>
            </motion.div>
        </main>
    );
}