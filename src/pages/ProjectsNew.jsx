// src/pages/ProjectsNew.jsx
import { motion } from "framer-motion";
import { ArrowLeft, Video, Image, Music, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectsNew() {
  const navigate = useNavigate();

  const projectTypes = [
    {
      icon: Video,
      title: "AI Video Generation",
      description: "Create stunning videos with AI-powered tools",
      color: "from-purple-500 to-pink-500",
      features: ["Text-to-video", "Style transfer", "Auto-editing"]
    },
    {
      icon: Image,
      title: "Image to Video",
      description: "Transform your images into animated videos",
      color: "from-blue-500 to-cyan-500",
      features: ["Image animation", "Motion effects", "Transitions"]
    },
    {
      icon: Music,
      title: "Video with Audio",
      description: "Create videos with background music and voiceovers",
      color: "from-green-500 to-emerald-500",
      features: ["Audio sync", "Voice generation", "Music library"]
    },
    {
      icon: Upload,
      title: "Custom Upload",
      description: "Start from your own media files",
      color: "from-orange-500 to-red-500",
      features: ["Multiple formats", "Cloud storage", "Collaboration"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 p-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate(-1)}
          className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </motion.button>
        <div>
          <h1 className="text-3xl font-bold text-white">Create New Project</h1>
          <p className="text-gray-300">Choose how you want to create your video</p>
        </div>
      </div>

      {/* Project Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {projectTypes.map((type, index) => (
          <motion.div
            key={type.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, y: -5 }}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg hover:border-white/20 transition-all duration-300 cursor-pointer group"
            onClick={() => navigate('/projects/editor')}
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-r ${type.color} shadow-lg`}>
                <type.icon className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-white mb-2">{type.title}</h3>
                <p className="text-gray-300 mb-4">{type.description}</p>
                <div className="flex flex-wrap gap-2">
                  {type.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 bg-white/10 rounded-lg text-xs text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Templates */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 max-w-6xl mx-auto"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Recent Templates</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-purple-500 transition-colors cursor-pointer"
            >
              <div className="aspect-video bg-white/10 rounded-lg mb-3 flex items-center justify-center">
                <Video className="w-8 h-8 text-gray-400" />
              </div>
              <h4 className="text-white font-semibold">Template {item}</h4>
              <p className="text-gray-400 text-sm">Popular choice</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}