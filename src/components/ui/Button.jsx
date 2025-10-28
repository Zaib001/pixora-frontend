import { motion } from "framer-motion";

export default function Button({ 
  label, 
  variant = "primary", 
  onClick,
  size = "medium",
  disabled = false,
  icon = null 
}) {
  const base = "relative inline-flex items-center justify-center rounded-xl font-semibold tracking-wide overflow-hidden transition-all duration-500 ease-out group cursor-pointer";
  
  const sizes = {
    small: "px-6 py-2 text-sm",
    medium: "px-8 py-3 text-base",
    large: "px-10 py-4 text-lg"
  };

  const variants = {
    primary: `
      text-white bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400
      border-0 shadow-lg hover:shadow-xl 
      hover:shadow-purple-500/25 hover:from-purple-500 hover:to-blue-500
      before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent
      before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-1000
    `,
    glass: `
      bg-white/10 backdrop-blur-xl border border-white/20 text-white 
      shadow-2xl hover:shadow-purple-500/20 hover:border-white/30
      hover:bg-white/15 hover:backdrop-blur-2xl
    `,
    neon: `
      text-cyan-400 bg-transparent border border-cyan-400/60 
      shadow-[0_0_15px_rgba(34,211,238,0.3)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
      hover:bg-cyan-400/10 hover:text-cyan-300 hover:border-cyan-300
      hover:scale-105
    `,
    gradient: `
      text-white bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
      bg-size-200 bg-pos-0 hover:bg-pos-100 border-0
      shadow-lg hover:shadow-purple-500/30 transition-all duration-500
    `,
    modern: `
      text-gray-800 bg-white border border-gray-200 
      shadow-md hover:shadow-lg hover:border-purple-300
      hover:bg-gradient-to-br hover:from-white hover:to-purple-50
    `
  };

  const disabledStyles = "opacity-50 cursor-not-allowed hover:transform-none";

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={!disabled ? { 
        scale: 1.05,
        y: -2,
        transition: { type: "spring", stiffness: 400, damping: 10 }
      } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      className={`
        ${base} 
        ${sizes[size]} 
        ${variants[variant]} 
        ${disabled ? disabledStyles : ''}
        relative isolate
      `}
      style={{
        backgroundSize: variant === "gradient" ? "200% 100%" : "auto",
      }}
    >
      {/* Animated background gradient for gradient variant */}
      {variant === "gradient" && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-size-200 bg-pos-0"
          whileHover={{
            backgroundPosition: "100% 0%",
            transition: { duration: 0.8, ease: "easeInOut" }
          }}
        />
      )}

      {/* Floating particles effect */}
      {!disabled && (
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(3)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full"
              initial={{ 
                x: Math.random() * 100 - 50, 
                y: Math.random() * 100 - 50,
                scale: 0 
              }}
              whileHover={{
                scale: [0, 1, 0],
                x: Math.random() * 200 - 100,
                y: Math.random() * 200 - 100,
                transition: { 
                  duration: 1.5, 
                  delay: i * 0.2,
                  repeat: Infinity 
                }
              }}
            />
          ))}
        </div>
      )}

      {/* Light sweep effect */}
      <motion.span
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 -skew-x-12"
        whileHover={{
          opacity: [0, 0.5, 0],
          x: ["-100%", "200%"],
          transition: { duration: 1.2, ease: "easeInOut" }
        }}
      />

      {/* Border glow effect */}
      <motion.span
        className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl opacity-0 blur-sm -z-10"
        whileHover={{
          opacity: 0.7,
          transition: { duration: 0.3 }
        }}
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        {label}
      </span>

      {/* Ripple effect on click */}
      {!disabled && (
        <motion.span
          className="absolute inset-0 bg-white rounded-xl opacity-0"
          whileTap={{
            opacity: 0.3,
            scale: 1.2,
            transition: { duration: 0.2 }
          }}
        />
      )}
    </motion.button>
  );
}