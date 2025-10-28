import { motion, useMotionValue, useTransform, useAnimationFrame } from "framer-motion";
import { useRef, useState } from "react";
import { 
  Video, 
  LayoutTemplate, 
  CreditCard,
  Zap,
  Sparkles,
  Crown,
  PlayCircle,
  CheckCircle2,
  ArrowRight
} from "lucide-react";

const features = [
  {
    title: "AI Video Generation",
    desc: "Produce realistic ad videos in seconds with our Comet-powered engine that understands context and emotion with advanced neural networks.",
    icon: Video,
    gradient: "from-purple-500 to-pink-500",
    stats: "2.3s avg generation",
    color: "purple",
    highlights: ["Real-time rendering", "4K Quality", "60 FPS"]
  },
  {
    title: "Smart Templates",
    desc: "Choose from hundreds of animated ad presets for every industry, all customizable with AI-powered editing and automatic branding.",
    icon: LayoutTemplate,
    gradient: "from-blue-500 to-cyan-500",
    stats: "500+ templates",
    color: "blue",
    highlights: ["Auto-branding", "One-click apply", "Customizable"]
  },
  {
    title: "Credit-Based System",
    desc: "Pay only for what you generate. Flexible pricing for creators and brands with volume discounts and enterprise solutions.",
    icon: CreditCard,
    gradient: "from-green-500 to-emerald-500",
    stats: "Pay per use",
    color: "green",
    highlights: ["No subscriptions", "Volume discounts", "Enterprise plans"]
  },
];

const IconWrapper = ({ icon: Icon, gradient, isHovered }) => (
  <motion.div
    className={`relative w-24 h-24 rounded-3xl bg-gradient-to-r ${gradient} flex items-center justify-center shadow-2xl group`}
    whileHover={{ 
      scale: 1.1,
      rotate: [0, -5, 5, 0],
    }}
    transition={{ 
      scale: { type: "spring", stiffness: 400 },
      rotate: { duration: 0.6 }
    }}
  >
    <Icon className="w-10 h-10 text-white" />
    
    {/* Animated rings */}
    <motion.div
      className="absolute inset-0 rounded-3xl border-2 border-white/20"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.5, 0, 0.5],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
    
    {/* Sparkle particles */}
    {isHovered && (
      <>
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              x: Math.cos(i * 90) * 30,
              y: Math.sin(i * 90) * 30,
            }}
            transition={{
              duration: 1.2,
              delay: i * 0.1,
            }}
          />
        ))}
      </>
    )}
  </motion.div>
);

export default function Features() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const tX = useMotionValue(0);
  const tY = useMotionValue(0);

  useAnimationFrame((t) => {
    const driftX = Math.sin(t / 2200) * 40 + Math.cos(t / 1800) * 20;
    const driftY = Math.cos(t / 2000) * 30 + Math.sin(t / 2500) * 15;
    tX.set(driftX);
    tY.set(driftY);
  });

  const gridShift = useTransform([tX, tY], ([x, y]) => `${50 + x / 3}% ${50 + y / 3}%`);

  return (
    <section className="relative py-32 px-6 bg-gradient-to-b from-[#0A0A0F] to-[#15151F] overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `
              linear-gradient(rgba(128, 118, 244, 0.08) 1px, transparent 1px),
              linear-gradient(90deg, rgba(128, 118, 244, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
            backgroundPosition: gridShift,
          }}
        />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/10 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-32 w-80 h-80 bg-gradient-to-r from-blue-500/15 to-cyan-500/10 rounded-full blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 25, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center mb-24"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 border border-purple-500/30 backdrop-blur-xl mb-8"
        >
          <Sparkles className="w-5 h-5 text-purple-300" />
          <span className="text-purple-300 text-lg font-semibold">Why Creators Love Pixora</span>
          <Crown className="w-5 h-5 text-yellow-400" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-6xl md:text-7xl font-bold text-white mb-8"
        >
          Designed for <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400">
            Creative Excellence
          </span>
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
        >
          Transform your creative workflow with AI-powered tools that understand your vision and amplify your productivity.
        </motion.p>
      </motion.div>

      {/* Enhanced Features Grid */}
      <div className="relative z-10 grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              delay: i * 0.2,
              duration: 0.8,
              type: "spring",
              stiffness: 70
            }}
            whileHover={{ 
              y: -20,
              transition: { type: "spring", stiffness: 300, damping: 20 }
            }}
            onHoverStart={() => setHoveredIndex(i)}
            onHoverEnd={() => setHoveredIndex(null)}
            className="group relative"
          >
            {/* Enhanced Card Glow */}
            <div className={`absolute -inset-5 bg-gradient-to-r ${feature.gradient} rounded-4xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-700 ${hoveredIndex === i ? 'opacity-30' : ''}`} />
            
            {/* Main Card */}
            <div className="relative bg-gradient-to-br from-gray-900/90 to-gray-800/50 backdrop-blur-2xl rounded-3xl border border-gray-700/50 p-10 h-full overflow-hidden group-hover:border-gray-500/50 transition-all duration-700">
              
              {/* Animated Background Gradient */}
              <motion.div
                className="absolute inset-0 opacity-0 group-hover:opacity-100"
                initial={false}
                animate={{ 
                  backgroundPosition: ["0% 0%", "100% 100%"],
                }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: `radial-gradient(circle at 20% 80%, rgba(128, 118, 244, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)`,
                  backgroundSize: "500% 500%",
                }}
              />

              {/* Icon Section */}
              <div className="flex items-start justify-between mb-8">
                <IconWrapper 
                  icon={feature.icon} 
                  gradient={feature.gradient}
                  isHovered={hoveredIndex === i}
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.3 + 0.5 }}
                  className={`inline-flex items-center px-4 py-2 rounded-full bg-${feature.color}-500/10 border border-${feature.color}-500/30 text-${feature.color}-300 text-sm font-semibold`}
                >
                  <Zap className="w-3 h-3 mr-2" />
                  {feature.stats}
                </motion.div>
              </div>

              {/* Content */}
              <motion.h3 
                className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${feature.gradient} mb-6 group-hover:scale-105 transition-transform duration-300`}
              >
                {feature.title}
              </motion.h3>
              
              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {feature.desc}
              </p>

              {/* Features List */}
              <div className="space-y-3 mb-8">
                {feature.highlights.map((highlight, j) => (
                  <motion.div
                    key={j}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.3 + j * 0.1 + 0.8 }}
                    className="flex items-center gap-3 text-gray-400"
                  >
                    <CheckCircle2 className={`w-5 h-5 text-${feature.color}-400`} />
                    <span className="text-sm">{highlight}</span>
                  </motion.div>
                ))}
              </div>

              {/* CTA Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 bg-gradient-to-r ${feature.gradient} hover:shadow-2xl text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 group/btn`}
              >
                <PlayCircle className="w-5 h-5" />
                Learn More
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform duration-200" />
              </motion.button>

              {/* Hover Line Indicator */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r ${feature.gradient} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`}
                initial={false}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}