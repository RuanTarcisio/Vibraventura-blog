import { Poppins, Caveat } from "next/font/google";
import "./globals.css";

// contexts

import AuthProvider from "@/contexts/providers/AuthProvider";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";


export const metadata = {
  title: "Vibraventura - Ecoturismo e Esportes Radicais",
  description: "Conecte-se com a natureza e viva a aventura com o Vibraventura. Descubra experiências únicas de turismo e esportes radicais.",
  icons: {
    icon: "/assets/header/logo2.png",
  },
};

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

const caveat = Caveat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-caveat",
});

export default function RootLayout({ children }) {
  return (

    <html lang="en">
      <body
        className={`${poppins.variable} ${caveat.variable} antialiased`}
      >
        <Header />
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
