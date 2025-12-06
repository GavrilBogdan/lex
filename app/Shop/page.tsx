"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/src/context/CartContent";
import { motion } from "framer-motion";
import { Coffee, Truck, ShieldCheck } from "lucide-react";

export default function ShopPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  useEffect(() => {
    async function loadProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
      setLoading(false);
    }

    loadProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black via-zinc-950 to-black">
        <p className="text-white/70 text-sm tracking-[0.25em] uppercase">
          Se încarcă produsele...
        </p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-black via-zinc-950 to-amber-950/40 px-4 md:px-10 pb-20 mt-[7rem]">
      {/* glowing blobs */}
      <div className="pointer-events-none absolute -left-40 top-10 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-40 h-80 w-80 rounded-full bg-emerald-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-72 w-72 rounded-full bg-amber-700/10 blur-3xl" />

      {/* fake particles */}
      <div className="pointer-events-none absolute inset-0 opacity-40 mix-blend-screen">
        {Array.from({ length: 25 }).map((_, i) => (
          <span
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white/40 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 md:mb-14"
        >
          <p className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-3">
            Lex Coffee • Roasted With Care
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-3">
            Produsele Noastre
          </h1>
          <p className="text-sm md:text-base text-white/60 max-w-xl mx-auto">
            Descoperă selecția noastră premium de cafea.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row flex-wrap justify-center gap-3 text-xs text-white/70">
            <Badge icon={<Coffee size={14} />}>Proaspăt prăjită</Badge>
            <Badge icon={<Truck size={14} />}>Livrare rapidă</Badge>
            <Badge icon={<ShieldCheck size={14} />}>Calitate garantată</Badge>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { staggerChildren: 0.06, duration: 0.4 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-10"
        >
          {products.map((item) => (
            <ProductCard key={item._id} item={item} addToCart={addToCart} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function Badge({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 backdrop-blur-md">
      <span className="text-amber-400">{icon}</span>
      <span>{children}</span>
    </div>
  );
}

function ProductCard({
  item,
  addToCart,
}: {
  item: any;
  addToCart: (p: any) => void;
}) {
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(item);
    setAdded(true);

    // reset animation after 1.5s
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 25 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ y: -6, rotateX: 2, rotateY: -2 }}
      animate={added ? { scale: 1.03 } : {}}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="group rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 
                 p-5 md:p-6 shadow-xl shadow-black/40 relative overflow-hidden
                 flex flex-col justify-between"
    >
      {/* Glow effect */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-gradient-to-b 
                      from-white/20 via-white/5 to-transparent opacity-0 
                      group-hover:opacity-100 transition-opacity duration-500"
      />

      {/* IMAGE */}
      <div className="w-full h-56 overflow-hidden rounded-2xl mb-4 bg-black/30">
        <img
          src={
            item.image && item.image.trim() !== ""
              ? item.image
              : "https://placehold.co/600x800?text=No+Image"
          }
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 
                     group-hover:scale-110"
        />
      </div>

      {/* TITLE */}
      <h2 className="text-lg md:text-xl font-semibold text-white mb-1 line-clamp-1">
        {item.title}
      </h2>

      {/* DESCRIPTION */}
      <p className="text-gray-400 text-xs md:text-sm mb-auto line-clamp-2">
        {item.description}
      </p>

      {/* PRICE + BUTTON */}
      <div className="flex items-center justify-between mt-5">
        <p className="text-amber-400 font-semibold text-lg md:text-xl">
          {item.price} lei
        </p>

        <button
          onClick={handleAdd}
          className={`
            relative inline-flex items-center justify-center px-4 py-2 rounded-xl 
            text-xs md:text-sm font-semibold tracking-wide overflow-hidden
            transition-all duration-300
            ${
              added
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-900/40 scale-[1.03]"
                : "bg-amber-500 text-white shadow-lg shadow-amber-900/40 hover:scale-[1.03]"
            }
          `}
        >
          {/* Button text */}
          <span className="relative z-10">
            {added ? "Adăugat ✓" : "Adaugă în coș"}
          </span>

          {/* Glow animation */}
          <span
            className={`
              absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-white/10 
              transition-opacity duration-500 mix-blend-screen
              ${added ? "opacity-60" : "opacity-0 group-hover:opacity-100"}
            `}
          />
        </button>
      </div>

      {/* Floating toast */}
      {added && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          exit={{ opacity: 0, y: -40 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="absolute top-4 right-4 bg-emerald-500 text-black px-3 py-1 rounded-full 
                     text-xs font-bold shadow-lg shadow-emerald-900/40"
        >
          Adăugat în coș
        </motion.div>
      )}
    </motion.div>
  );
}
