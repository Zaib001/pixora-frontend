import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Sparkles,
  Zap,
  Download,
  Settings,
  Palette,
  Wand2,
  Image as ImageIcon,
  Trash2,
  Star,
  Camera,
  Layers,
  Lightbulb,
  Loader
} from "lucide-react";
import CreditsBadge from "../../components/dashboard/CreditsBadge";
import GenerationWrapper from "../../components/dashboard/GenerationWrapper";

const transformationStyles = [
  {
    id: "realistic",
    name: "Photorealistic",
    icon: Camera,
    gradient: "from-purple-500 to-purple-600",
    description: "Enhanced realistic details",
    popular: true
  },
  {
    id: "artistic",
    name: "Artistic",
    icon: Palette,
    gradient: "from-purple-500 to-indigo-600",
    description: "Painterly artistic style",
    popular: false
  },
  {
    id: "cyberpunk",
    name: "Cyberpunk",
    icon: Zap,
    gradient: "from-purple-500 to-pink-600",
    description: "Neon futuristic aesthetic",
    popular: true
  },
  {
    id: "fantasy",
    name: "Fantasy",
    icon: Wand2,
    gradient: "from-purple-500 to-blue-600",
    description: "Magical fantasy realm",
    popular: false
  },
];

import { enhancePrompt } from "../../services/generationService";
import { generatePromptIdeas } from "../../services/promptService";

export default function ImageToImage() {
  const [imageInput, setImageInput] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [maskInput, setMaskInput] = useState(null);
  const [selectedMask, setSelectedMask] = useState(null);
  const [showMaskUpload, setShowMaskUpload] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [resultImage, setResultImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState("cyberpunk");
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [quality, setQuality] = useState("auto");
  const [size, setSize] = useState("auto");
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [aiIdeas, setAiIdeas] = useState([]);
  const [loadingIdeas, setLoadingIdeas] = useState(false);
  const [showIdeas, setShowIdeas] = useState(false);

  const fileInputRef = useRef(null);
  const maskInputRef = useRef(null);

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
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleAiIdeas = async () => {
    setLoadingIdeas(true);
    setShowIdeas(true);
    try {
      const result = await generatePromptIdeas({
        context: "image-to-image",
        userInput: prompt,
        count: 4
      });
      if (result.data?.prompts) {
        setAiIdeas(result.data.prompts);
      }
    } catch (error) {
      console.error("Failed to generate AI ideas:", error);
      // Fallback to static prompts
      setAiIdeas([
        "Transform into a vibrant watercolor painting with soft brush strokes",
        "Add dramatic cinematic lighting with golden hour atmosphere",
        "Convert to cyberpunk style with neon accents and futuristic elements",
        "Apply fantasy art style with magical glowing effects"
      ]);
    } finally {
      setLoadingIdeas(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedFile(file);
    const preview = URL.createObjectURL(file);
    setImageInput(preview);
  };

  const handleMaskUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setSelectedMask(file);
    const preview = URL.createObjectURL(file);
    setMaskInput(preview);
  };

  const handleDownload = () => {
    if (!resultImage) return;
    const link = document.createElement('a');
    link.href = resultImage;
    link.download = `transformed-${Date.now()}.png`;
    link.click();
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <GenerationWrapper type="image">
      {({ handleGenerate, isFreeTier, isExhausted, creditsRemaining, freeGenerationsLeft }) => {

        const onGenerateClick = async () => {
          if (!selectedFile || !prompt.trim() || isGenerating) return;

          setIsGenerating(true);
          setResultImage(null);

          try {
            // Convert image to Base64
            const base64Image = await fileToBase64(selectedFile);

            // Convert mask to Base64 if provided
            let base64Mask = null;
            if (selectedMask) {
              base64Mask = await fileToBase64(selectedMask);
            }

            const result = await handleGenerate({
              prompt: prompt,
              image: base64Image,
              mask: base64Mask,
              style: selectedStyle,
              type: 'image',
              modelId: 'gpt-image-1',
              quality: quality,
              size: size,
              n: 1
            });

            if (result.success) {
              setResultImage(result.data.url);
            }
          } catch (error) {
            console.error("ImageToImage error:", error);
          } finally {
            setIsGenerating(false);
          }
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
                      <Wand2 size={28} className="text-white" />
                    </div>
                    Image → Image
                  </h1>
                  <p className="text-xl text-gray-300">
                    Transform and enhance your images with AI magic
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
                  {/* Upload Card */}
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Upload size={20} className="text-purple-400" />
                        Upload Base Image
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">Required</span>
                      </div>
                    </div>

                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center cursor-pointer 
                      transition-all duration-300 hover:border-purple-500/50 hover:bg-white/5 group relative overflow-hidden"
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <div className="space-y-3 relative z-10">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                          <Upload size={24} className="text-purple-400" />
                        </div>
                        <p className="text-gray-300 font-medium">Click to upload or drag and drop</p>
                        <p className="text-gray-500 text-sm">PNG, JPG, WEBP up to 25MB</p>
                      </div>
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                    </div>

                    <AnimatePresence>
                      {imageInput && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="relative group">
                            <img
                              src={imageInput}
                              alt="Uploaded"
                              className="w-full rounded-xl object-cover shadow-lg max-h-64"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center gap-2">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => fileInputRef.current?.click()}
                                className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-300"
                              >
                                Replace
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                onClick={() => { setImageInput(null); setSelectedFile(null); }}
                                className="px-4 py-2 bg-red-500/80 hover:bg-red-500 text-white rounded-lg transition-all duration-300 flex items-center gap-2"
                              >
                                <Trash2 size={16} />
                                Remove
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Optional Mask Upload */}
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Layers size={20} className="text-purple-400" />
                        Mask Image (Optional)
                      </h3>
                      <button
                        onClick={() => setShowMaskUpload(!showMaskUpload)}
                        className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        {showMaskUpload ? 'Hide' : 'Show'}
                      </button>
                    </div>

                    <AnimatePresence>
                      {showMaskUpload && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-3 overflow-hidden"
                        >
                          <p className="text-sm text-gray-400">
                            Upload a mask to specify which regions to edit. Transparent areas (alpha = 0) will be edited.
                          </p>

                          <div
                            onClick={() => maskInputRef.current?.click()}
                            className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center cursor-pointer 
                            transition-all duration-300 hover:border-purple-500/50 hover:bg-white/5 group"
                          >
                            <input
                              ref={maskInputRef}
                              type="file"
                              accept="image/png"
                              onChange={handleMaskUpload}
                              className="hidden"
                            />
                            <div className="space-y-2">
                              <Layers size={20} className="text-purple-400 mx-auto" />
                              <p className="text-gray-400 text-sm">Click to upload mask (PNG only)</p>
                            </div>
                          </div>

                          {maskInput && (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="relative group"
                            >
                              <img
                                src={maskInput}
                                alt="Mask"
                                className="w-full rounded-xl object-cover shadow-lg max-h-32"
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center">
                                <motion.button
                                  whileHover={{ scale: 1.05 }}
                                  onClick={() => { setMaskInput(null); setSelectedMask(null); }}
                                  className="px-3 py-1 bg-red-500/80 hover:bg-red-500 text-white rounded-lg text-sm"
                                >
                                  Remove Mask
                                </motion.button>
                              </div>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Style Selection */}
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <Palette size={20} className="text-purple-400" />
                      Transformation Style
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {transformationStyles.map((style) => {
                        const Icon = style.icon;
                        const isSelected = selectedStyle === style.id;
                        return (
                          <motion.button
                            key={style.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedStyle(style.id)}
                            className={`p-4 rounded-xl border-2 transition-all duration-300 text-left relative overflow-hidden group ${isSelected
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
                            <label className="text-sm text-gray-400 mb-2 block">Quality</label>
                            <select
                              value={quality}
                              onChange={(e) => setQuality(e.target.value)}
                              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-purple-500 outline-none"
                            >
                              <option value="auto">Auto</option>
                              <option value="high">High</option>
                              <option value="medium">Medium</option>
                              <option value="low">Low</option>
                            </select>
                          </div>
                          <div>
                            <label className="text-sm text-gray-400 mb-2 block">Output Size</label>
                            <select
                              value={size}
                              onChange={(e) => setSize(e.target.value)}
                              className="w-full p-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:border-purple-500 outline-none"
                            >
                              <option value="auto">Auto</option>
                              <option value="1024x1024">1024×1024</option>
                              <option value="1536x1024">1536×1024</option>
                              <option value="1024x1536">1024×1536</option>
                            </select>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Prompt Input */}
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 p-6 space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Sparkles size={20} className="text-purple-400" />
                        Transformation Prompt
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
                    </div>
                    <div className="relative">
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        placeholder="Describe how you want to transform the image... 
    Example: Add sunglasses and a hat, make it look like a professional photo..."
                        className="w-full p-4 rounded-xl bg-white/5 border border-white/10 
                        text-white placeholder-gray-500 min-h-[120px] resize-none
                        focus:border-purple-500 focus:bg-white/10 outline-none transition-all duration-300"
                      />
                      <div className="absolute bottom-3 right-3">
                        <span className={`text-xs ${prompt.length > 300 ? 'text-red-400' : 'text-gray-500'
                          }`}>
                          {prompt.length}/400
                        </span>
                      </div>
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

                  {/* Generate Button */}
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onGenerateClick}
                    disabled={!selectedFile || !prompt.trim() || isGenerating || isExhausted}
                    className={`w-full py-4 px-6 rounded-2xl font-semibold text-lg transition-all duration-300 relative overflow-hidden
                    ${!selectedFile || !prompt.trim() || isGenerating || isExhausted
                        ? "bg-gray-600/50 text-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:shadow-xl hover:shadow-purple-500/25"
                      }`}
                  >
                    {/* Animated background shine */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                    {isGenerating ? (
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Transforming Image...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3 relative z-10">
                        <Wand2 size={20} />
                        <span>
                          {freeGenerationsLeft > 0
                            ? `Generate Transformed Image (Free - ${freeGenerationsLeft} left)`
                            : `Generate Transformed Image (1 Credit)`}
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
                        <Sparkles size={20} className="text-purple-400" />
                        Transformed Result
                      </h3>
                      {resultImage && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          whileHover={{ scale: 1.05 }}
                          onClick={handleDownload}
                          className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl 
                          flex items-center gap-2 text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        >
                          <Download size={16} />
                          Download
                        </motion.button>
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
                              <Wand2 className="absolute inset-0 m-auto text-purple-400" size={20} />
                            </div>
                            <div className="text-center">
                              <p className="font-semibold text-lg">Transforming Your Image</p>
                              <p className="text-gray-400">Applying {selectedStyle} style with AI magic...</p>
                            </div>
                          </motion.div>
                        ) : resultImage ? (
                          <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="w-full h-full relative group"
                          >
                            <img
                              src={resultImage}
                              alt="Transformed Result"
                              className="w-full h-full object-contain rounded-xl shadow-2xl max-h-[500px]"
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
                                  Use This Image
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
                              <ImageIcon size={32} className="text-gray-600 group-hover:text-purple-400 transition-colors" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-400 text-lg">Your Transformed Image Awaits</p>
                              <p className="text-sm text-gray-600 mt-1">Upload an image and describe your vision to see the magic</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Result Info */}
                    {resultImage && (
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
                          <p className="text-gray-400">Quality</p>
                          <p className="text-white font-medium capitalize">{quality}</p>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-gray-400">Model</p>
                          <p className="text-white font-medium">GPT-Image-1</p>
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