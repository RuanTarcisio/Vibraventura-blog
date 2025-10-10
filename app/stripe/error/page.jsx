import Link from 'next/link';
import React from 'react'

const ErrorPage = () => {
   return (
    <section className="py-72 bg-white text-black">
      <div className="container mx-auto">
        <h3 className="h3 text-center">Aconteceu algo errado, tente novamente em breve!</h3>
        <Link href="/">
        <button className="mt-4 btn btn-accent text-white/90 bg-primary mx-auto w-48">Voltar para homepage</button>
        </Link>
      </div>
    </section>
  );
};

export default ErrorPage