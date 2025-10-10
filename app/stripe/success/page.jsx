import Link from "next/link";
import React from "react";

const SuccessPage = () => {
  return (
    <section className="py-72 bg-white text-black">
      <div className="container mx-auto">
        <h3 className="h3 text-center">Pagamento realizado com sucesso! Obrigado!</h3>
        <Link href="/">
        <button className="mt-4 btn text-white/90 bg-primary mx-auto w-48">Voltar para homepage</button>
        </Link>
      </div>
    </section>
  );
};

export default SuccessPage;
