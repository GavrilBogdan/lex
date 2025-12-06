"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function MenuPage() {
  const [menu, setMenu] = useState<any[]>([]);

  useEffect(() => {
    async function load() {
      const res = await fetch("/api/menu");
      const data = await res.json();
      setMenu(Array.isArray(data) ? data : []);
    }
    load();
  }, []);

  return (
    // 🔒 FIXED FULLSCREEN WRAPPER – PAGE ITSELF DOES NOT SCROLL
    <div className="fixed inset-0 overflow-hidden flex items-center justify-center px-4 md:px-10 ">
      {/* 🔥 GRADIENT BLOBS */}
      <div className="pointer-events-none absolute top-0 left-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-amber-600/20 rounded-full blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-900/20 rounded-full blur-3xl" />

      {/* ✨ PARTICLES */}
      <div className="pointer-events-none absolute inset-0 opacity-40">
        {Array.from({ length: 40 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-[2px] h-[2px] bg-white/50 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
          />
        ))}
      </div>

      {/* 🌟 MAIN GLASS CARD – FIXED HEIGHT, FLEX, MIN-H-0 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="
          relative z-10
          w-full max-w-5xl
          bg-white/10 backdrop-blur-xl border border-white/10
          shadow-2xl rounded-3xl
          p-6 md:p-10
          flex flex-col
          h-[80vh]
          min-h-0
          mt-[3rem]
        "
      >
        {/* TITLE – DOES NOT SHRINK */}
        <h1
          className="text-5xl md:text-7xl text-amber-400 font-bold text-center drop-shadow-lg mb-6 md:mb-8 shrink-0"
          style={{ fontFamily: "Cookie, sans-serif" }}
        >
          Menu
        </h1>

        {/* GRID – TAKES REMAINING SPACE, CAN SHRINK */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 flex-1 min-h-0">
          {/* BEVERAGES */}
          <CategoryBox
            title="Beverages"
            items={menu.filter((i) => i.category === "beverages")}
          />

          {/* BITES */}
          <CategoryBox
            title="Bites"
            items={menu.filter((i) => i.category === "bites")}
          />
        </div>
      </motion.div>
    </div>
  );
}

function CategoryBox({ title, items }: { title: string; items: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        p-4 md:p-6
        rounded-2xl
        bg-white/5 backdrop-blur-lg
        border border-white/10 shadow-xl
        flex flex-col
        min-h-0
      "
    >
      <h3
        className="text-3xl md:text-4xl text-amber-300 font-bold mb-4 text-center shrink-0"
        style={{ fontFamily: "Cookie, sans-serif" }}
      >
        {title}
      </h3>

      {/* THIS is the scroll area – flex-1, min-h-0, overflow-y-auto */}
      <ul
        className="
               space-y-3 md:space-y-4
               pr-3
               flex-1
               min-h-0
               overflow-y-auto
               overscroll-contain
               touch-pan-y
               scrollbar-thin
               scrollbar-track-transparent
               scrollbar-thumb-white/30
               hover:scrollbar-thumb-amber-400
               menu-scroll
              "
      >
        {items.map((item) => (
          <li
            key={item._id}
            className="
              flex justify-between
              flex-col sm:flex-row
              text-lg sm:text-2xl
              text-white
            "
          >
            <span className="font-bold text-orange-300">{item.name}</span>
            <span className="text-orange-100">{item.price} RON</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
