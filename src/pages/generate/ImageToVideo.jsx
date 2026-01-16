import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  Sparkles,
  Zap,
  Wand2,
  Lightbulb,
  Loader,
  Palette,
  ChevronDown,
  RefreshCw,
  Video,
  X,
  Play,
  Maximize,
  Download,
  Tag,
  MonitorPlay
} from "lucide-react";
import { downloadFile } from "../../utils/fileUtils";
import GenerationWrapper from "../../components/dashboard/GenerationWrapper";
import UnifiedGenerationLayout from "../../components/dashboard/UnifiedGenerationLayout";
import HistoryPanel from "../../components/dashboard/HistoryPanel";
import { getTemplateById, TEMPLATE_CONFIGS } from "../../services/templateSystem";
import { getActiveModels } from "../../services/modelService";
import { enhancePrompt } from "../../services/generationService";
import { generatePromptIdeas } from "../../services/promptService";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const animationStyles = [
  { id: "cinematic", name: "generator.styles.cinematic", icon: Video, gradient: "from-purple-500 to-indigo-600" },
  { id: "subtle", name: "generator.styles.subtle", icon: Sparkles, gradient: "from-blue-500 to-indigo-600" },
  { id: "dynamic", name: "generator.styles.dynamic", icon: Zap, gradient: "from-pink-500 to-rose-600" }
];

export default function ImageToVideo() {
  const { t } = useTranslation();
  const location = useLocation();

  // Extract template data from location state
  const templateData = location.state?.templateData || {};

  // Debug: Check what's actually in location.state
  useEffect(() => {
    if (templateData.prompt) {
      console.log('Template loaded from navigation in ImageToVideo:', templateData);

      // Show toast notification when template is loaded
      if (templateData.credits) {
        toast.success(
          <div>
            <div className="font-bold">Template Loaded!</div>
            <div className="text-xs text-gray-300">
              Using: {templateData.category || 'Custom'} • {templateData.credits} credits
            </div>
          </div>,
          { duration: 3000 }
        );
      }
    }
  }, [templateData]);

  // State with template data
  const [templateId, setTemplateId] = useState(() => {
    // Try to match template by category
    if (templateData.category) {
      const matchedTemplate = Object.values(TEMPLATE_CONFIGS).find(
        cfg => cfg.id.toLowerCase().includes(templateData.category.toLowerCase()) ||
          cfg.name.toLowerCase().includes(templateData.category.toLowerCase())
      );
      return matchedTemplate?.id || 'general';
    }
    return 'general';
  });
  const [imageFile, setImageFile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [prompt, setPrompt] = useState(templateData.promptText || templateData.prompt || "");
  const [extraFields, setExtraFields] = useState({});
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [loadingAiIdeas, setLoadingAiIdeas] = useState(false);
  const [aiIdeas, setAiIdeas] = useState([]);
  const [resultVideo, setResultVideo] = useState(null);
  const [activeItemId, setActiveItemId] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [dynamicParams, setDynamicParams] = useState({}); // New: Store dynamic parameters
  const [isUsingTemplate, setIsUsingTemplate] = useState(!!(templateData._id || templateData.promptText));
  const fileInputRef = useRef(null);

  const currentTemplate = getTemplateById(templateId);

  // Auto-select style based on template category
  useEffect(() => {
    if (templateData.category) {
      const category = templateData.category.toLowerCase();
      if (category.includes('business') || category.includes('professional')) {
        setSelectedStyle('cinematic');
      } else if (category.includes('subtle') || category.includes('minimal')) {
        setSelectedStyle('subtle');
      } else if (category.includes('dynamic') || category.includes('energetic') || category.includes('social')) {
        setSelectedStyle('dynamic');
      }
    }
  }, [templateData.category]);

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const response = await getActiveModels("video");
        if (response.success && response.data.models.length > 0) {
          // Filter for Image-to-Video specific models using supportedContexts
          const validModels = response.data.models.filter(m =>
            m.supportedContexts && m.supportedContexts.includes('image-to-video')
          );

          if (validModels.length > 0) {
            setAvailableModels(validModels);

            if (templateData.modelId) {
              const templateModel = validModels.find(m => m.modelId === templateData.modelId);
              if (templateModel) {
                setSelectedModel(templateModel);
                return;
              }
            }

            setSelectedModel(validModels[0]);
          }
        }
      } catch (error) {
        console.error("Failed to load models:", error);
      }
    };
    loadModels();
  }, [templateData.modelId]);

  // Effect: Initialize dynamic parameters when model changes
  useEffect(() => {
    if (selectedModel && selectedModel.parameters) {
      const initialParams = {};
      selectedModel.parameters.forEach(param => {
        initialParams[param.key] = param.defaultValue || '';
      });

      if (templateData.parameters && Object.keys(templateData.parameters).length > 0) {
        Object.entries(templateData.parameters).forEach(([key, value]) => {
          initialParams[key] = value;
        });
      }

      setDynamicParams(initialParams);
    }
  }, [selectedModel, templateData.parameters]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    setImageFile(URL.createObjectURL(file));
  };

  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleEnhancePrompt = async () => {
    if (!prompt.trim()) return;
    setIsEnhancing(true);
    try {
      const result = await enhancePrompt(prompt);
      if (result.enhancedPrompt) {
        setPrompt(result.enhancedPrompt);
        toast.success("Prompt enhanced!");
      }
    } catch (error) {
      toast.error("Failed to enhance prompt");
    } finally {
      setIsEnhancing(false);
    }
  };

  const handleAiIdeas = async () => {
    if (!prompt.trim()) return;
    setLoadingAiIdeas(true);
    try {
      const response = await generatePromptIdeas({
        context: "image-to-video",
        userInput: prompt,
        count: 3,
      });
      if (response.success) {
        setAiIdeas(response.data.prompts);
        toast.success("AI ideas generated!");
      }
    } catch (error) {
      toast.error("Failed to generate ideas");
    } finally {
      setLoadingAiIdeas(false);
    }
  };

  const handleUseIdea = (idea) => {
    setPrompt(idea);
    toast.success("Idea applied!");
  };

  const handleApplyHistory = (item) => {
    if (item.prompt) setPrompt(item.prompt);

    // Set active result if URL exists
    if (item.url || item.mediaUrl) {
      setResultVideo(item.url || item.mediaUrl);
      setActiveItemId(item._id);
    }

    if (item.style) setSelectedStyle(item.style);
    toast.success("Manifestation restored!");
  };

  const updateDynamicParam = (key, value) => {
    setDynamicParams(prev => ({ ...prev, [key]: value }));
  };

  const renderParameterInput = (param) => {
    switch (param.type) {
      case 'select':
        return (
          <div key={param.key} className="space-y-4">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.15em] flex items-center gap-2">
              <Tag size={12} className="text-blue-500/50" />
              {param.label}
            </label>
            <div className="grid grid-cols-2 xs:grid-cols-3 gap-2">
              {param.options?.map((opt) => (
                <button
                  key={opt}
                  onClick={() => updateDynamicParam(param.key, opt)}
                  className={`py-3 rounded-xl border transition-all text-[11px] font-black tracking-tight ${dynamicParams[param.key] === opt
                    ? "bg-blue-500/20 border-blue-500/50 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "bg-white/[0.03] border-white/5 text-gray-400 hover:border-white/20 hover:text-gray-200"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        );
      case 'slider':
        return (
          <div key={param.key} className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.15em] flex items-center gap-2">
                <Zap size={12} className="text-yellow-500/50" />
                {param.label}
              </label>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/30 px-2 py-0.5 rounded">
                {dynamicParams[param.key] || param.defaultValue}
              </span>
            </div>
            <input
              type="range"
              min={param.min || 0}
              max={param.max || 100}
              step={param.step || 1}
              value={dynamicParams[param.key] || param.defaultValue}
              onChange={(e) => updateDynamicParam(param.key, parseFloat(e.target.value))}
              className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer accent-cyan-400"
            />
          </div>
        );
      case 'boolean':
        return (
          <div key={param.key} className="flex items-center justify-between p-3 bg-white/[0.03] rounded-xl border border-white/5">
            <label className="text-[11px] font-black uppercase text-gray-400 tracking-wider">
              {param.label}
            </label>
            <button
              onClick={() => updateDynamicParam(param.key, !dynamicParams[param.key])}
              className={`w-10 h-6 rounded-full transition-colors relative ${dynamicParams[param.key] ? 'bg-green-500' : 'bg-gray-700'
                }`}
            >
              <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${dynamicParams[param.key] ? 'translate-x-4' : 'translate-x-0'
                }`} />
            </button>
          </div>
        );
      case 'number':
        return (
          <div key={param.key} className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.15em] px-2">
              {param.label}
            </label>
            <input
              type="number"
              min={param.min}
              max={param.max}
              step={param.step}
              value={dynamicParams[param.key] || ''}
              onChange={(e) => updateDynamicParam(param.key, parseFloat(e.target.value))}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-purple-500/50"
            />
          </div>
        );
      default:
        return (
          <div key={param.key} className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-[0.15em] px-2">
              {param.label}
            </label>
            <input
              type="text"
              value={dynamicParams[param.key] || ''}
              onChange={(e) => updateDynamicParam(param.key, e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white text-sm outline-none focus:border-purple-500/50"
              placeholder={param.defaultValue}
            />
          </div>
        );
    }
  };

  const TemplateBadge = () => (
    isUsingTemplate && (
      <div className="mb-4 p-3 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Tag className="w-4 h-4 text-purple-400" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="text-sm text-purple-300 font-medium">Using Template</span>
              <span className="text-xs px-2 py-1 bg-purple-500/30 text-purple-200 rounded-lg capitalize">
                {templateData.category || 'Custom'}
              </span>
            </div>
            {templateData.credits && (
              <div className="mt-1 text-xs text-gray-400 flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                Cost: <span className="text-yellow-400 font-bold">{templateData.credits}</span> credits
              </div>
            )}
          </div>
          <button
            onClick={() => {
              setIsUsingTemplate(false);
              toast.info("Template mode disabled");
            }}
            className="p-1.5 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
            title="Clear template"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    )
  );

  return (
    <GenerationWrapper type="video">
      {({ handleGenerate, isExhausted, freeGenerationsLeft, generationStage, realProgress, statusMessage }) => {
        const historyPanel = (
          <HistoryPanel
            typeFilter="video"
            refreshTrigger={refreshTrigger}
            onApply={handleApplyHistory}
            activeItemId={activeItemId}
          />
        );

        const onGenerateClick = async () => {
          if (!selectedFile || !prompt.trim() || isGenerating) {
            if (!selectedFile) toast.error("Please upload an image first");
            return;
          }

          setIsGenerating(true);
          setResultVideo(null); // Clear previous result to show progress

          try {
            const base64Image = await fileToBase64(selectedFile);
            const finalPrompt = templateId === 'general' ? prompt : `[${currentTemplate.name}] ${prompt} ${Object.entries(extraFields).map(([k, v]) => `${k}: ${v}`).join(', ')}`;

            const result = await handleGenerate({
              prompt: finalPrompt,
              image: base64Image,
              type: "video",
              model: selectedModel?.modelId || "kling-v1",
              ...dynamicParams
            });

            if (result.success) {
              setResultVideo(result.data.url);
              setActiveItemId(result.data._id);
              toast.success(t("generator.success.videoGenerated"));
              setRefreshTrigger(prev => prev + 1);
            }
          } catch (error) {
            console.error('[ImageToVideo] Generation error:', error);
            toast.error(error.message || t("generator.errors.generationFailed"));
          } finally {
            setIsGenerating(false);
          }
        };

        const resultView = ({ openPreview }) => resultVideo ? (
          <div className="relative group bg-black/40 rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/10 h-full flex flex-col items-center justify-center">
            <video
              src={resultVideo}
              controls
              autoPlay
              className="w-full h-full object-contain"
            />
            <div className="absolute top-4 end-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <button
                onClick={() => openPreview({ url: resultVideo, type: 'video' })}
                className="p-3 bg-black/60 backdrop-blur-md rounded-2xl text-white hover:bg-purple-500 transition-colors border border-white/10"
                title="Full Screen Preview"
              >
                <Maximize size={20} />
              </button>
              <button
                onClick={async () => {
                  const toastId = toast.loading("Preparing download...");
                  try {
                    await downloadFile(resultVideo, `pixora-motion-${Date.now()}.mp4`);
                    toast.success("Download started!", { id: toastId });
                  } catch (err) {
                    toast.error("Download failed", { id: toastId });
                  }
                }}
                className="p-3 bg-black/60 backdrop-blur-md rounded-2xl text-white hover:bg-purple-500 transition-colors border border-white/10"
                title="Download to Device"
              >
                <Download size={20} />
              </button>
            </div>
          </div>
        ) : null;


        const promptInput = (
          <div className="flex flex-col gap-8">
            <TemplateBadge />

            <div className="w-full space-y-4">
              <div className="flex items-center gap-2 text-white/40 uppercase tracking-[0.2em] text-[9px] font-black">
                <Upload size={12} className="text-purple-500/50" />
                <span>{t("generator.imageToVideo.visualSource")}</span>
              </div>
              <div
                onClick={() => !imageFile && fileInputRef.current?.click()}
                className={`group/upload relative w-full aspect-video rounded-[2rem] border-2 border-dashed transition-all duration-500 overflow-hidden flex items-center justify-center ${imageFile
                  ? "border-purple-500/50 bg-purple-500/5 cursor-default"
                  : (templateData.inputRequirements?.requiresImage || templateData.inputRequirements?.includes('image'))
                    ? "border-purple-500/50 bg-purple-500/10 cursor-pointer animate-pulse shadow-[0_0_30px_rgba(168,85,247,0.1)]"
                    : "border-white/10 bg-white/5 cursor-pointer hover:border-white/20 hover:bg-white/[0.07]"
                  }`}
              >
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />

                {imageFile ? (
                  <>
                    <img src={imageFile} className="absolute inset-0 w-full h-full object-cover rounded-[2rem]" alt="Source" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/upload:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md">
                        <RefreshCw size={16} />
                      </button>
                      <button onClick={(e) => { e.stopPropagation(); setImageFile(null); setSelectedFile(null); }} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-xl text-red-500 backdrop-blur-md">
                        <X size={16} />
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="text-center space-y-2">
                    <Upload size={32} className="text-gray-500 group-hover/upload:text-purple-400 mx-auto transition-colors" />
                    <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">{t("generator.imageToVideo.dropImage")}</p>
                  </div>
                )}
              </div>
            </div>

            <div className={`w-full space-y-4 relative group transition-all duration-300 ${isUsingTemplate && templateData.promptEditable === false ? 'opacity-80' : ''}`}>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                readOnly={isUsingTemplate && templateData.promptEditable === false}
                placeholder={t(currentTemplate.placeholder)}
                className={`w-full h-48 p-6 rounded-[2rem] bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/[0.07] outline-none transition-all duration-500 resize-none text-sm leading-relaxed font-medium ${isUsingTemplate && templateData.promptEditable === false ? 'cursor-not-allowed bg-white/[0.02]' : ''
                  }`}
              />
              {isUsingTemplate && templateData.promptEditable === false && (
                <div className="absolute top-4 right-6 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30 flex items-center gap-2 pointer-events-none">
                  <X size={12} className="text-purple-400" />
                  <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">Locked Prompt</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <motion.button
                whileHover={prompt.trim() ? { scale: 1.02 } : {}}
                whileTap={prompt.trim() ? { scale: 0.98 } : {}}
                onClick={handleEnhancePrompt}
                disabled={isEnhancing || !prompt.trim() || (isUsingTemplate && templateData.promptEditable === false)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${(!prompt.trim() || (isUsingTemplate && templateData.promptEditable === false))
                  ? 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
                  : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 shadow-lg shadow-purple-500/5'
                  }`}
              >
                <Wand2 size={14} className={isEnhancing ? "animate-spin" : ""} />
                <span>{isEnhancing ? t("generator.studio.enhancing") : t("generator.studio.enhance")}</span>
              </motion.button>

              <motion.button
                whileHover={prompt.trim() ? { scale: 1.02 } : {}}
                whileTap={prompt.trim() ? { scale: 0.98 } : {}}
                onClick={handleAiIdeas}
                disabled={loadingAiIdeas || !prompt.trim() || (isUsingTemplate && templateData.promptEditable === false)}
                className={`flex-1 min-w-[140px] flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${(!prompt.trim() || (isUsingTemplate && templateData.promptEditable === false))
                  ? 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
                  : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 shadow-lg shadow-blue-500/5'
                  }`}
              >
                <Lightbulb size={14} className={loadingAiIdeas ? "animate-spin" : ""} />
                <span>{loadingAiIdeas ? t("generator.studio.loadingIdeas") : t("generator.studio.ideas")}</span>
              </motion.button>
            </div>

            {/* AI Ideas Panel - Structured and Dismissible */}
            <AnimatePresence>
              {aiIdeas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 10 }}
                  className="mt-6"
                >
                  <div className="relative p-6 bg-[#161616] border border-white/10 rounded-[2rem] shadow-2xl">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                          <Lightbulb className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest text-white">AI Suggestions</span>
                      </div>
                      <button
                        onClick={() => setAiIdeas([])}
                        className="p-2 hover:bg-white/10 rounded-xl text-gray-400 hover:text-white transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {aiIdeas.map((idea, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.05)" }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleUseIdea(idea)}
                          className="group p-4 bg-white/[0.02] text-left rounded-2xl text-xs text-gray-400 hover:text-white transition-all border border-white/5 hover:border-blue-500/30 flex items-start gap-3"
                        >
                          <div className="mt-0.5 p-1 bg-white/5 rounded-md group-hover:bg-blue-500/20 transition-colors">
                            <ArrowRight size={10} className="text-gray-500 group-hover:text-blue-400" />
                          </div>
                          <span className="flex-1 leading-relaxed font-medium">
                            {idea}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <p className="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-widest opacity-60">
              {t(currentTemplate.helperText)}
            </p>
          </div>
        );

        const modelSelector = (
          <div className="relative min-w-[80px] md:min-w-[100px] max-w-[130px] md:max-w-none">
            <div className="relative">
              <select
                value={selectedModel?.modelId || ''}
                onChange={(e) => {
                  const model = availableModels.find(m => m.modelId === e.target.value);
                  setSelectedModel(model);
                }}
                className="w-full appearance-none bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-wider py-1.5 pl-3 pr-8 rounded-lg border border-white/10 hover:border-white/20 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all cursor-pointer truncate"
              >
                {availableModels.map((model) => (
                  <option key={model.modelId} value={model.modelId}>
                    {model.name}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={12} />
            </div>
          </div>
        );

        const settingsPanel = (
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 md:gap-8">
            {/* Dynamic Parameters Rendering */}
            <div className="space-y-6">
              {selectedModel?.parameters?.length === 0 && (
                <p className="text-[10px] text-gray-600 font-mono text-center py-4 border border-dashed border-white/5 rounded-xl">
                  NO CONFIGURABLE PARAMETERS
                </p>
              )}
              {selectedModel?.parameters?.map(param => renderParameterInput(param))}
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-white flex items-center gap-2 uppercase tracking-widest">
                <Video size={14} className="text-purple-400" />
                {t("generator.imageToVideo.resolution")}
              </label>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-xs font-black text-gray-400 uppercase tracking-widest">
                  Matches Source Image
                </span>
              </div>
            </div>
          </div>
        );

        const actionButton = (
          <motion.button
            whileHover={selectedFile && prompt.trim() && !isGenerating ? { scale: 1.02 } : {}}
            whileTap={selectedFile && prompt.trim() && !isGenerating ? { scale: 0.98 } : {}}
            onClick={onGenerateClick}
            disabled={!selectedFile || !prompt.trim() || isGenerating || isExhausted}
            className={`group relative flex items-center justify-center overflow-hidden py-4 px-10 rounded-[2rem] font-black text-sm tracking-tight transition-all duration-500 ${!selectedFile || !prompt.trim() || isGenerating || isExhausted
              ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
              : "bg-white text-black hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]"
              }`}
          >
            <div className="flex items-center gap-3 relative z-10">
              {isGenerating ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span className="uppercase italic">{t("generator.imageToVideo.animating")}</span>
                </>
              ) : (
                <>
                  <Video size={20} />
                  <span className="uppercase">{t("generator.imageToVideo.animate")}</span>

                </>
              )}
            </div>
          </motion.button>
        );

        return (
          <UnifiedGenerationLayout
            title={t("generator.imageToVideo.title")}
            subtitle={t("generator.imageToVideo.subtitle")}
            promptInput={promptInput}
            settingsPanel={settingsPanel}
            actionButton={actionButton}
            historyPanel={historyPanel}
            activeItemId={activeItemId}
            resultView={resultView}
            isGenerating={isGenerating}
            generationStage={generationStage}
            realProgress={realProgress}
            statusMessage={statusMessage}
            modelSelector={modelSelector}
          />
        );
      }}
    </GenerationWrapper >
  );
}
