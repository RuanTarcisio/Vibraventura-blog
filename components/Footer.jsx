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
];

const Footer = () => {
  return (
    <footer className="bg-accent bg-pattern bg-cover bg-blend-multiply pt-16">
      <div className="container mx-auto border-b border-white/40">
        {/* text & input form & socials */}
        <div className="flex flex-col max-w-[550px] mx-auto text-center">
          {/* text */}
          <div className="mb-9">
            <h2 className="h2 mb-3">Your Event Connection</h2>
            <p>Join our list for exclusice event updates and insider tips.</p>
          </div>
          {/* form */}
          <form className="relative flex items-center mb-16">
            <input
              type="text"
              placeholder="Your email address"
              className="pr-[130px] pl-8 w-full h-[60px] rounded-full outline-none placeholder:text-primary/80 text-primary text-sm"
            />
            <button className="bg-secondary hover:bg-secondary-hover transition-all w-[114px] h-[52px] rounded-full text-sm uppercase absolute right-1">
              Join
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
