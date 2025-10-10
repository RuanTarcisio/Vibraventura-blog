"use client";

import { useState, useContext } from "react";
import { TicketContext } from "@/contexts/TicketContext"; // Seu contexto de carrinho/ingresso
import { BiMinus, BiPlus } from "react-icons/bi";
import { HiTicket } from "react-icons/hi2"; // ou 'react-icons/hi' se for HiTicket
import AddToCartButton from "./AddToCartButton";
import CheckoutBtn from "./CheckoutBtn";

const BuyAndAddToCartButtons = ({ event }) => {
  // Nome do componente mais descritivo
  const {
    addItemToCart, // Função para adicionar item ao carrinho (backend)
    initiateCheckout, // Função para iniciar checkout (backend + PagSeguro/MercadoPago)
    cart, // O estado atual do carrinho (opcional, para exibir algo ou desabilitar botões)
    loading: cartLoading,
    decreaseAmount,
    increaseAmount,
    itemAmount,
    seat,
    handleAddToCart, // Estado de carregamento do carrinho do contexto
  } = useContext(TicketContext);

  //const [isLoadingAddToCart, setIsLoadingAddToCart] = useState(false); // Carregamento para Add to Cart
  const [isLoadingBuyNow, setIsLoadingBuyNow] = useState(false); // Carregamento para Buy Now

  // Lógica para aumentar e diminuir a quantidade selecionada localmente
  const handleIncreaseAmount = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseAmount = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 0));
  };

  // Handler para o botão "Adicionar ao Carrinho"
  const handleAddToCart1 = async () => {
    //setIsLoadingAddToCart(true);
    try {
      // Chama a função do contexto que interage com o backend para adicionar o item
      // event.id e quantity são passados. Seu backend deve gerenciar a lógica de adicionar.
      const success = await addItemToCart(event.id, itemAmount);
      if (success) {
        console.log(`Adicionado ${itemAmount}x ${event.title} ao carrinho!`);
        // Opcional: mostrar um toast/notificação aqui.
        // Opcional: resetar a quantidade para 1 ou manter a quantidade selecionada.
        // Se resetar: setQuantity(1);
      } else {
        console.error("Falha ao adicionar ao carrinho.");
        // Opcional: mostrar erro para o usuário.
      }
    } catch (err) {
      console.error("Erro durante a adição ao carrinho:", err);
    } finally {
      //setIsLoadingAddToCart(false);
    }
  };

  // Handler para o botão "Comprar Agora"
  const handleBuyNow = async () => {
    setIsLoadingBuyNow(true);
    try {
      // Chama a função do contexto que interage com o backend para iniciar o checkout.
      // Neste caso, você pode querer passar os itens que estão sendo comprados "agora"
      // para que o backend crie uma sessão de pagamento com apenas esses itens.
      // A função initiateCheckout deve saber como lidar com isso (ex: limpar o carrinho antes ou criar uma nova sessão).
      const success = await initiateCheckout([
        { id: event.id, quantity: quantity, price: event.price },
      ]);
      if (!success) {
        
        console.error("Falha ao iniciar o checkout.");
        // Opcional: mostrar erro para o usuário
      }
      // Se initiateCheckout redirecionar, o código abaixo não será executado imediatamente.
    } catch (err) {
      console.error("Erro durante o checkout direto:", err);
    } finally {
      setIsLoadingBuyNow(false);
      // Se o redirecionamento não acontecer por algum erro, o botão volta ao normal.
    }
  };

  // Calcule o preço total localmente para exibição nos botões
  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-4 items-center">
      {/* Controles de aumento/diminuição de quantidade */}
      <div className="w-[200px] md:w-[150px] flex items-center justify-between bg-secondary p-2 rounded-full h-[70px]">
        <div
          onClick={decreaseAmount}
          className="cursor-pointer bg-accent w-[24px] h-[24px] flex items-center justify-center select-none rounded-full"
        >
          <BiMinus className="text-lg" />
        </div>
        <div className="text-lg font-medium">{itemAmount}</div>{" "}
        {/* Exibe a quantidade */}
        <div
          onClick={increaseAmount}
          className="cursor-pointer bg-accent w-[24px] h-[24px] flex items-center justify-center select-none rounded-full"
        >
          <BiPlus className="text-lg" />
        </div>
      </div>

      {/* Botões de Ação */}
      <div className="flex flex-col md:flex-row gap-4  w-full justify-center h-full">
        {" "}
        {/* Container para os dois botões */}
        {/* Botão "Adicionar ao Carrinho" */}
        {/* <button
          onClick={handleAddToCart}
          className="bg-green-400/5 hover:bg-primary-hover transition-all p-4 rounded-full flex-1 flex items-center justify-center border-emerald-400" // Ajuste as classes Tailwind para cores e layout
          disabled={isLoadingAddToCart || isLoadingBuyNow || cartLoading} // Desabilita se qualquer ação estiver em andamento
        > */}
        <AddToCartButton
          name={event.title}
          id={event.id}
          currency="BRL"
          description={event.description}
          quantity={itemAmount}
          image={event.img_sm}
          seat={seat}
          price_id={event.price_id}
        />
        {/* {isLoadingAddToCart ? (
            <div className="">Adicionando...</div>
          ) : (
            
          )} */}
        {/* </button> */}
        {/* Botão "Comprar Agora" */}
        {/* <CheckoutBtn btnStyle={"bg-accent hover:bg-accent-hover transition-all p-4 rounded-full flex-1 flex items-center justify-center"} /> */}
        <button
          onClick={handleBuyNow}
          className="bg-accent hover:bg-accent-hover transition-all p-2 rounded-full flex-1 flex items-center justify-center" // Ajuste as classes Tailwind para cores e layout
          disabled={
            {
              /*isLoadingAddToCart*/
            } ||
            isLoadingBuyNow ||
            cartLoading
          }
        >
          {isLoadingBuyNow ? (
            <div className="">Processando...</div>
          ) : (
            <div className="flex items-center justify-between gap-4">
              <HiTicket className="text-3xl flex" />
              <div className="flex flex-col">
                <div className="flex">Comprar</div>
                <div className="flex">R$ {seat.price * itemAmount}</div>
              </div>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default BuyAndAddToCartButtons;
