"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaLinkedin, FaInstagram, FaWhatsapp, FaGlobe, FaYoutube } from "react-icons/fa";

const socials = [
  {
    icon: FaLinkedin,
    path: "https://www.linkedin.com/in/ruan-tarcisio/",
    name: "LinkedIn",
    color: "hover:text-blue-500"
  },
  {
    icon: FaInstagram,
    path: "https://www.instagram.com/dev.correria/",
    name: "Instagram",
    color: "hover:text-pink-500"
  },
  {
    icon: FaWhatsapp,
    path: "https://wa.me/5571992266662",
    name: "WhatsApp",
    color: "hover:text-green-500"
  },
  {
    icon: FaGlobe,
    path: "https://devcorreria.com.br/",
    name: "Website",
    color: "hover:text-accent"
  },
  {
    icon: FaYoutube,
    path: "https://youtube.com/@vibraventuraoficial",
    name: "YouTube",
    color: "hover:text-red-500"
  },
];

const Footer = () => {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    telefone: "",
    mensagem: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState < "success" | "error" | "" > ("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setMessage(data.message);
      setMessageType(res.ok ? "success" : "error");

      if (res.ok) {
        setForm({ nome: "", email: "", telefone: "", mensagem: "" });
      }
    } catch (error) {
      setMessage("Erro ao enviar mensagem. Tente novamente.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-secondary via-tertiary to-accent bg-pattern bg-cover bg-blend-multiply overflow-hidden">
      {/* Decoração de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto relative z-10 pt-20 pb-8">

        {/* Seção principal - Newsletter */}
        <div className="border-b border-white/20 pb-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center px-6"
          >
            {/* Header */}
            <div className="mb-10">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-6xl mb-4"
              >
                🎒
              </motion.div>

              <h2 className="text-4xl md:text-5xl font-primary font-bold text-white mb-4 leading-tight">
                Vibre conosco nessa<br className="hidden sm:block" /> aventura!
              </h2>

              <p className="text-white/90 font-primary text-lg">
                Junte-se à nossa lista para atualizações exclusivas, dicas de viagem e histórias inspiradoras.
              </p>
            </div>

            {/* Formulário */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Nome */}
              <motion.input
                whileFocus={{ scale: 1.02 }}
                name="nome"
                type="text"
                placeholder="Seu nome completo"
                value={form.nome}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl outline-none placeholder:text-grey/60 text-secondary font-primary text-base shadow-lg focus:shadow-2xl focus:ring-4 focus:ring-white/30 transition-all"
              />

              {/* Email */}
              <motion.input
                whileFocus={{ scale: 1.02 }}
                name="email"
                type="email"
                placeholder="seu@email.com"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-6 py-4 rounded-xl outline-none placeholder:text-grey/60 text-secondary font-primary text-base shadow-lg focus:shadow-2xl focus:ring-4 focus:ring-white/30 transition-all"
              />

              {/* Telefone */}
              <motion.input
                whileFocus={{ scale: 1.02 }}
                name="telefone"
                type="tel"
                placeholder="(00) 00000-0000 (opcional)"
                value={form.telefone}
                onChange={handleChange}
                className="w-full px-6 py-4 rounded-xl outline-none placeholder:text-grey/60 text-secondary font-primary text-base shadow-lg focus:shadow-2xl focus:ring-4 focus:ring-white/30 transition-all"
              />

              {/* Mensagem */}
              <motion.textarea
                whileFocus={{ scale: 1.02 }}
                name="mensagem"
                placeholder="Deixe sua mensagem... (opcional)"
                value={form.mensagem}
                onChange={handleChange}
                rows={5}
                className="w-full px-6 py-4 rounded-xl outline-none placeholder:text-grey/60 text-secondary font-primary text-base shadow-lg focus:shadow-2xl focus:ring-4 focus:ring-white/30 transition-all resize-none"
              />

              {/* Botão de envio */}
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={loading}
                className="w-full h-14 bg-white text-secondary font-secondary font-bold uppercase tracking-wider rounded-xl shadow-2xl hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed transition-all text-base"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    Enviar Mensagem
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </span>
                )}
              </motion.button>

              {/* Mensagem de feedback */}
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-xl ${messageType === "success"
                      ? "bg-green-500/20 border border-green-500/30 text-white"
                      : "bg-red-500/20 border border-red-500/30 text-white"
                    }`}
                >
                  <p className="font-primary text-sm text-center">{message}</p>
                </motion.div>
              )}
            </form>

            {/* Redes Sociais */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-12"
            >
              <p className="text-white/80 font-primary text-sm mb-6">
                Siga-nos nas redes sociais
              </p>

              <div className="flex gap-4 justify-center">
                {socials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className={`
                        w-12 h-12 rounded-full 
                        bg-white/10 backdrop-blur-sm 
                        flex items-center justify-center 
                        text-white ${social.color}
                        border border-white/20
                        hover:bg-white hover:border-white
                        transition-all duration-300
                        shadow-lg hover:shadow-2xl
                      `}
                      aria-label={social.name}
                    >
                      <Icon size={22} />
                    </motion.a>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Footer Bottom - Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 px-6">
            {/* Logo */}
            <Link href="/" className="group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="relative w-16 h-16 md:w-20 md:h-20"
              >
                <Image
                  src="/assets/footer/logo2.png"
                  fill
                  alt="Vibraventura"
                  className="object-contain"
                />

                {/* Efeito de brilho */}
                <div className="absolute inset-0 bg-white rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity" />
              </motion.div>
            </Link>

            {/* Links úteis */}
            <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm font-primary">
              <Link href="/" className="hover:text-white transition-colors">
                Início
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/blog" className="hover:text-white transition-colors">
                Blog
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/sobre" className="hover:text-white transition-colors">
                Sobre
              </Link>
              <span className="text-white/30">•</span>
              <Link href="/contato" className="hover:text-white transition-colors">
                Contato
              </Link>
            </div>

            {/* Copyright */}
            <p className="text-white/70 text-sm font-primary text-center md:text-right">
              © {new Date().getFullYear()} Vibraventura.<br className="md:hidden" />
              <span className="hidden md:inline"> </span>Todos os direitos reservados.
            </p>
          </div>

          {/* Badge "Feito com ❤️" */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8 pb-4"
          >
            <p className="text-white/60 text-xs font-primary">
              Feito com{" "}
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="inline-block text-red-400"
              >
                ❤️
              </motion.span>
              {" "}para aventureiros
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Ondas decorativas no topo */}
      <div className="absolute top-0 left-0 right-0 transform rotate-180">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="#F8F8F8"
            fillOpacity="0.1"
          />
        </svg>
      </div>
    </footer>
  );
};

export default Footer;