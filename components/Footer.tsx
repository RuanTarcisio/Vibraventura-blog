"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaYoutube,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from "react-icons/fa";

const socials = [
  { icon: FaLinkedin, path: "https://www.linkedin.com/in/ruan-tarcisio/", name: "LinkedIn" },
  { icon: FaInstagram, path: "https://www.instagram.com/dev.correria/", name: "Instagram" },
  { icon: FaWhatsapp, path: "https://wa.me/5571992266662", name: "WhatsApp" },
  { icon: FaYoutube, path: "https://youtube.com/@vibraventuraoficial", name: "YouTube" },
];

const Footer = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message);
      setMessageType(res.ok ? "success" : "error");
      if (res.ok) setEmail("");
    } catch {
      setMessage("Erro ao cadastrar. Tente novamente.");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-vibra-bg text-vibra-text/80 border-t border-vibra-forest-light/30">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 py-16">

          {/* Coluna 1: Logo e Descrição */}
          <div className="space-y-6">
            <Link href="/" className="inline-block">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="relative w-32 h-32"
              >
                <Image
                  src="/assets/footer/logo2.png"
                  fill
                  alt="Vibraventura"
                  className="object-contain"
                />
              </motion.div>
            </Link>

            <p className="text-vibra-text/70 leading-relaxed">
              Conectando aventureiros aos melhores destinos e experiências de Salvador e Bahia.
            </p>

            {/* Redes Sociais */}
            <div>
              <p className="text-sm font-semibold text-vibra-yellow mb-3">Siga-nos</p>
              <div className="flex gap-3">
                {socials.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-10 h-10 rounded-lg bg-vibra-bg/50 backdrop-blur-sm flex items-center justify-center text-vibra-text/70 border border-vibra-forest-light/30 hover:bg-vibra-orange/10 hover:border-vibra-orange hover:text-vibra-yellow transition-all duration-300"
                      aria-label={social.name}
                    >
                      <Icon size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Coluna 2: Links Rápidos */}
          <div>
            <h3 className="text-vibra-text font-bold text-lg mb-6 bg-gradient-to-r from-vibra-yellow to-vibra-orange bg-clip-text text-transparent">
              Links Rápidos
            </h3>
            <ul className="space-y-3">
              {["/", "https://vibraventura.com.br", "/sobre", "/contato"].map((href, i) => {
                const labels = ["Início", "Marketplace", "Sobre Nós", "Contato"];
                return (
                  <li key={i}>
                    <Link href={href} className="group hover:text-vibra-yellow transition-all flex items-center gap-2">
                      <motion.span
                        className="text-vibra-orange"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        →
                      </motion.span>
                      {labels[i]}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Coluna 3: Explore */}
          <div>
            <h3 className="text-vibra-text font-bold text-lg mb-6 bg-gradient-to-r from-vibra-turquesa to-vibra-yellow bg-clip-text text-transparent">
              Explore
            </h3>
            <ul className="space-y-3">
              {[
                { href: "/blog?categoria=praias", label: "Praias" },
                { href: "/blog?categoria=gastronomia", label: "Gastronomia" },
                { href: "/blog?categoria=cultura", label: "Cultura" },
                { href: "/blog?categoria=eventos", label: "Eventos" },
                { href: "/marketplace", label: "Experiências" },
              ].map((item, i) => (
                <li key={i}>
                  <Link href={item.href} className="group hover:text-vibra-turquesa transition-all flex items-center gap-2">
                    <motion.span
                      className="text-vibra-turquesa"
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      →
                    </motion.span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Coluna 4: Newsletter e Contato */}
          <div>
            <h3 className="text-vibra-text font-bold text-lg mb-6 bg-gradient-to-r from-vibra-yellow via-vibra-orange to-vibra-turquesa bg-clip-text text-transparent">
              Newsletter
            </h3>
            <p className="text-vibra-text/60 text-sm mb-4">
              Receba novidades, dicas e ofertas exclusivas toda semana.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="space-y-3 mb-6">
              <div className="relative">
                <input
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-vibra-bg border border-vibra-forest-light/50 focus:border-vibra-turquesa focus:outline-none focus:ring-2 focus:ring-vibra-turquesa/30 text-vibra-text placeholder:text-vibra-text/40 text-sm transition-all"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-4 py-3 bg-gradient-to-r from-vibra-orange to-vibra-yellow hover:from-vibra-yellow hover:to-vibra-orange text-vibra-bg font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm shadow-lg shadow-vibra-orange/20"
              >
                {loading ? "Cadastrando..." : "Inscrever-se"}
              </motion.button>
              {message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-3 rounded-lg text-xs ${messageType === "success"
                      ? "bg-vibra-turquesa/20 border border-vibra-turquesa/40 text-vibra-turquesa"
                      : "bg-red-500/20 border border-red-500/40 text-red-300"
                    }`}
                >
                  {message}
                </motion.div>
              )}
            </form>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-vibra-orange mt-1 flex-shrink-0" />
                <span className="text-vibra-text/70">Salvador, Bahia - Brasil</span>
              </div>
              <div className="flex items-center gap-3">
                <FaEnvelope className="text-vibra-turquesa flex-shrink-0" />
                <a href="mailto:contato@vibraventura.com.br" className="text-vibra-text/70 hover:text-vibra-turquesa transition-colors">
                  vibraventuraoficial@gmail.com.br
                </a>
              </div>
              <div className="flex items-center gap-3">
                <FaPhone className="text-vibra-yellow flex-shrink-0" />
                <a href="tel:+5571992266662" className="text-vibra-text/70 hover:text-vibra-yellow transition-colors">
                  (71) 99226-6662
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-vibra-forest-light/30 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-vibra-text/50 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Vibraventura. Todos os direitos reservados.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/privacidade" className="text-vibra-text/50 hover:text-vibra-turquesa transition-colors">
                Política de Privacidade
              </Link>
              <span className="text-vibra-text/30">•</span>
              <Link href="/termos" className="text-vibra-text/50 hover:text-vibra-turquesa transition-colors">
                Termos de Uso
              </Link>
              <span className="text-vibra-text/30">•</span>
              <Link href="/cookies" className="text-vibra-text/50 hover:text-vibra-turquesa transition-colors">
                Cookies
              </Link>
            </div>

            {/* CORAÇÃO AVENTUREIRO */}
            <div className="flex items-center gap-2 text-xs text-vibra-text/70">
              <span>Feito com</span>
              <motion.div className="relative">
                <motion.span
                  animate={{ scale: [1, 1.15, 1], rotate: [0, 5, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-vibra-yellow text-lg"
                >
                  Carinho
                </motion.span>
                <motion.div
                  className="absolute -inset-1 bg-vibra-yellow/20 rounded-full blur-md"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 0.3, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                />
              </motion.div>
              <span>em</span>
              <motion.span
                initial={{ x: -5, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="font-semibold text-vibra-turquesa"
              >
                Salvador
              </motion.span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;