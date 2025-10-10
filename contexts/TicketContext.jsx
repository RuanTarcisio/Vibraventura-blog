// TicketProvider.jsx
"use client";

import { createContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid"; // Sugiro usar algo como uuid para IDs únicos do carrinho

export const TicketContext = createContext();

const TicketProvider = ({ children }) => {
  // Estado para o evento atualmente selecionado na página
  const [event, setEvent] = useState(null);

  // Estados locais para a seleção na página do evento
  const [seat, setSeat] = useState({ seat: null, price: null });
  const [itemAmount, setItemAmount] = useState(1);
  const [showMenu, setShowMenu] = useState(false);

  // NOVO: Estado para o carrinho (uma lista de itens)
  const [cartItems, setCartItems] = useState([]);

  // NOVO: Estados derivados do carrinho para uso global
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // NOVO: Estado para o carregamento do carrinho (ex: ao buscar do backend)
  const [cartLoading, setCartLoading] = useState(false);

  // NOVO: Efeito para calcular o total do carrinho e a quantidade de itens sempre que cartItems mudar
  useEffect(() => {
    const newTotalPrice = cartItems.reduce(
      (total, item) => total + item.totalPrice,
      0
    );
    const newCartCount = cartItems.reduce(
      (total, item) => total + item.amount,
      0
    );
    setTotalPrice(newTotalPrice);
    setCartCount(newCartCount);
  }, [cartItems]);

  // Função para inicializar um evento na página
  const initializeEvent = (fetchedEvent) => {
    setEvent(fetchedEvent);
    setItemAmount(1);
    const frontseat = fetchedEvent?.seats.find((s) => s.seat === "frontseat");
    if (frontseat) {
      setSeat({ seat: frontseat.seat, price: frontseat.price });
    } else {
      setSeat({
        seat: fetchedEvent?.seats[0]?.seat || null,
        price: fetchedEvent?.seats[0]?.price || null,
      });
    }
    setShowMenu(false);
  };

  // Efeito para lidar com clique fora do menu para fechá-lo
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showMenu && !e.target.closest(".custom-select")) {
        setShowMenu(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showMenu]);

  // Função para lidar com a seleção do assento
  const handleSeat = (selectedSeat, selectedPrice) => {
    setSeat({ seat: selectedSeat, price: selectedPrice });
    setShowMenu(false);
  };

  // NOVO: Função para adicionar o item selecionado ao carrinho
  const handleAddToCart = () => {
    // 1. Crie um objeto para o item do carrinho
    const newItem = {
      // Use um ID único para o item no carrinho para evitar problemas
      cartItemId: uuidv4(),
      eventId: event.id,
      eventName: event.title,
      eventImage: event.img_sm,
      ticketType: seat.seat,
      ticketPrice: seat.price,
      amount: itemAmount,
      totalPrice: seat.price * itemAmount,
    };
    
    // 2. Verifique se o item já existe no carrinho (opcional)
    const existingItemIndex = cartItems.findIndex(
      (item) => item.eventId === newItem.eventId && item.ticketType === newItem.ticketType
    );

    if (existingItemIndex > -1) {
      // Se o item já existe, atualize a quantidade e o preço total
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].amount += newItem.amount;
      updatedCartItems[existingItemIndex].totalPrice += newItem.totalPrice;
      setCartItems(updatedCartItems);
    } else {
      // Se o item não existe, adicione-o como um novo item
      setCartItems((prevItems) => [...prevItems, newItem]);
    }
  };

  // Funções de ajuste de quantidade para o item selecionado NA PÁGINA
  const increaseAmount = () => {
    setItemAmount((prevAmount) => prevAmount + 1);
  };

  const decreaseAmount = () => {
    setItemAmount((prevAmount) => (prevAmount > 1 ? prevAmount - 1 : 0));
  };
  
  // Uma função 'buyNow' para um item de carrinho (ex: redireciona para o checkout)
  const buyNow = (cartItem) => {
    // Esta função agora deve ser chamada com um item do carrinho, não o evento inteiro
    console.log("Iniciando checkout para o item:", cartItem);
    // Aqui você integraria a lógica de checkout com seu backend/PagSeguro/MercadoPago
    // Ex: initiateCheckout([cartItem]);
  };

  // Uma função para remover um item do carrinho
  const removeCartItem = (cartItemId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartItemId !== cartItemId)
    );
  };

  // Uma função para limpar o carrinho inteiro
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <TicketContext.Provider
      value={{
        event,
        seat,
        showMenu,
        itemAmount, // Quantidade selecionada localmente na página
        cartItems, // O carrinho com todos os itens
        totalPrice, // O total de todos os itens no carrinho
        cartCount, // A contagem total de itens no carrinho
        cartLoading,
        handleSeat,
        setSeat,
        setShowMenu,
        buyNow,
        initializeEvent,
        decreaseAmount,
        increaseAmount,
        handleAddToCart, // NOVO: Adiciona item ao carrinho
        removeCartItem, // NOVO: Remove item do carrinho
        clearCart, // NOVO: Limpa o carrinho
      }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export default TicketProvider;