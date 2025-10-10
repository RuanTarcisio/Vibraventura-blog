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
    <header className="fixed  left-0 right-0 z-10">
      <div className="container mx-auto h-full border-b border-white/10 py-4 xl:py-6">
        <div className="flex justify-between items-center h-full">
          {/* logo */}
          <Link href={"/"}>
            <Image
              src={"/assets/header/logo2.png"}
              width={70}
              height={70}
              alt=""
            />
          </Link>
          <div className="flex gap-[26px] items-center ">
            <Nav />
            <div
              onClick={() => handleCartClick()}
              className="relative cursor-pointer"
            >
              <CgShoppingBag className="text-[26px]" />
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
