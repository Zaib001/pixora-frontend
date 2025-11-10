import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { 
  Video, 
  Sparkles, 
  Zap, 
  Play, 
  Download, 
  Share2,
  Clock,
  Settings,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  Wand2,
  Palette,
  Star,
  RefreshCw
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";

const promptExamples = [
  "A futuristic neon-lit Tokyo street with flying cars and holographic advertisements at night",
  "A serene mountain landscape at sunrise with misty valleys and golden light",
  "An underwater coral reef with colorful fish and sunbeams filtering through the water",
  "A steampunk city with brass machinery, steam vents, and Victorian architecture"
];

const videoStyles = [
  { 
    id: "cinematic", 
    name: "Cinematic", 
    icon: Video, 
    gradient: "from-purple-500 to-indigo-600",
    description: "Movie-style dramatic sequences",
    popular: true
  },
  { 
    id: "animated", 
    name: "Animated", 
    icon: Sparkles, 
    gradient: "from-purple-500 to-pink-600",
    description: "Stylized animation effects",
    popular: false
  },
  { 
    id: "realistic", 
    name: "Realistic", 
    icon: TrendingUp, 
    gradient: "from-purple-500 to-blue-600",
    description: "Photorealistic motion",
    popular: true
  },
  { 
    id: "artistic", 
    name: "Artistic", 
    icon: Palette, 
    gradient: "from-purple-500 to-violet-600",
    description: "Painterly artistic style",
    popular: false
  }
];

export default function TextToVideo() {
  const { credits } = useSelector((state) => state.credits);
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [duration, setDuration] = useState(5);
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultVideo, setResultVideo] = useState(null);
  const [selectedExample, setSelectedExample] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim() || isGenerating) return;

    setIsGenerating(true);
    setResultVideo(null);

    setTimeout(() => {
      setResultVideo("https://samplelib.com/lib/preview/mp4/sample-5s.mp4");
      setIsGenerating(false);
    }, 3000);
  };

  const handleUseExample = (example) => {
    setPrompt(example);
    setSelectedExample(example);
  };

  const handleDownload = () => {
    if (!resultVideo) return;
    const link = document.createElement('a');
    link.href = resultVideo;
    link.download = `ai-video-${Date.now()}.mp4`;
    link.click();
  };

  const handleShare = () => {
    if (!resultVideo) return;
    navigator.share?.({
      title: 'AI Generated Video',
      text: prompt,
      url: resultVideo,
    });
  };

  const handleRegenerate = () => {
    handleGenerate();
  };

  return (
    <div className="min-h-screen  p-8">

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-violet-500/15 rounded-full blur-3xl animate-pulse delay-500" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_70%)]" />
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
              <div className="p-3 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/25">
                <Video size={28} className="text-white" />
              </div>
              Text → Video
            </h1>
            <p className="text-xl text-gray-300">
              Transform your ideas into stunning videos with AI
            </p>
          </div>
          <div className="flex items-center gap-4">
            <CreditsBadge />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`p-3 rounded-xl border transition-all duration-300 ${
                showAdvanced 
                  ? "bg-purple-500/20 border-purple-500/50 text-white shadow-lg shadow-purple-500/25" 
                  : "bg-white/5 border-white/10 text-gray-400 hover:text-white hover:border-white/20"
              }`}
            >
              <Settings size={20} />
            </motion.button>
          </div>
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
            {/* Prompt Input */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Zap size={20} className="text-purple-400" />
                  Describe Your Video
                </h3>
                <div className="flex items-center gap-2">
                  <span className={`text-xs ${
                    prompt.length > 400 ? 'text-red-400' : 'text-gray-500'
                  }`}>
                    {prompt.length}/500
                  </span>
                </div>
              </div>
              
              <div className="relative">
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the scene, mood, camera movements, and details you want in your video..."
                  className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 
                    text-white placeholder-gray-500 focus:border-purple-500 focus:bg-white/10 
                    outline-none transition-all duration-300 resize-none"
                  maxLength={500}
                />
              </div>
              
              {/* Prompt Examples */}
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-3 flex items-center gap-2">
                  <Lightbulb size={16} className="text-purple-400" />
                  Need inspiration? Try these:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {promptExamples.map((example, index) => (
                    <motion.button
                      key={index}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUseExample(example)}
                      className={`p-3 rounded-xl border-2 text-left transition-all duration-300 ${
                        selectedExample === example
                          ? 'bg-purple-500/10 text-white border-purple-500'
                          : 'bg-white/5 text-gray-400 border-white/10 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{example}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            {/* Video Style Selection */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                <Palette size={20} className="text-purple-400" />
                Video Style
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {videoStyles.map((style) => {
                  const Icon = style.icon;
                  const isSelected = selectedStyle === style.id;
                  return (
                    <motion.button
                      key={style.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`p-4 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden group ${
                        isSelected
                          ? `border-purple-500 bg-gradient-to-br ${style.gradient} text-white shadow-lg shadow-purple-500/25`
                          : "border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white"
                      }`}
                    >
                      {/* Popular Badge */}
                      {style.popular && (
                        <div className="absolute -top-1 -right-1">
                          <div className="bg-purple-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                            <Star size={10} />
                            Popular
                          </div>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          isSelected ? 'bg-white/20' : 'bg-white/5'
                        }`}>
                          <Icon size={18} />
                        </div>
                        <div className="text-left">
                          <p className="font-medium text-sm">{style.name}</p>
                          <p className="text-xs opacity-80 mt-1">{style.description}</p>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Duration & Advanced Settings */}
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Duration Slider */}
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block flex items-center gap-2">
                    <Clock size={16} className="text-purple-400" />
                    Duration: {duration}s
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="15"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value))}
                    className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>3s</span>
                    <span>15s</span>
                  </div>
                </div>
                
                {/* Advanced Settings */}
                <div>
                  <label className="text-sm font-semibold text-white mb-3 block flex items-center gap-2">
                    <Settings size={16} className="text-purple-400" />
                    Video Settings
                  </label>
                  <div className="space-y-2">
                    <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-purple-500 outline-none">
                      <option>Resolution: 1080p</option>
                      <option>Resolution: 720p</option>
                      <option>Resolution: 4K</option>
                    </select>
                    <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-purple-500 outline-none">
                      <option>Frame rate: 30fps</option>
                      <option>Frame rate: 24fps</option>
                      <option>Frame rate: 60fps</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Advanced Settings Panel */}
            <AnimatePresence>
              {showAdvanced && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4 overflow-hidden"
                >
                  <h3 className="text-lg font-semibold text-white">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Motion Intensity</label>
                      <input 
                        type="range" 
                        min="1" 
                        max="10" 
                        defaultValue="7"
                        className="w-full accent-purple-500"
                      />
                      <div className="flex justify-between text-xs text-gray-400 mt-1">
                        <span>Subtle</span>
                        <span>Dynamic</span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400 mb-2 block">Camera Movement</label>
                      <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-purple-500 outline-none">
                        <option>Slow Pan</option>
                        <option>Orbital</option>
                        <option>Dolly Zoom</option>
                        <option>Static</option>
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleGenerate}
              disabled={!prompt.trim() || isGenerating}
              className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden
                ${
                  !prompt.trim() || isGenerating
                    ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-xl hover:shadow-purple-500/25"
                }`}
            >
              {/* Animated background shine */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {isGenerating ? (
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Generating Video...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-3 relative z-10">
                  <Sparkles size={20} />
                  <span>Generate Video ({credits} credits)</span>
                  <ArrowRight size={16} />
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
            <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4 h-full flex flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Play size={20} className="text-purple-400" />
                  Video Preview
                </h3>
                {resultVideo && (
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleDownload}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl 
                        flex items-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                    >
                      <Download size={16} />
                      Download
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleShare}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/10"
                    >
                      <Share2 size={16} />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleRegenerate}
                      className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-all duration-300 border border-white/10"
                    >
                      <RefreshCw size={16} />
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="flex-1 flex items-center justify-center rounded-xl border-2 border-dashed border-white/10 bg-white/5 relative overflow-hidden min-h-[500px]">
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
                        <p className="font-semibold text-lg">Creating Your Video</p>
                        <p className="text-gray-400">This may take a few moments...</p>
                      </div>
                    </motion.div>
                  ) : resultVideo ? (
                    <motion.div
                      key="video"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="w-full h-full relative group"
                    >
                      <video
                        src={resultVideo}
                        controls
                        className="w-full h-full object-contain rounded-xl shadow-2xl max-h-[500px] bg-black"
                        autoPlay
                        loop
                        muted
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center p-6"
                        whileHover={{ opacity: 1 }}
                      >
                        <div className="flex gap-3">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                          >
                            Use This Video
                          </motion.button>
                        </div>
                      </motion.div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="placeholder"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center text-gray-500 space-y-3"
                    >
                      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto group hover:border-purple-500/50 transition-colors border-2 border-dashed border-white/20">
                        <Video size={32} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-400 text-lg">Your Video Awaits</p>
                        <p className="text-sm text-gray-600 mt-1">Describe your vision and generate your first AI video</p>
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
                  className="grid grid-cols-3 gap-4 text-center text-sm mt-4"
                >
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400">Duration</p>
                    <p className="text-white font-medium">{duration}s</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400">Style</p>
                    <p className="text-white font-medium capitalize">{selectedStyle}</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400">Format</p>
                    <p className="text-white font-medium">MP4</p>
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