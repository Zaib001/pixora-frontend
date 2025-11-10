import { motion } from "framer-motion";
import { Sparkles, Camera, ImageIcon, Video, Star, Zap, Play, TrendingUp, Clock, Rocket, ArrowRight, Plus } from "lucide-react";
import QuickStartCards from "../../components/dashboard/QuickStartCards";
import RecentProjectsGrid from "../../components/dashboard/RecentProjectsGrid";

const popularTemplates = [
  {
    title: "Product Showcase",
    thumbnail: "https://picsum.photos/600/350?1",
    duration: "0:15",
    uses: "12.4K"
  },
  {
    title: "Cinematic Intro Scene",
    thumbnail: "https://picsum.photos/600/350?2",
    duration: "0:30",
    uses: "8.7K"
  },
  {
    title: "Fashion Promo Shot",
    thumbnail: "https://picsum.photos/600/350?3",
    duration: "0:20",
    uses: "15.2K"
  },
  {
    title: "Portrait Lighting Demo",
    thumbnail: "https://picsum.photos/600/350?4",
    duration: "0:25",
    uses: "6.3K"
  },
  {
    title: "Urban Aesthetic Loop",
    thumbnail: "https://picsum.photos/600/350?5",
    duration: "0:10",
    uses: "9.8K"
  },
  {
    title: "Sci-Fi Drone Scene",
    thumbnail: "https://picsum.photos/600/350?6",
    duration: "0:45",
    uses: "11.5K"
  },
];

const recommended = [
  {
    title: "AI Studio Lighting Pack",
    description: "Enhance portrait scenes with dynamic AI lighting.",
    icon: Zap,
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "Landscape Atmosphere FX",
    description: "Fog, haze, depth & cinematic contrast toolkit.",
    icon: Sparkles,
    color: "from-blue-500 to-cyan-500"
  },
  {
    title: "Motion Aesthetic Overlays",
    description: "Smooth camera motion polish layer presets.",
    icon: Video,
    color: "from-green-500 to-emerald-500"
  },
];

const stats = [
  { label: "Projects Created", value: "1,248", change: "+12%", icon: TrendingUp },
  { label: "Credits Used", value: "856", change: "+8%", icon: Zap },
  { label: "Time Saved", value: "142h", change: "+23%", icon: Clock },
];

export default function DashboardHome() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden ">



      <motion.div
        className="relative z-10 space-y-12 p-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >

        {/* Header Section */}
        <motion.div variants={itemVariants} className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <motion.h1
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-5xl font-bold text-white mb-3"
              >
                Welcome to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">Pixora Studio</span> ✨
              </motion.h1>
              <p className="text-gray-300 text-xl max-w-2xl leading-relaxed">
                Create stunning visuals, animations & videos powered by cutting-edge AI technology.
                Start creating magic in seconds.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
            >
              <Rocket size={20} />
              New Project
              <Plus size={18} />
            </motion.button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="glass-card p-6 rounded-2xl border border-white/10 backdrop-blur-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                    <p className="text-green-400 text-sm font-medium mt-1 flex items-center gap-1">
                      <TrendingUp size={14} />
                      {stat.change}
                    </p>
                  </div>
                  <div className="p-3 bg-white/10 rounded-xl">
                    <stat.icon size={24} className="text-purple-400" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Creative Tools */}
        <QuickStartCards />

        {/* Popular Templates */}
        <motion.section variants={itemVariants} className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl">
                <Star size={24} className="text-white" />
              </div>
              Popular Templates
            </h2>
            <button className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 text-sm font-medium">
              Browse all <ArrowRight size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularTemplates.map((template, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className="group relative cursor-pointer"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/10">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={template.thumbnail}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      alt={template.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-3 right-3">
                      <div className="px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg text-white text-xs font-medium">
                        {template.duration}
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <div className="flex items-center justify-between">
                        <h3 className="text-white font-semibold text-lg">{template.title}</h3>
                        <div className="flex items-center gap-1 text-white/80 text-xs">
                          <Zap size={12} />
                          {template.uses}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <button className="w-full py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg font-medium transition-all duration-300 text-sm">
                      Use Template
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recommended For You */}
        <motion.section variants={itemVariants} className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Recommended for You</h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {recommended.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl cursor-pointer transition-all duration-300 hover:bg-white/10 hover:border-white/20"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-r ${item.color} w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon size={24} className="text-white" />
                </div>
                <p className="text-white font-semibold text-lg mb-2">{item.title}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                <div className="flex items-center gap-2 mt-4 text-purple-400 text-sm font-medium">
                  <span>Explore pack</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Recent Projects */}
        <motion.section variants={itemVariants}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Recent Projects</h2>
            <button className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-1 text-sm font-medium">
              View all <ArrowRight size={16} />
            </button>
          </div>
          <RecentProjectsGrid />
        </motion.section>

      </motion.div>
    </div>
  );
}