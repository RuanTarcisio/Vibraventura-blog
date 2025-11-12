'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaEnvelope, FaPhone, FaWhatsapp, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function ContatoPage() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    assunto: '',
    mensagem: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setMessageType('');

    try {
      const res = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message || 'Mensagem enviada com sucesso!');
      setMessageType(res.ok ? 'success' : 'error');

      if (res.ok) {
        setForm({ nome: '', email: '', telefone: '', assunto: '', mensagem: '' });
      }
    } catch (error) {
      setMessage('Erro ao enviar mensagem. Tente novamente.');
      setMessageType('error');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: FaMapMarkerAlt,
      title: 'Localização',
      content: 'Salvador, Bahia, Brasil',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
    },
    {
      icon: FaEnvelope,
      title: 'Email',
      content: 'contato@vibraventura.com',
      color: 'text-sky',
      bgColor: 'bg-sky/10',
      link: 'mailto:contato@vibraventura.com'
    },
    {
      icon: FaPhone,
      title: 'Telefone',
      content: '(71) 99226-6662',
      color: 'text-tertiary',
      bgColor: 'bg-tertiary/10',
      link: 'tel:+5571992266662'
    },
  ];

  const socialLinks = [
    {
      icon: FaWhatsapp,
      name: 'WhatsApp',
      link: 'https://wa.me/5571992266662',
      color: 'hover:text-green-500',
      bg: 'hover:bg-green-500'
    },
    {
      icon: FaInstagram,
      name: 'Instagram',
      link: 'https://www.instagram.com/vibraventuraoficial/',
      color: 'hover:text-pink-500',
      bg: 'hover:bg-pink-500'
    },
    {
      icon: FaLinkedin,
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/company/vibraventura/',
      color: 'hover:text-blue-500',
      bg: 'hover:bg-blue-500'
    },
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
            className="text-center max-w-3xl mx-auto"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-6"
            >
              📧
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-primary font-bold text-white mb-6 leading-tight">
              Entre em Contato
            </h1>

            <p className="text-lg sm:text-xl text-white/90 font-primary leading-relaxed">
              Estamos prontos para transformar suas ideias em aventuras inesquecíveis!
            </p>
          </motion.div>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">

            {/* Formulário de Contato */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
                <h2 className="text-3xl font-primary font-bold text-secondary mb-6">
                  Envie sua Mensagem
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nome */}
                  <div>
                    <label className="block text-sm font-secondary font-bold text-secondary mb-2 uppercase tracking-wider">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      name="nome"
                      value={form.nome}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-grey/20 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all font-primary"
                      placeholder="Seu nome"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-secondary font-bold text-secondary mb-2 uppercase tracking-wider">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-grey/20 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all font-primary"
                      placeholder="seu@email.com"
                    />
                  </div>

                  {/* Telefone */}
                  <div>
                    <label className="block text-sm font-secondary font-bold text-secondary mb-2 uppercase tracking-wider">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      name="telefone"
                      value={form.telefone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg border-2 border-grey/20 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all font-primary"
                      placeholder="(00) 00000-0000"
                    />
                  </div>

                  {/* Assunto */}
                  <div>
                    <label className="block text-sm font-secondary font-bold text-secondary mb-2 uppercase tracking-wider">
                      Assunto *
                    </label>
                    <select
                      name="assunto"
                      value={form.assunto}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border-2 border-grey/20 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all font-primary"
                    >
                      <option value="">Selecione um assunto</option>
                      <option value="duvida">Dúvida Geral</option>
                      <option value="parceria">Parceria</option>
                      <option value="suporte">Suporte</option>
                      <option value="feedback">Feedback</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>

                  {/* Mensagem */}
                  <div>
                    <label className="block text-sm font-secondary font-bold text-secondary mb-2 uppercase tracking-wider">
                      Mensagem *
                    </label>
                    <textarea
                      name="mensagem"
                      value={form.mensagem}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border-2 border-grey/20 focus:border-accent focus:ring-4 focus:ring-accent/20 outline-none transition-all resize-none font-primary"
                      placeholder="Conte-nos sobre sua aventura..."
                    />
                  </div>

                  {/* Botão */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-accent to-accent-hover text-white font-secondary font-bold uppercase tracking-wider py-4 rounded-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  >
                    {loading ? 'Enviando...' : 'Enviar Mensagem'}
                  </motion.button>

                  {/* Mensagem de feedback */}
                  {message && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${messageType === 'success'
                          ? 'bg-green-500/20 border border-green-500/30 text-green-700'
                          : 'bg-red-500/20 border border-red-500/30 text-red-700'
                        }`}
                    >
                      <p className="font-primary text-sm text-center">{message}</p>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>

            {/* Informações de Contato */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-primary font-bold text-secondary mb-6">
                  Informações de Contato
                </h2>

                <div className="space-y-4">
                  {contactInfo.map((item, index) => {
                    const Icon = item.icon;
                    const content = item.link ? (
                      <a href={item.link} className="hover:underline">
                        {item.content}
                      </a>
                    ) : (
                      item.content
                    );

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5 }}
                        className="flex items-start gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                      >
                        <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`text-xl ${item.color}`} />
                        </div>
                        <div>
                          <h3 className="font-secondary font-bold text-secondary mb-1">
                            {item.title}
                          </h3>
                          <p className="text-grey font-primary">
                            {content}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              {/* Redes Sociais */}
              <div>
                <h3 className="text-2xl font-primary font-bold text-secondary mb-6">
                  Siga-nos nas Redes
                </h3>

                <div className="flex gap-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <motion.a
                        key={index}
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-14 h-14 rounded-xl bg-white shadow-md flex items-center justify-center text-grey ${social.color} ${social.bg} hover:text-white transition-all`}
                        aria-label={social.name}
                      >
                        <Icon className="text-2xl" />
                      </motion.a>
                    );
                  })}
                </div>
              </div>

              {/* Horário de Atendimento */}
              <div className="bg-gradient-to-br from-accent/10 to-tertiary/10 rounded-2xl p-6 border border-accent/20">
                <h3 className="text-xl font-primary font-bold text-secondary mb-4 flex items-center gap-2">
                  🕐 Horário de Atendimento
                </h3>
                <div className="space-y-2 font-primary text-grey">
                  <p><strong>Segunda a Sexta:</strong> 9h às 18h</p>
                  <p><strong>Sábado:</strong> 9h às 13h</p>
                  <p><strong>Domingo:</strong> Fechado</p>
                </div>
              </div>

              {/* CTA */}
              <div className="bg-gradient-to-r from-secondary to-accent rounded-2xl p-6 text-white">
                <h3 className="text-xl font-primary font-bold mb-2">
                  Prefere conversar diretamente?
                </h3>
                <p className="mb-4 font-primary text-sm text-white/90">
                  Fale conosco pelo WhatsApp e tire suas dúvidas em tempo real!
                </p>
                <a
                  href="https://wa.me/5571992266662"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white text-secondary font-secondary font-bold uppercase tracking-wider px-6 py-3 rounded-lg hover:scale-105 transition-all shadow-lg"
                >
                  <FaWhatsapp className="text-xl" />
                  Chamar no WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}