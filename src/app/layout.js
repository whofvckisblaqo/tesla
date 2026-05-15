import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/components/shared/SessionWrapper";
import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/shared/CartDrawer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "TeslaStore — Drive the Future",
  description: "Buy your Tesla online.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </SessionWrapper>
      </body>
    </html>
  );
}