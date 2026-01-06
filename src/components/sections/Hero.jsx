import { motion, useMotionValue, useAnimationFrame, useTransform } from "framer-motion";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../ui/Button";
import { Sparkles, PlayCircle, Star, MousePointer2 } from "lucide-react";

export default function Hero() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const ref = useRef(null);

  // Subtle organic drifting motion
  const tX = useMotionValue(0);
  const tY = useMotionValue(0);
  useAnimationFrame((t) => {
    const drift = Math.sin(t / 1500) * 40;
    tX.set(drift);
    tY.set(drift / 1.5);
  });

  const gridShift = useTransform([tX, tY], ([x, y]) => `${50 + x / 5}% ${50 + y / 5}%`);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden select-none"
    >
      {/* Animated AI grid background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
            repeating-linear-gradient(to right, rgba(128,118,244,0.06) 0px, rgba(128,118,244,0.06) 1px, transparent 1px, transparent 80px),
            repeating-linear-gradient(to bottom, rgba(128,118,244,0.06) 0px, rgba(128,118,244,0.06) 1px, transparent 1px, transparent 80px)
          `,
          backgroundSize: "160px 160px",
          backgroundPosition: gridShift,
          filter: "blur(0.3px)",
        }}
        animate={{
          opacity: [0.8, 1, 0.8],
          backgroundSize: ["160px 160px", "200px 200px", "160px 160px"],
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Glow scan pulse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(128,118,244,0.1) 50%, transparent 100%)",
        }}
        animate={{
          backgroundPositionY: ["100%", "-100%"],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Ambient glow halos */}
      <motion.div
        className="absolute -top-20 left-1/3 w-[30rem] h-[30rem] bg-primary/20 rounded-full blur-[160px]"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-10 right-1/4 w-[25rem] h-[25rem] bg-secondary/20 rounded-full blur-[140px]"
        animate={{ scale: [1, 1.25, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hero text */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl md:text-7xl font-bold text-white max-w-3xl leading-tight z-10"
      >
        {t("landing.hero.title.start")} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">{t("landing.hero.title.highlight")}</span> <br /> {t("landing.hero.title.end")}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 text-gray-400 max-w-2xl z-10 text-lg"
      >
        {t("landing.hero.description")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 flex flex-wrap gap-4 justify-center z-10"
      >
        <Button label={t("landing.hero.startFree")} onClick={() => navigate('/dashboard')} />
        <Button label={t("landing.hero.exploreDemos")} variant="glass" onClick={() => navigate('/dashboard')} />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center"
        animate={{ opacity: [0.5, 1, 0.5], y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-2 h-2 bg-gray-400 rounded-full mt-2" />
      </motion.div>
    </section>
  );
}
