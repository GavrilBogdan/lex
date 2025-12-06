"use client";

import Link from "next/link";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowDown } from "lucide-react";

// RANDOM HELPER
const random = (min: number, max: number) => Math.random() * (max - min) + min;

// --- FLOATING BEAN ---
const FloatingBean = ({
  data,
  scrollYProgress,
}: {
  data: any;
  scrollYProgress: MotionValue<number>;
}) => {
  const yParallax = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", `-${data.parallaxSpeed}%`]
  );

  return (
    <motion.img
      src="/images/bean.png"
      alt="floating coffee bean"
      className="absolute opacity-60 will-change-transform select-none pointer-events-none"
      style={{
        left: `${data.x}%`,
        top: `${data.y}%`,
        width: data.size,
        filter: `blur(${data.blur}px)`,
        y: yParallax,
      }}
      animate={{
        rotate: [0, 360],
        x: ["-5%", "15%", "-5%"],
      }}
      transition={{
        rotate: {
          duration: data.rotationSpeed,
          repeat: Infinity,
          ease: "linear",
        },
        x: {
          duration: random(10, 15),
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    />
  );
};

const Hero = () => {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // ---------------------------
  // ✅ FIX: RANDOM BEANS CLIENT SIDE ONLY
  // ---------------------------
  const [beans, setBeans] = useState<any[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: random(0, 100),
      y: random(10, 110),
      size: random(15, 45),
      rotationSpeed: random(20, 50),
      parallaxSpeed: random(50, 200),
      blur: random(0, 3),
    }));

    setBeans(generated);
  }, []);

  // PARALLAX ANIMATIONS
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.25]);
  const backgroundBlur = useTransform(
    scrollYProgress,
    [0, 1],
    ["blur(0px)", "blur(10px)"]
  );

  const titleY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const subY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const btnY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={ref}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-zinc-950"
    >
      {/* BACKGROUND VIDEO */}
      <motion.div
        style={{
          y: backgroundY,
          scale: backgroundScale,
          filter: backgroundBlur,
        }}
        className="absolute inset-0 z-0 h-[120%] w-full will-change-transform"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-80"
        >
          <source
            src="https://lexcoffee.ro/wp-content/uploads/2024/10/Orizontal.mp4"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />
      </motion.div>

      {/* FLOATING BEANS (HYDRATION SAFE) */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="absolute inset-0 z-5 pointer-events-none overflow-hidden"
      >
        {beans.map((bean) => (
          <FloatingBean
            key={bean.id}
            data={bean}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </motion.div>

      {/* TEXT CONTENT */}
      <motion.div
        style={{ opacity: contentOpacity }}
        className="relative z-10 text-center text-white px-4 flex flex-col items-center"
      >
        <motion.p
          style={{ y: subY }}
          className="text-sm md:text-base font-bold tracking-[0.4em] uppercase text-amber-500 mb-4"
        >
          Est. 2024 • Timișoara
        </motion.p>

        <motion.h1
          style={{ y: titleY }}
          className="text-6xl md:text-9xl font-serif font-black mb-8 drop-shadow-2xl"
        >
          LEX COFFEE
        </motion.h1>

        <motion.div style={{ y: btnY }} className="flex flex-col items-center">
          <div className="flex gap-4 flex-col sm:flex-row">
            <Link
              href="/menu"
              className="bg-amber-600 px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition shadow-lg hover:scale-105 active:scale-95 duration-300"
            >
              Order Now
            </Link>
            <Link
              href="/shop"
              className="border border-white/80 px-8 py-3 rounded-full font-bold hover:bg-white hover:text-black transition hover:scale-105 active:scale-95 duration-300"
            >
              Shop Beans
            </Link>
          </div>

          {/* Scroll indicator */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mt-12 opacity-70"
          >
            <ArrowDown size={24} />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Hero;
