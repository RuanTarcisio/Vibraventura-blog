import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { name: "Home", path: "/" },
  { name: "Nossos Eventos", path: "/our-events" },
];

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex gap-[36px]">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${link.path === pathname && "text-accent"}`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
