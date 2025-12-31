// TextToImage.jsx - Updated with better error handling
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  Sparkles,
  Download,
  Share2,
  RefreshCw,
  Settings,
  Plus,
  Zap,
  Wand2,
  Palette,
  Clock,
  Star,
  Frame,
  Lightbulb,
  Loader,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";
import GenerationWrapper from "../../components/dashboard/GenerationWrapper";
import { getActiveModels } from "../../services/modelService";
import { generatePromptIdeas } from "../../services/promptService";
import { toast } from "react-hot-toast";
import { enhancePrompt } from "../../services/generationService";

const stylePresets = [
  {
    id: "realistic",
    name: "Photorealistic",
    icon: Image,
    gradient: "from-purple-500 to-purple-600",
    description: "Lifelike photographic quality",
    popular: true
  },
  {
    id: "cinematic",
    name: "Cinematic",
    icon: Sparkles,
    gradient: "from-purple-500 to-indigo-600",
    description: "Movie-style dramatic lighting",
    popular: true
  },
  {
    id: "anime",
    name: "Anime",
    icon: Star,
    gradient: "from-purple-500 to-pink-600",
    description: "Japanese animation style",
    popular: false
  },
  {
    id: "3d-render",
    name: "3D Render",
    icon: Zap,
    gradient: "from-purple-500 to-blue-600",
    description: "3D computer graphics",
    popular: false
  },
  {
    id: "artistic",
    name: "Artistic",
    icon: Palette,
    gradient: "from-purple-500 to-violet-600",
    description: "Painterly and artistic",
    popular: true
  },
];

const aspectRatios = [
  { id: "1:1", name: "Square", ratio: "1:1", icon: "◼", dimensions: "1024×1024" },
  { id: "16:9", name: "Landscape", ratio: "16:9", icon: "▬", dimensions: "1536×1024" },
  { id: "9:16", name: "Portrait", ratio: "9:16", icon: "▮", dimensions: "1024×1536" },
];

export default function TextToImage() {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [selectedAspect, setSelectedAspect] = useState("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [resultImage, setResultImage] = useState(null);
  const [resultData, setResultData] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [aiIdeas, setAiIdeas] = useState([]);
  const [showIdeas, setShowIdeas] = useState(false);
  const [generatedContentId, setGeneratedContentId] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [isEnhancing, setIsEnhancing] = useState(false);

  const imageRef = useRef(null);

  // Load active models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const activeModels = await getActiveModels();
        const imageModels = activeModels.filter(m => m.type === "image");
        setModels(imageModels);
        if (imageModels.length > 0) {
          setSelectedModel(imageModels[0].modelId);
        }
      } catch (error) {
        console.error("Failed to load models:", error);
        toast.error("Failed to load AI models");
      }
    };
    loadModels();
  }, []);

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;

    setIsEnhancing(true);
    try {
      const result = await enhancePrompt(prompt);
      if (result.enhancedPrompt) {
        setPrompt(result.enhancedPrompt);
      }
    } catch (error) {
      console.error("Enhance prompt failed:", error);
      toast.error("Failed to enhance prompt");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleAiIdeas = async () => {
    setLoadingIdeas(true);
    setShowIdeas(true);
    try {
      const result = await generatePromptIdeas({
        context: "text-to-image",
        userInput: prompt,
        count: 4
      });
      if (result.data?.prompts) {
        setAiIdeas(result.data.prompts);
      }
    } catch (error) {
      console.error("Failed to generate ideas:", error);
      // Fallback to static prompts
      setAiIdeas([
        "A majestic mountain landscape at golden hour with dramatic clouds",
        "Futuristic cyberpunk cityscape with neon lights and flying vehicles",
        "Underwater coral reef teeming with colorful tropical fish",
        "Ancient mystical forest with glowing magical creatures"
      ]);
    } finally {
      setLoadingIdeas(false);
    }
  };

  const handleDownload = async () => {
    if (!resultData) return;

    try {
      // Try to download using the download endpoint
      if (generatedContentId) {
        const token = localStorage.getItem('token');
        const response = await fetch(`/api/content/download/${generatedContentId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `ai-generated-${Date.now()}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          window.URL.revokeObjectURL(url);
          toast.success('Image downloaded successfully!');
          return;
        }
      }

      // Fallback to direct download
      if (resultData.immediatePreview) {
        const link = document.createElement('a');
        link.href = resultData.immediatePreview;
        link.download = `ai-generated-${Date.now()}.png`;
        link.click();
        toast.success('Image downloaded successfully!');
      } else if (resultData.url) {
        const link = document.createElement('a');
        link.href = resultData.url;
        link.download = `ai-generated-${Date.now()}.png`;
        link.click();
        toast.success('Image downloaded successfully!');
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Failed to download image");
    }
  };

  const handleShare = async () => {
    if (!resultData || !resultData.url) return;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'AI Generated Image',
          text: prompt,
          url: resultData.url,
        });
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(resultData.url);
        toast.success('Image URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast.error('Failed to share image');
    }
  };

  const handleImageError = () => {
    console.error("Image failed to load:", resultImage);
    setImageError(true);

    // Try to use immediate preview as fallback
    if (resultData?.immediatePreview && retryCount < 2) {
      setRetryCount(prev => prev + 1);
      setResultImage(resultData.immediatePreview);
      toast.info("Retrying image display...");
    } else {
      toast.error(
        <div className="flex items-center gap-2">
          <AlertCircle className="text-red-500" size={20} />
          <span>Failed to load image. You can still download it.</span>
        </div>,
        {
          duration: 5000,
          position: 'top-right'
        }
      );
    }
  };

  const handleImageLoad = () => {
    setImageError(false);
    setRetryCount(0);
  };

  return (
    <GenerationWrapper type="image">
      {({ handleGenerate, isFreeTier, isExhausted, creditsRemaining, freeGenerationsLeft, handleDownload: downloadFromWrapper }) => {

        const onGenerateClick = async () => {
          if (!prompt.trim() || isGenerating) return;

          setIsGenerating(true);
          setResultImage(null);
          setResultData(null);
          setGeneratedContentId(null);
          setImageError(false);
          setRetryCount(0);

          try {
            const result = await handleGenerate({
              type: "image",
              prompt: prompt,
              style: selectedStyle,
              aspectRatio: selectedAspect,
              modelId: selectedModel
            });

            if (result.success) {
              // Set the result data
              setResultData(result.data);
              setGeneratedContentId(result.data.generationId);

              // Use immediate preview if available, otherwise use streaming URL
              const imageUrl = result.data.immediatePreview || result.data.url;
              setResultImage(imageUrl);

              // Show success toast
              toast.success(
                <div className="flex items-center gap-2">
                  <CheckCircle className="text-green-500" size={20} />
                  <span>Image generated successfully!</span>
                </div>,
                {
                  duration: 4000,
                  position: 'top-right'
                }
              );
            }
          } catch (error) {
            console.error("Generation failed:", error);
            toast.error(error.message || "Failed to generate image");
          } finally {
            setIsGenerating(false);
          }
        };

        const handleRegenerate = () => {
          onGenerateClick();
        };

        const handleWrapperDownload = () => {
          if (generatedContentId) {
            downloadFromWrapper(generatedContentId);
          } else {
            handleDownload();
          }
        };

        return (
          <div className="min-h-screen p-8">
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
                      <Wand2 size={28} className="text-white" />
                    </div>
                    Text → Image
                  </h1>
                  <p className="text-xl text-gray-300">
                    Transform your ideas into stunning visuals with AI
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <CreditsBadge />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAdvanced(!showAdvanced)}
                    className={`p-3 rounded-xl border transition-all duration-300 ${showAdvanced
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
                        <Sparkles size={20} className="text-purple-400" />
                        Describe Your Vision
                      </h3>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleEnhancePrompt}
                          disabled={isEnhancing || !prompt}
                          className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-all ${isEnhancing || !prompt
                            ? 'bg-white/5 text-gray-500 cursor-not-allowed'
                            : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 hover:text-purple-300 border border-purple-500/20'
                            }`}
                        >
                          <Wand2 size={14} className={isEnhancing ? "animate-spin" : ""} />
                          {isEnhancing ? "Enhancing..." : "Enhance with AI"}
                        </button>
                        <span className={`text-xs ${prompt.length > 400 ? 'text-red-400' : 'text-gray-500'
                          }`}>
                          {prompt.length}/500
                        </span>
                      </div>
                    </div>

                    <div className="relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="A majestic dragon soaring over a medieval castle at sunset, cinematic lighting, highly detailed..."
                        className="w-full h-32 p-4 rounded-xl bg-white/5 border border-white/10 
                        text-white placeholder-gray-500 focus:border-purple-500 focus:bg-white/10 
                        outline-none transition-all duration-300 resize-none"
                      />
                    </div>

                    {/* AI Ideas Button */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleAiIdeas}
                        disabled={loadingIdeas}
                        className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium flex items-center gap-2 disabled:opacity-50"
                      >
                        {loadingIdeas ? <Loader size={14} className="animate-spin" /> : <Lightbulb size={14} />}
                        {loadingIdeas ? "Generating ideas..." : "AI Ideas"}
                      </motion.button>
                    </div>

                    {/* AI Ideas Display */}
                    <AnimatePresence>
                      {showIdeas && aiIdeas.length > 0 && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2"
                        >
                          <p className="text-xs text-gray-400">Click an idea to use it:</p>
                          {aiIdeas.map((idea, idx) => (
                            <motion.button
                              key={idx}
                              whileHover={{ scale: 1.01 }}
                              onClick={() => { setPrompt(idea); setShowIdeas(false); }}
                              className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm text-gray-300 transition-all"
                            >
                              {idea}
                            </motion.button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>



                  {/* Style Presets */}
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Palette size={20} className="text-purple-400" />
                      Style Preset
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {stylePresets.map((style) => {
                        const Icon = style.icon;
                        const isSelected = selectedStyle === style.id;
                        return (
                          <motion.button
                            key={style.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`p-4 rounded-xl border-2 text-left transition-all duration-300 relative overflow-hidden group ${isSelected
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
                              <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-white/5'
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

                  {/* Aspect Ratio */}
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Frame size={20} className="text-purple-400" />
                      Aspect Ratio
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {aspectRatios.map((ratio) => (
                        <motion.button
                          key={ratio.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedAspect(ratio.id)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${selectedAspect === ratio.id
                            ? 'border-purple-500 bg-purple-500/10 text-purple-400 shadow-lg shadow-purple-500/10'
                            : 'border-white/10 bg-white/5 text-gray-400 hover:border-white/20 hover:text-white'
                            }`}
                        >
                          <div className="text-2xl mb-2">{ratio.icon}</div>
                          <div>
                            <p className="font-medium text-sm">{ratio.name}</p>
                            <p className="text-xs text-gray-500 mt-1">{ratio.dimensions}</p>
                          </div>
                        </motion.button>
                      ))}
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
                        <div className="space-y-4">
                          <div>
                            <label className="text-sm text-gray-400 mb-2 block">Quality</label>
                            <select className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-purple-500 outline-none">
                              <option>Standard (Fast)</option>
                              <option>High Quality</option>
                              <option>Ultra (Slow)</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400 mb-2 block">Guidance Scale</label>
                            <input
                              type="range"
                              min="1"
                              max="20"
                              defaultValue="7"
                              className="w-full accent-purple-500"
                            />
                            <div className="flex justify-between text-xs text-gray-400 mt-1">
                              <span>More Creative</span>
                              <span>More Accurate</span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Generate Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onGenerateClick}
                    disabled={!prompt.trim() || isGenerating || (!freeGenerationsLeft && (creditsRemaining < 1))}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden
                    ${!prompt.trim() || isGenerating || (!freeGenerationsLeft && (creditsRemaining < 1))
                        ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-xl hover:shadow-purple-500/25"
                      }`}
                  >
                    {/* Animated background shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {isGenerating ? (
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating Image...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        <Sparkles size={20} />
                        <span>
                          {freeGenerationsLeft > 0
                            ? `Generate Image (Free - ${freeGenerationsLeft} left)`
                            : `Generate Image (1 Credit)`}
                        </span>
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
                        <Image size={20} className="text-purple-400" />
                        Preview
                      </h3>
                      {resultImage && (
                        <div className="flex items-center gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={handleWrapperDownload}
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
                              <Sparkles className="absolute inset-0 m-auto text-purple-400" size={20} />
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-lg">Creating Your Masterpiece</p>
                              <p className="text-gray-400">This usually takes 10-30 seconds</p>
                            </div>
                          </motion.div>
                        ) : resultImage ? (
                          <motion.div
                            key="image"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full h-full relative group"
                          >
                            {imageError ? (
                              <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                                <AlertCircle className="text-yellow-500 mb-4" size={48} />
                                <p className="text-lg font-semibold text-white mb-2">Image Failed to Load</p>
                                <p className="text-gray-400 mb-4">You can still download the image using the download button above.</p>
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  whileTap={{ scale: 0.95 }}
                                  onClick={handleWrapperDownload}
                                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl 
                                  flex items-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                                >
                                  <Download size={16} />
                                  Download Image
                                </motion.button>
                              </div>
                            ) : (
                              <img
                                ref={imageRef}
                                src={resultImage}
                                alt="Generated artwork"
                                className="w-full h-full object-contain rounded-xl shadow-2xl max-h-[500px]"
                                onError={handleImageError}
                                onLoad={handleImageLoad}
                                crossOrigin="anonymous"
                              />
                            )}
                            {!imageError && (
                              <motion.div
                                className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl flex items-end justify-center p-6"
                                whileHover={{ opacity: 1 }}
                              >
                                <div className="flex gap-3">
                                  <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    onClick={handleWrapperDownload}
                                    className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-medium transition-colors"
                                  >
                                    Download Image
                                  </motion.button>
                                </div>
                              </motion.div>
                            )}
                          </motion.div>
                        ) : (
                          <motion.div
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center text-gray-500 space-y-3"
                          >
                            <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto group hover:border-purple-500/50 transition-colors border-2 border-dashed border-white/20">
                              <Plus size={32} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-400 text-lg">Your Creation Awaits</p>
                              <p className="text-sm text-gray-600 mt-1">Describe your vision and watch AI bring it to life</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Result Info */}
                    {resultData && !imageError && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="grid grid-cols-3 gap-4 text-center text-sm mt-4"
                      >
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-gray-400">Style Applied</p>
                          <p className="text-white font-medium capitalize">{selectedStyle}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-gray-400">Aspect Ratio</p>
                          <p className="text-white font-medium">{selectedAspect}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-gray-400">Format</p>
                          <p className="text-white font-medium">PNG</p>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        );
      }}
    </GenerationWrapper>
  );
}
