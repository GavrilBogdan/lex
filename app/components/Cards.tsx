"use client";

import { motion } from "framer-motion";
import { Coffee, Sparkles, MapPin } from "lucide-react"; // Iconițe profesionale

// Datele pentru cele 3 carduri
const features = [
  {
    id: 1,
    icon: Coffee,
    title: "Premium Beans",
    description: "Roasted Fresh Daily in Small Batches.",
  },
  {
    id: 2,
    icon: Sparkles,
    title: "Art in Every Cup",
    description: "Passion Poured into Every Drop.",
  },
  {
    id: 3,
    icon: MapPin,
    title: "The Perfect Spot",
    description: "Located in the Heart of the City.",
  },
];

// Variantele de animație pentru container (ca să apară pe rând)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Pauză de 0.3s între apariția cardurilor
    },
  },
};

// Variantele de animație pentru fiecare card individual
const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

const FeaturesSection = () => {
  return (
    <section className="py-32 bg-zinc-950 px-6 relative overflow-hidden">
      {/* (Opțional) O lumină ambientală în fundal */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-900/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Titlu secțiune (Opțional, dar recomandat) */}
        <div className="text-center mb-20">
          <h2 className="text-white font-serif text-4xl md:text-5xl font-bold">
            Why LEX?
          </h2>
          <div className="w-24 h-1 bg-amber-600 mx-auto mt-6 rounded-full opacity-70"></div>
        </div>

        {/* Grid-ul de carduri */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }} // Pornește animația când e puțin vizibil
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              // "group" este esențial pentru efectele de hover coordonate
              className="group relative p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-md overflow-hidden transition-all duration-500 hover:border-amber-500/30 hover:bg-zinc-900/80 hover:-translate-y-2 shadow-xl hover:shadow-amber-900/10"
            >
              {/* STRĂLUCIRE (Glow) la hover - element ascuns care apare */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Container ICONIȚĂ */}
                <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-full bg-zinc-950 border border-white/10 text-amber-500 shadow-lg group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-zinc-950 transition-all duration-500">
                  <feature.icon size={32} strokeWidth={1.5} />
                </div>

                {/* TITLU */}
                <h3 className="text-2xl font-serif font-bold text-white mb-4 group-hover:text-amber-100 transition-colors">
                  {feature.title}
                </h3>

                {/* DESCRIERE */}
                <p className="text-sm uppercase tracking-[0.15em] text-zinc-400 font-medium leading-relaxed group-hover:text-amber-500/80 transition-colors">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
