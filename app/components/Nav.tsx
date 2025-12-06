"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useCart } from "@/src/context/CartContent";
import { ShoppingBag, Menu, X } from "lucide-react";

const Nav = () => {
  const { cartCount, cartTotal } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 p-4 md:p-6 flex justify-between items-center bg-zinc-950/80 backdrop-blur-md text-white border-b border-white/5 transition-all">
      {/* LOGO */}
      <div className="z-50">
        <Link
          href="/"
          onClick={closeMenu}
          className="text-2xl font-serif font-bold tracking-tighter hover:text-amber-500 transition"
        >
          LEX
        </Link>
      </div>

      {/* --- DESKTOP MENU (Ascuns pe mobil, vizibil pe ecrane medii+) --- */}
      <div className="hidden md:flex items-center gap-8 text-xs font-bold tracking-widest">
        <Link href="/" className="hover:text-amber-500">
          HOME
        </Link>
        <Link href="/menu" className="hover:text-amber-500 transition">
          MENU
        </Link>
        <Link href="/Shop" className="hover:text-amber-500 transition">
          SHOP
        </Link>
        <Link href="/contact" className="hover:text-amber-500 transition">
          CONTACT
        </Link>
      </div>

      {/* --- PARTEA DREAPTĂ (Cart + Hamburger) --- */}
      <div className="flex items-center gap-4 z-50">
        <Link
          href="/Cart"
          className="flex items-center gap-3 bg-white/10 px-3 py-2 md:px-4 md:py-2 rounded-full hover:bg-amber-600 transition duration-300 group"
        >
          <div className="relative">
            <ShoppingBag
              size={18}
              className="text-gray-300 group-hover:text-white"
            />
            {isMounted && cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </div>

          <div className="flex flex-col leading-none">
            <span className="text-[9px] text-gray-400 uppercase font-light group-hover:text-white/80 hidden sm:block">
              Total
            </span>
            <span className="font-bold text-sm">
              {isMounted ? `${cartTotal} RON` : "0 RON"}
            </span>
          </div>
        </Link>

        {/* BUTON HAMBURGER (Vizibil doar pe mobil) */}
        <button
          className="md:hidden p-2 text-white hover:text-amber-500 transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* --- MOBILE MENU OVERLAY --- */}
      {/* Acesta apare doar când isMenuOpen e true */}
      <div
        className={`fixed inset-0 bg-zinc-950/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 text-2xl font-serif transition-transform duration-300 ease-in-out md:hidden ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ top: "0", height: "100vh" }}
      >
        <Link href="/" onClick={closeMenu} className="hover:text-amber-500">
          HOME
        </Link>
        <Link href="/menu" onClick={closeMenu} className="hover:text-amber-500">
          MENU
        </Link>
        <Link href="/Shop" onClick={closeMenu} className="hover:text-amber-500">
          SHOP
        </Link>
        <Link
          href="/contact"
          onClick={closeMenu}
          className="hover:text-amber-500"
        >
          CONTACT
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
