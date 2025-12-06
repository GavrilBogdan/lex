import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Cart from "./Cart/page";
import { CartProvider } from "@/src/context/CartContent";
import Nav from "./components/Nav";
import SmoothScrolling from "./components/SmoothScrolling";
import { AnimatePresence } from "framer-motion";
import Preloader from "./components/Preloader";
import { Providers } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LEX Coffee ",
  description: "LEX Coffee | Authentic brazilian coffee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cookie&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <AnimatePresence mode="wait">
            <Preloader key="preloader" />
          </AnimatePresence>
          <SmoothScrolling>
            <CartProvider>
              <Nav />

              {children}
            </CartProvider>
          </SmoothScrolling>
        </Providers>
      </body>
    </html>
  );
}
