"use client";

import React from "react";
import {
  Trash2,
  ChevronLeft,
  ShoppingBag,
  Minus,
  Plus,
  Tag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/src/context/CartContent";
import Link from "next/link";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <section className="min-h-screen bg-zinc-950 text-lex-cream p-4 md:p-10 flex justify-center items-start overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-amber-900/20 via-zinc-950 to-zinc-950 -z-10" />

      <div className="w-full max-w-4xl bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row mt-[7rem]">
        {/* LEFT SIDE: ITEMS */}
        <div className="flex-1 p-6 md:p-8">
          <div className="flex items-center justify-between mb-8">
            <Link
              className="flex items-center text-sm text-gray-400 hover:text-white transition gap-2"
              href="/Shop"
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:block cursor-pointer">
                Continuă cumpărăturile
              </span>
            </Link>
            <h1 className="text-2xl font-serif font-bold tracking-wide">
              Coșul tău
            </h1>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  className="flex flex-col sm:flex-row items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-white/10 transition group"
                >
                  {/* IMAGE */}
                  <div className="w-20 h-20 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"
                    />
                  </div>

                  {/* DETAILS */}
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="font-serif text-lg font-medium">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>

                  {/* QUANTITY */}
                  <div className="flex items-center bg-black/20 rounded-full p-1 border border-white/5">
                    <button
                      onClick={() => updateQuantity(item._id, -1)}
                      className="p-2 hover:bg-white/10 rounded-full transition"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item._id, +1)}
                      className="p-2 hover:bg-white/10 rounded-full transition"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* PRICE & REMOVE */}
                  <div className="flex items-center gap-4">
                    <p className="font-bold text-lg w-16 text-right">
                      {item.price * item.quantity} lei
                    </p>
                    <button
                      onClick={() => removeFromCart(item._id)}
                      className="text-gray-500 hover:text-red-400 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {cartItems.length === 0 && (
              <p className="text-center text-gray-500 py-10">
                Coșul tău este gol.
              </p>
            )}
          </div>
        </div>

        {/* RIGHT SIDE: SUMMARY */}
        <div className="w-full md:w-[350px] bg-zinc-900/80 p-6 md:p-8 border-l border-white/5 flex flex-col gap-6">
          <h2 className="text-xl font-serif font-bold flex items-center gap-2">
            <ShoppingBag size={20} className="text-amber-500" /> Sumar
          </h2>

          {/* COUPON */}
          <div className="relative">
            <Tag
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Cod de reducere"
              className="w-full bg-zinc-950 border border-white/10 rounded-lg py-3 pl-10 pr-20 text-sm focus:outline-none focus:border-amber-500/50 transition placeholder:text-gray-600"
            />
            <button className="absolute right-1 top-1 bottom-1 px-3 bg-zinc-800 rounded-md text-xs font-bold hover:bg-zinc-700 transition">
              Aplică
            </button>
          </div>

          <div className="h-px bg-white/10 w-full my-2" />

          {/* TOTAL */}
          <div className="mt-auto pt-6 border-t border-white/10">
            <div className="flex justify-between items-end mb-6">
              <span className="text-gray-400">Total de plată</span>
              <span className="text-3xl font-serif font-bold text-white">
                {cartTotal} lei
              </span>
            </div>

            <button className="w-full bg-amber-600 text-white py-4 rounded-xl font-bold text-sm tracking-wide hover:bg-amber-500 transition shadow-lg shadow-amber-900/20 active:scale-95 duration-200">
              Finalizează Comanda
            </button>

            <p className="text-center text-xs text-gray-500 mt-4">
              Plată securizată prin Stripe
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cart;
