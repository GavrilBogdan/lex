"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const Preloader = () => {
  // Stare pentru a controla dacă preloaderul mai este vizibil sau nu
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulăm o încărcare de 2.5 secunde.
    // În realitate, ai putea lega asta de încărcarea efectivă a datelor sau imaginilor.
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    // Blocăm scroll-ul cât timp preloaderul este activ
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "auto";
    };
  }, [isVisible]);

  // Varianta de animație pentru containerul principal (fade out la final)
  const containerVariants = {
    initial: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  // Varianta pentru "curgerea" lichidului
  const dropVariants = {
    initial: { height: 0 },
    animate: {
      height: [0, 60, 60, 0], // Crește, stă puțin, apoi dispare
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
        times: [0, 0.4, 0.6, 1], // Controlăm timing-ul fiecărei etape
      },
    },
  };

  // Varianta pentru "baza" care se umple
  const poolVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: {
      scale: [0, 1.2, 1.5], // Se mărește
      opacity: [0, 1, 0], // Apare și dispare
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut",
        delay: 0.3, // Începe puțin după ce începe curgerea
      },
    },
  };

  // Varianta pentru aburi
  const steamVariants = {
    initial: { y: 0, opacity: 0 },
    animate: (i: number) => ({
      y: -30,
      opacity: [0, 0.6, 0],
      transition: {
        repeat: Infinity,
        duration: 2,
        ease: "easeInOut",
        delay: i * 0.4, // Decalaj între firele de abur
      },
    }),
  };

  if (!isVisible) return null;

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-zinc-950"
    >
      <div className="relative flex flex-col items-center">
        {/* ABURI */}
        <div className="flex gap-2 mb-2 absolute -top-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              custom={i}
              variants={steamVariants}
              animate="animate"
              className="w-1 h-6 bg-amber-700/30 rounded-full blur-[1px]"
            />
          ))}
        </div>

        {/* LINIA CARE CURGE (ESPRESSO) */}
        <motion.div
          variants={dropVariants}
          animate="animate"
          className="w-1.5 bg-gradient-to-b from-amber-800 to-amber-600 rounded-full origin-top"
        />

        {/* BAZA CARE SE UMPLE */}
        <motion.div
          variants={poolVariants}
          animate="animate"
          className="w-8 h-3 bg-amber-700 rounded-[50%] blur-[2px] mt-[-2px]"
        />

        {/* TEXT */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-amber-500 font-serif text-sm tracking-[0.3em] uppercase mt-6"
        >
          Brewing
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Preloader;
