"use client";

import { CartProvider as CProvider } from "use-shopping-cart";
import { useEffect, useState } from "react";

const CartProvider = ({ children }) => {
  const [baseUrl, setBaseUrl] = useState("");

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  if (!baseUrl) {
    return null;
  }

  return (
    <CProvider
      mode="payment"
      cartMode="client-only"
      stripe={process.env.NEXT_PUBLIC_STRIPE_KEY}
      successUrl={`${baseUrl}/stripe/success`}
      cancelUrl={`${baseUrl}/stripe/error`}
      language="pt-BR"
      currency="BRL"
      billingAddressCollection={true}
      shouldPersist={true}
    >
      {children}
    </CProvider>
  );
};

export default CartProvider;
