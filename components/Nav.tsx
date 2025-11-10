"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface NavProps {
  mobile?: boolean;
  onLinkClick?: () => void;
}

const links = [
  { path: "/", name: "Início", icon: "🏠" },
  { path: "/blog", name: "Blog", icon: "📝" },
  { path: "/sobre", name: "Sobre", icon: "ℹ️" },
  { path: "/contato", name: "Contato", icon: "📧" },
];

const Nav = ({ mobile = false, onLinkClick }: NavProps) => {
  const pathname = usePathname();

  if (mobile) {
    return (
      <nav className="flex flex-col space-y-2">
        {links.map((link, index) => {
          const isActive = pathname === link.path;

          return (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={link.path}
                onClick={onLinkClick}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl
                  font-primary font-medium text-base
                  transition-all duration-300
                  ${isActive
                    ? 'bg-gradient-to-r from-accent to-accent-hover text-white shadow-lg'
                    : 'text-secondary hover:bg-grey/5 hover:text-accent'
                  }
                `}
              >
                <span className="text-xl">{link.icon}</span>
                <span>{link.name}</span>

                {isActive && (
                  <motion.div
                    layoutId="mobile-indicator"
                    className="ml-auto w-2 h-2 bg-white rounded-full"
                  />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-2">
      {links.map((link) => {
        const isActive = pathname === link.path;

        return (
          <Link
            key={link.path}
            href={link.path}
            onClick={onLinkClick}
            className="relative group"
          >
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`
                px-4 py-2 rounded-lg
                font-primary font-medium text-sm
                transition-all duration-300
                ${isActive
                  ? 'text-accent'
                  : 'text-white/90 hover:text-white'
                }
              `}
            >
              <span className="flex items-center gap-2">
                <span className="text-base">{link.icon}</span>
                {link.name}
              </span>

              {/* Indicador ativo */}
              {isActive && (
                <motion.div
                  layoutId="desktop-indicator"
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-tertiary rounded-full"
                  transition={{ duration: 0.3 }}
                />
              )}

              {/* Hover effect */}
              {!isActive && (
                <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white/30 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              )}
            </motion.div>
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;