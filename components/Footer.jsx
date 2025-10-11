"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const socials = [
 
  {
    src: "/assets/footer/linkedin.svg",
    path: "https://www.linkedin.com/in/ruan-tarcisio/",
  },
  {
    src: "/assets/footer/instagram2.svg",
    path: "https://www.instagram.com/dev.correria/",
  },
  {
    src: "/assets/footer/whatsapp.svg",
    path: "https://wa.me/5571992266662?text=Ol%C3%A1,%20gostaria%20de%20saber%20mais%20sobre%20seus%20servi%C3%A7os",
  },
  {
    src: "/assets/footer/internet1.svg",
    path: "https://devcorreria.vercel.app/",
  },
  {
    src: "/assets/footer/youtube.svg",
    path: "https://youtube.com/@vibraventuraoficial",
  },
];

const Footer = () => {

  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const res = await fetch("/api/sendEmail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setMessage(data.message);
    setLoading(false);
    setForm({ nome: "", email: "", telefone: "", mensagem: "" });
  }; 

  return (
    <footer className="bg-accent bg-pattern bg-cover bg-blend-multiply pt-16">
      <div className="container mx-auto border-b border-white/40">
        {/* text & input form & socials */}
        <div className="flex flex-col max-w-[550px] mx-auto text-center">
          {/* text */}
          <div className="mb-9">
            <h2 className="h2 mb-3">Vibre conosco nessa<br/> aventura</h2>
            <p>Junte-se à nossa lista para atualizações exclusivas.</p>
          </div>
          {/* form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
            <input
              name="nome"
              type="text"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
              required
              className="px-8 w-full h-[60px] rounded-full outline-none placeholder:text-gray/80 text-black text-sm"
            />
            <input
              name="email"
              type="email"
              placeholder="Seu melhor email"
              value={form.email}
              onChange={handleChange}
              required
              className="px-8 w-full h-[60px] rounded-full outline-none placeholder:text-gray/80 text-black text-sm"
            />
            <input
              name="telefone"
              type="text"
              placeholder="Seu telefone (opcional)"
              value={form.telefone}
              onChange={handleChange}
              className="px-8 w-full h-[60px] rounded-full outline-none placeholder:text-gray/80 text-black text-sm"
            />
            <textarea
              name="mensagem"
              placeholder="Nos deixe uma mensagem (opcional)"
              value={form.mensagem}
              onChange={handleChange}
              rows={6}
              className="w-full px-6 py-4 rounded-xl outline-none placeholder:text-gray-400 text-black text-sm shadow-sm focus:shadow-md focus:ring-2 focus:ring-secondary transition-all resize-none bg-white"
            />

            <button
              type="submit"
              disabled={loading}
              className="bg-secondary hover:bg-secondary-hover transition-all w-full h-[52px] rounded-full text-white font-semibold text-sm uppercase"
            >
              {loading ? "Enviado" : "Enviar"}
            </button>
          </form>
          {/* socials */}
          <div className="mb-[72px] flex gap-8 mx-auto">
            {socials.map((icon, index) => {
              return (
                <Link
                  href={icon.path}
                  key={index}
                  target="_blank"
                  className="relative w-[30px] h-[30px]"
                >
                  <Image src={icon.src} fill alt="" />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* copyright */}
      <div className="py-8 ">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            {/* logo */}
            <Link href="/" className="relative flex w-[78px] h-[78px]">
              <Image src="/assets/footer/logo2.png" fill alt="" />
            </Link>
            <p className="text-sm">
              Copyright &copy; 2025. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
