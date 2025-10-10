import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";

import { FaPlus, FaMinus, FaX } from "react-icons/fa6";

const CartItem = ({ item }) => {

  const { removeItem, incrementItem, decrementItem } = useShoppingCart();

  return (
    <div className="flex w-full justify-between mb-4 items-center h-[120px] border-b last-of-type:border-none">
      {/* image */}
      <div className="w-[120px] h-[120px] relative">
        <Image
          src={item.image}
          fill
          alt=""
          priority
          sizes="(max-width: 120px) 120px, 120px"
          className="object-contain"
        />
      </div>
      {/* name, price, qtd, remove */}
      <div className="w-full max-w-[180px] flex flex-col justify-center gap-4">
        <div className="flex items-center justify-between">
          <h5 className="text-black">{item.name}</h5>
          <button className="" onClick={() => removeItem(item.id)}>
            <FaX className="text-black text-sm" />
          </button>
        </div>
        {/* increment, decrement, item price */}
        <div className="flex items-center justify-between">
          <div className="flex gap-4">
            <button className="" onClick={() => decrementItem(item.id)}>
              <FaMinus className="text-black text-[10px]" />
            </button>
            <div className="text-black text-[14px] text-balance text-right font-semibold">{item.quantity}</div>
             <button className="" onClick={() => incrementItem(item.id)}>
              <FaPlus className="text-black text-[10px]" />
            </button>
          </div>
          <div className="text-black">R${item.price * item.quantity}</div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
