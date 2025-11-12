'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { FaRocket, FaUsers, FaHeart, FaGlobe, FaCheckCircle, FaAward } from 'react-icons/fa';

export default function SobrePage() {
  const values = [
    {
      icon: FaHeart,
      title: 'Paixão por Aventura',
      description: 'Vivemos e respiramos turismo. Cada experiência é pensada para criar memórias inesquecíveis.',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: FaUsers,
      title: 'Comunidade Vibrante',
      description: 'Conectamos aventureiros, profissionais e empresas em um ecossistema colaborativo.',
      color: 'text-sky',
      bgColor: 'bg-sky/10',
    },
    {
      icon: FaGlobe,
      title: 'Impacto Positivo',
      description: 'Promovemos turismo sustentável e responsável, valorizando cultura e natureza locais.',
      color: 'text-tertiary',
      bgColor: 'bg-tertiary/10',
    },
    {
      icon: FaRocket,
      title: 'Inovação Constante',
      description: 'Utilizamos tecnologia de ponta para facilitar a gestão e descoberta de experiências.',
      color: 'text-adventureOrange',
      bgColor: 'bg-adventureOrange/10',
    },
  ];

  const stats = [
    { number: '500+', label: 'Experiências', icon: '🎒' },
    { number: '1000+', label: 'Aventureiros', icon: '👥' },
    { number: '50+', label: 'Destinos', icon: '🌍' },
    { number: '100%', label: 'Satisfação', icon: '⭐' },
  ];

  const team = [
    {
      name: 'Equipe Vibraventura',
      role: 'Apaixonados por Aventura',
      description: 'Um time dedicado a transformar suas ideias em experiências inesquecíveis.',
      image: '/assets/team/team.jpg',
    },
  ];

  const features = [
    'Marketplace completo de turismo',
    'Gestão inteligente de atividades',
    'Ferramentas para profissionais',
    'Experiências verificadas',
    'Suporte dedicado',
    'Comunidade ativa',
  ];

  return (
    <>
      {/* Espaçamento para header fixo */}
      <div className="h-20 lg:h-24" />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-secondary via-tertiary to-accent py-20 lg:py-32 overflow-hidden">
        {/* Decoração de fundo */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              🏕️
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-primary font-bold text-white mb-6 leading-tight">
              Sobre o Vibraventura
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-white/90 font-primary leading-relaxed">
              Conectamos pessoas a experiências transformadoras de turismo e aventura
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nossa História */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-square">
                <Image
                  src="/assets/about/adventure.jpg"
                  alt="Vibraventura"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-primary font-bold text-secondary leading-tight">
                Nossa História
              </h2>

              <div className="space-y-4 text-grey font-primary text-base sm:text-lg leading-relaxed">
                <p>
                  O <strong className="text-secondary">Vibraventura</strong> nasceu da paixão por conectar pessoas a experiências autênticas de turismo e aventura. Acreditamos que cada viagem tem o poder de transformar vidas e criar memórias inesquecíveis.
                </p>

                <p>
                  Nosso marketplace reúne as melhores experiências de turismo, desde trilhas em montanhas até mergulhos em recifes de corais, passando por vivências culturais únicas e esportes radicais emocionantes.
                </p>

                <p>
                  Mais do que uma plataforma, somos uma <strong className="text-accent">comunidade vibrante</strong> de aventureiros, guias, operadores e entusiastas do turismo que compartilham a mesma paixão: explorar o mundo de forma consciente e significativa.
                </p>
              </div>

              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/contato"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-accent to-accent-hover text-white font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  Fale Conosco
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      {/* <section className="py-16 lg:py-24 bg-grey/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-primary font-bold text-secondary mb-4">
              Nossos Números
            </h2>
            <p className="text-grey font-primary text-lg">
              O impacto que estamos gerando
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all text-center"
              >
                <div className="text-4xl mb-3">{stat.icon}</div>
                <div className="text-3xl lg:text-4xl font-primary font-bold text-secondary mb-2">
                  {stat.number}
                </div>
                <div className="text-grey font-secondary text-sm uppercase tracking-wider font-bold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Nossos Valores */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-primary font-bold text-secondary mb-4">
              Nossos Valores
            </h2>
            <p className="text-grey font-primary text-lg max-w-2xl mx-auto">
              Os princípios que guiam cada decisão e ação no Vibraventura
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className={`w-16 h-16 rounded-xl ${value.bgColor} flex items-center justify-center mb-4`}>
                    <Icon className={`text-3xl ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-primary font-bold text-secondary mb-3">
                    {value.title}
                  </h3>
                  <p className="text-grey font-primary text-sm leading-relaxed">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* O que Oferecemos */}
      <section className="py-16 lg:py-24 bg-grey/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <h2 className="text-3xl sm:text-4xl font-primary font-bold text-secondary mb-6">
                O que Oferecemos
              </h2>

              <p className="text-grey font-primary text-lg mb-8 leading-relaxed">
                Uma plataforma completa que conecta aventureiros a experiências únicas e oferece ferramentas poderosas para profissionais do turismo.
              </p>

              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                      <FaCheckCircle className="text-white text-sm" />
                    </div>
                    <span className="text-secondary font-primary font-medium">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8"
              >
                <a
                  href="https://vibraventura.com.br"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary to-secondary-hover text-white font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                >
                  Explorar Marketplace
                  <FaRocket />
                </a>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
                <Image
                  src="/assets/about/platform.jpg"
                  alt="Plataforma Vibraventura"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-secondary via-tertiary to-accent rounded-3xl p-8 sm:p-12 lg:p-16 text-center relative overflow-hidden"
          >
            {/* Decoração */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl" />
              <div className="absolute bottom-10 right-10 w-60 h-60 bg-white rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
              <div className="text-6xl mb-6">🌟</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-primary font-bold text-white mb-6">
                Pronto para sua Aventura?
              </h2>
              <p className="text-lg sm:text-xl text-white/90 font-primary mb-8 max-w-2xl mx-auto">
                Junte-se a milhares de aventureiros e descubra experiências que vão transformar sua vida!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-white text-secondary font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:scale-105 transition-all shadow-lg"
                >
                  Ver Blog
                </Link>
                <Link
                  href="/contato"
                  className="inline-flex items-center justify-center gap-2 bg-white/20 backdrop-blur-sm text-white border-2 border-white font-secondary font-bold uppercase tracking-wider px-8 py-4 rounded-xl hover:bg-white hover:text-secondary transition-all"
                >
                  Fale Conosco
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}