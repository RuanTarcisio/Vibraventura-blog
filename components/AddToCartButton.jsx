"use client"

import { useToast } from "@/hooks/use-toast";
import { FaCartPlus } from "react-icons/fa";
import { useShoppingCart } from "use-shopping-cart";

const AddToCartButton = ({
  name,
  currency,
  id,
  description,
  quantity,
  image,
  seat,
  price_id,
}) => {
  const { addItem } = useShoppingCart();
  const { toast } = useToast();

  const event = {
    id: price_id,
    currency: currency,
    name: name,
    description: description,
    quantity: quantity,
    image: image,
    price: seat.price,
    seat: seat.seat,
    id_item: id,
    currency: "BRL"
  };

  return (
    <button
      className="flex items-center p-5 md:p-0 text-center bg-green-500/10 gap-4 h-full rounded-full justify-center"
      onClick={() => {
        addItem(event);
        toast({
          title: `${name} Foi adicionado ao carrinho`,
        });
      }}
    >
      <div className="flex flex-row items-center gap-4">
        <FaCartPlus className="flex text-3xl ml-3" />
        <div className="flex">Adicionar ao Carrinho</div>
      </div>
    </button>
  );
};

export default AddToCartButton;
