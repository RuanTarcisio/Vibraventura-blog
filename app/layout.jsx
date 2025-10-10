import { Poppins, Caveat } from "next/font/google";
import "./globals.css";

// contexts
import EventProvider from "@/contexts/EventContext";
import TicketProvider from "@/contexts/TicketContext";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartProvider from "@/components/CartProvider";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Events App",
  description: "A Site for ecoturimo events",
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
    <EventProvider>
      <TicketProvider>
        <html lang="en">
          <body
            className={`${poppins.variable} ${caveat.variable} antialiased`}
          >
            <CartProvider>
              <Header />
              {children}
              <Toaster />
              <Footer />
            </CartProvider>
          </body>
        </html>
      </TicketProvider>
    </EventProvider>
  );
}
