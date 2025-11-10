import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Upload, 
  Play, 
  Video, 
  Sparkles, 
  Download, 
  Settings,
  Zap,
  Clock,
  Wand2
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";

const animationStyles = [
  { 
    id: "cinematic", 
    name: "Cinematic", 
    description: "Movie-style camera movements",
    duration: "15s",
    icon: Video
  },
  { 
    id: "subtle", 
    name: "Subtle Motion", 
    description: "Gentle, natural movements",
    duration: "10s",
    icon: Sparkles
  },
  { 
    id: "dynamic", 
    name: "Dynamic", 
    description: "Energetic and dramatic",
    duration: "20s",
    icon: Zap
  },
];

export default function ImageToVideo() {
  const [imageFile, setImageFile] = useState(null);
  const [resultVideo, setResultVideo] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const preview = URL.createObjectURL(file);
    setImageFile(preview);
  };

  const handleGenerate = () => {
    if (!imageFile) return;

    setIsGenerating(true);
    setResultVideo(null);

    setTimeout(() => {
      setResultVideo("https://samplelib.com/lib/preview/mp4/sample-10s.mp4");
      setIsGenerating(false);
    }, 3000);
  };

  const handleDownload = () => {
    if (!resultVideo) return;
    // Simulate download
    const link = document.createElement('a');
    link.href = resultVideo;
    link.download = 'animated-video.mp4';
    link.click();
  };

  return (
    <div className="min-h-screen p-8">

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-lg shadow-purple-500/25">
                <Play size={28} className="text-white" />
              </div>
              Image → Video
            </h1>
            <p className="text-xl text-gray-300">
              Bring your images to life with AI-powered animation
            </p>
          </div>
          <CreditsBadge />
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

          {/* Input Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Upload Card */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Upload size={20} />
                  Upload Image
                </h3>
                <button 
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Settings size={18} />
                </button>
              </div>

              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer 
                  transition-all duration-300 hover:border-purple-500/50 hover:bg-white/5 group"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <div className="space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                    <Upload size={24} className="text-purple-400" />
                  </div>
                  <p className="text-gray-300 font-medium">Click to upload or drag and drop</p>
                  <p className="text-gray-500 text-sm">PNG, JPG, WEBP up to 20MB</p>
                </div>
              </div>

              <AnimatePresence>
                {imageFile && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="relative group">
                      <img
                        src={imageFile}
                        alt="Uploaded"
                        className="w-full rounded-xl object-cover shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                        <button 
                          onClick={() => setImageFile(null)}
                          className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Animation Style Selection */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Video size={20} />
                Animation Style
              </h3>
              <div className="space-y-3">
                {animationStyles.map((style) => {
                  const Icon = style.icon;
                  const isSelected = selectedStyle === style.id;
                  return (
                    <motion.button
                      key={style.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                        isSelected
                          ? "border-purple-500 bg-purple-500/10 text-white"
                          : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${
                            isSelected ? 'bg-purple-500/20' : 'bg-white/5'
                          }`}>
                            <Icon size={18} className={isSelected ? 'text-purple-400' : 'text-gray-400'} />
                          </div>
                          <div className="text-left">
                            <p className="font-medium">{style.name}</p>
                            <p className="text-sm opacity-80">{style.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                          <Clock size={14} />
                          {style.duration}
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Advanced Settings */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4 overflow-hidden"
                >
                  <h3 className="text-lg font-semibold text-white">Advanced Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Video Length</label>
                      <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-purple-500 outline-none">
                        <option>10 seconds</option>
                        <option>15 seconds</option>
                        <option>20 seconds</option>
                        <option>30 seconds</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Resolution</label>
                      <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-purple-500 outline-none">
                        <option>720p</option>
                        <option>1080p</option>
                        <option>2K</option>
                        <option>4K</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400 mb-2 block">Motion Intensity</label>
                    <input 
                      type="range" 
                      min="1" 
                      max="10" 
                      defaultValue="5"
                      className="w-full accent-purple-500"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={!imageFile || isGenerating}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300
                ${
                  !imageFile || isGenerating
                    ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-xl hover:shadow-purple-500/25"
                }`}
            >
              {isGenerating ? (
                <div className="flex items-center justify-center gap-3">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Animating Image...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3">
                  <Wand2 size={20} />
                  <span>Generate Video</span>
                </div>
              )}
            </motion.button>
          </motion.div>

          {/* Output Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-6"
          >
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4 h-full">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Sparkles size={20} />
                  Animated Result
                </h3>
                {resultVideo && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    onClick={handleDownload}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg 
                      flex items-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all"
                  >
                    <Download size={16} />
                    Download
                  </motion.button>
                )}
              </div>

              <div className="flex items-center justify-center min-h-[500px] rounded-xl border-2 border-dashed border-white/10 bg-white/5 relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {isGenerating ? (
                    <motion.div
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 text-white"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin" />
                        <Video className="absolute inset-0 m-auto text-purple-400" size={20} />
                      </div>
                      <div className="text-center">
                        <p className="font-semibold">Animating your image</p>
                        <p className="text-gray-400 text-sm">Creating smooth motion and transitions...</p>
                      </div>
                    </motion.div>
                  ) : resultVideo ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-full"
                    >
                      <video
                        src={resultVideo}
                        controls
                        className="w-full h-full object-contain rounded-xl shadow-2xl"
                        autoPlay
                        loop
                        muted
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-500 space-y-3"
                    >
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto">
                        <Play size={32} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-400">Your animated video will appear here</p>
                        <p className="text-sm text-gray-600">Upload an image to bring it to life with motion</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Video Info */}
              {resultVideo && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="grid grid-cols-3 gap-4 text-center text-sm"
                >
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400">Duration</p>
                    <p className="text-white font-medium">15s</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400">Resolution</p>
                    <p className="text-white font-medium">1080p</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400">Style</p>
                    <p className="text-white font-medium capitalize">{selectedStyle}</p>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}