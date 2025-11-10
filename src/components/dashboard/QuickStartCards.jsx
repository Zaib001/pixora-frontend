import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Video, 
  Image, 
  PlayCircle,
  Wand2,
  Zap, 
  ArrowRight,
  Sparkles,
  Clock,
  TrendingUp
} from "lucide-react";

const quickStartItems = [
  { 
    label: "Text → Video", 
    route: "/generate/text-to-video",
    description: "Transform descriptions into stunning videos with AI",
    icon: Video,
    gradient: "from-purple-500 to-pink-500",
    color: "purple",
    popular: true,
    speed: "2-4 min",
    quality: "4K Ready",
    stats: "15.2K uses"
  },
  { 
    label: "Image → Video", 
    route: "/generate/image-to-video",
    description: "Animate your images with cinematic motion",
    icon: PlayCircle,
    gradient: "from-blue-500 to-cyan-500",
    color: "blue",
    popular: false,
    speed: "1-3 min",
    quality: "1080p+",
    stats: "8.7K uses"
  },
  { 
    label: "Text → Image", 
    route: "/generate/text-to-image",
    description: "Generate photorealistic images from text prompts",
    icon: Image,
    gradient: "from-green-500 to-emerald-500",
    color: "green",
    popular: true,
    speed: "30 sec",
    quality: "HD+",
    stats: "23.1K uses"
  },
  { 
    label: "Image → Image", 
    route: "/generate/image-to-image",
    description: "Transform and enhance images with AI magic",
    icon: Wand2,
    gradient: "from-orange-500 to-red-500",
    color: "orange",
    popular: false,
    speed: "45 sec",
    quality: "Enhanced",
    stats: "12.4K uses"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      duration: 0.8
    }
  },
  hover: {
    y: -12,
    scale: 1.03,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25
    }
  }
};

const iconVariants = {
  initial: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: 5,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  }
};

const shineVariants = {
  initial: { x: "-100%", y: "-100%" },
  hover: {
    x: "100%",
    y: "100%",
    transition: {
      duration: 0.8,
      ease: "easeInOut"
    }
  }
};

export default function QuickStartCards() {
  const navigate = useNavigate();

  const getColorClasses = (color) => {
    const colors = {
      purple: {
        bg: "from-purple-500/5 to-pink-500/5",
        border: "border-purple-500/20",
        glow: "from-purple-500/20 to-pink-500/20",
        text: "text-purple-300"
      },
      blue: {
        bg: "from-blue-500/5 to-cyan-500/5",
        border: "border-blue-500/20",
        glow: "from-blue-500/20 to-cyan-500/20",
        text: "text-blue-300"
      },
      green: {
        bg: "from-green-500/5 to-emerald-500/5",
        border: "border-green-500/20",
        glow: "from-green-500/20 to-emerald-500/20",
        text: "text-green-300"
      },
      orange: {
        bg: "from-orange-500/5 to-red-500/5",
        border: "border-orange-500/20",
        glow: "from-orange-500/20 to-red-500/20",
        text: "text-orange-300"
      }
    };
    return colors[color] || colors.purple;
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      {quickStartItems.map((item, index) => {
        const Icon = item.icon;
        const colorClasses = getColorClasses(item.color);
        
        return (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(item.route)}
            className={`
              relative group cursor-pointer rounded-3xl p-6 border backdrop-blur-2xl
              bg-gradient-to-br ${colorClasses.bg} ${colorClasses.border}
              hover:shadow-2xl transition-all duration-500 overflow-hidden
              min-h-[280px] flex flex-col justify-between
            `}
          >
            {/* Animated Background Glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl`} />
            
            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className={`absolute w-2 h-2 rounded-full bg-gradient-to-r ${item.gradient} opacity-20`}
                  initial={{ 
                    x: Math.random() * 200, 
                    y: Math.random() * 200,
                    scale: 0 
                  }}
                  animate={{ 
                    scale: [0, 1, 0],
                    opacity: [0, 0.3, 0]
                  }}
                  transition={{
                    duration: 3 + i,
                    repeat: Infinity,
                    delay: i * 0.5
                  }}
                />
              ))}
            </div>

            {/* Shine Overlay */}
            <motion.div
              variants={shineVariants}
              className="absolute inset-0 bg-gradient-to-br from-transparent via-white/10 to-transparent -rotate-45"
            />

            {/* Header Section */}
            <div className="relative z-10">
              {/* Popular Badge */}
              {item.popular && (
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.2 + 0.4, type: "spring" }}
                  className="absolute -top-2 -right-2"
                >
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg font-semibold">
                    <Zap size={12} className="fill-current" />
                    <span>Trending</span>
                  </div>
                </motion.div>
              )}

              {/* Icon Container */}
              <motion.div
                variants={iconVariants}
                initial="initial"
                whileHover="hover"
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-6 relative overflow-hidden shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
              >
                <Icon size={26} />
                {/* Icon Inner Glow */}
                <div className="absolute inset-0 bg-white/10 rounded-2xl" />
                {/* Icon Shine */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </motion.div>

              {/* Content */}
              <div className="space-y-3">
                <h3 className="font-bold text-white text-xl leading-tight">
                  {item.label}
                </h3>
                
                <p className="text-gray-300 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* Footer Section */}
            <div className="relative z-10 space-y-3">
              {/* Stats Row */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Clock size={12} />
                  <span>{item.speed}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <Sparkles size={12} />
                  <span>{item.quality}</span>
                </div>
                <div className="flex items-center gap-1.5 text-gray-400">
                  <TrendingUp size={12} />
                  <span>{item.stats}</span>
                </div>
              </div>

              {/* CTA Button */}
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300 group/cta"
              >
                <span className="text-white text-sm font-semibold">
                  Start Creating
                </span>
                <div className="flex items-center gap-1">
                  <ArrowRight 
                    size={16} 
                    className="text-white group-hover/cta:translate-x-1 transition-transform duration-200" 
                  />
                </div>
              </motion.div>
            </div>

            {/* Hover Border Animation */}
            <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`}>
              <div className="absolute inset-[2px] rounded-3xl bg-gray-900/95" />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}