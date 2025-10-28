import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { useState, useEffect } from "react";

export default function Preview() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [showPlayButton, setShowPlayButton] = useState(false);

  // Subtle animated background grid
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  useAnimationFrame((t) => {
    x.set(Math.sin(t / 2000) * 25);
    y.set(Math.cos(t / 2500) * 25);
  });
  const bgPos = useTransform([x, y], ([x, y]) => `${50 + x / 2}% ${50 + y / 2}%`);

  // Infinite looping progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : p + 0.4));
    }, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative flex flex-col items-center justify-center py-28 overflow-hidden bg-[#08080C]">
      {/* Dynamic background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(128,118,244,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(128,118,244,0.1) 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px",
            backgroundPosition: bgPos,
          }}
        />
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#8076F4]/15 rounded-full blur-[180px]"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-center max-w-3xl px-6"
      >
        <span className="inline-block px-4 py-1.5 mb-5 text-sm font-medium text-[#A7A2FF] border border-[#8076F4]/40 rounded-full bg-[#8076F4]/10 backdrop-blur-md">
          🎬 AI Video Preview
        </span>
        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-5">
          Watch <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8076F4] to-[#5CB8FF]">Pixora</span>{" "}
          Bring Your Ideas to Life
        </h2>
        <p className="text-gray-400 text-lg md:text-xl">
          Experience how our AI turns text into cinematic visuals — smooth, expressive, and fast.
        </p>
      </motion.div>

      {/* Video Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, type: "spring", stiffness: 120 }}
        viewport={{ once: true }}
        className="relative mt-16 w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] aspect-video rounded-3xl overflow-hidden"
      >
        {/* Glow border */}
        <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#8076F4]/40 to-[#5CB8FF]/40 blur-lg opacity-70" />

        {/* Iframe player */}
        <div
          className="relative w-full h-full bg-gradient-to-br from-[#12121A] to-[#0B0B10] border border-[#8076F4]/20 rounded-2xl overflow-hidden"
          onMouseEnter={() => setShowPlayButton(true)}
          onMouseLeave={() => setShowPlayButton(false)}
        >
          <iframe
            src={`https://www.youtube.com/embed/egHY7joBIIE?autoplay=${isPlaying ? 1 : 0}&mute=1&loop=1&playlist=egHY7joBIIE`}
            title="Pixora Preview"
            allow="autoplay; fullscreen"
            className="w-full h-full rounded-2xl"
          ></iframe>

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />

          {/* Play / Pause */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: showPlayButton ? 1 : 0, scale: showPlayButton ? 1 : 0.8 }}
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/15 border border-white/30 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/25 transition-all duration-300"
          >
            {isPlaying ? (
              <div className="flex gap-1">
                <div className="w-2 h-6 bg-white rounded" />
                <div className="w-2 h-6 bg-white rounded" />
              </div>
            ) : (
              <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[9px] border-y-transparent ml-1" />
            )}
          </motion.button>

          {/* Infinite Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/70 to-transparent">
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-[#222]/70 rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8076F4] to-[#5CB8FF] rounded-full"
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <span className="text-white text-sm font-medium">{isPlaying ? "Playing" : "Paused"}</span>
            </div>
          </div>
        </div>

        {/* Corner UI Tags */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="absolute top-3 right-3 flex flex-col sm:flex-row gap-2 z-10"
        >
          <div className="bg-gradient-to-r from-[#8076F4] to-[#5CB8FF] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-md">
            AI GENERATED
          </div>
          <div className="bg-gradient-to-r from-[#3DD68C] to-[#42E8A3] text-white text-xs px-3 py-1.5 rounded-full font-semibold shadow-md">
            4K RENDER
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
