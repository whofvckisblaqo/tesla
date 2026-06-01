import { Inter } from "next/font/google";
import Script from "next/script";
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
        <Script
          src="https://embed.tawk.to/6a1590abed91441c326ca667/1jpi3q7v5"
          strategy="afterInteractive"
          crossOrigin="*"
        />
        {/* Google Translate — off-screen element so the widget can initialize */}
        <div id="google_translate_element" style={{ position: "fixed", top: "-9999px", left: "-9999px" }} />
        <Script
          id="google-translate-loader"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.googleTranslateElementInit = function() {
                new google.translate.TranslateElement({
                  pageLanguage: 'en',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                  autoDisplay: false
                }, 'google_translate_element');
              };
              (function() {
                var s = document.createElement('script');
                s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                s.async = true;
                document.head.appendChild(s);
              })();
            `
          }}
        />
      </body>
    </html>
  );
}