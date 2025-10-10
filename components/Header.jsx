"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "./Nav";
import { CgShoppingBag } from "react-icons/cg";
import CartSidebar from "./CartSidebar";
import { useShoppingCart } from "use-shopping-cart";

{
  /*<button className="btn btn-tertiary">sign in</button>
            <button className="btn btn-accent">sign up</button> */
}
const Header = () => {
  {
    /*useShoppingCart */
  }
  const { cartCount, handleCartClick } = useShoppingCart();

  return (
    <header className="w-full absolute top-0 left-0 z-50 bg-transparent">
      <div className="container mx-auto h-full border-b border-white/20 py-4 xl:py-6">
        <div className="flex justify-between items-center h-full">
          {/* logo */}
          <Link href={"/"}>
            <Image
              src={"/assets/header/logo6.png"}
              width={80}
              height={80}
              alt=""
            />
          </Link>
          <div className="flex gap-[26px] items-center">
            <Nav />
            <div
              onClick={() => handleCartClick()}
              className="relative cursor-pointer"
            >
              <CgShoppingBag className="text-[26px] text-white" />
              <div className="bg-accent h-[18px] w-[18px] absolute -bottom-1 -right-1 rounded-full text-white flex items-center justify-center text-sm font-medium">
                {cartCount}
              </div>
            </div>
            <CartSidebar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
