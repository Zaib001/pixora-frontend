import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import {
  Video,
  Sparkles,
  Zap,
  Play,
  Download,
  Share2,
  Settings,
  Lightbulb,
  ArrowRight,
  Palette,
  Star,
  Loader,
  RefreshCw,
  ChevronDown,
  Maximize,
  Wand2,
  Tag
} from "lucide-react";
import { downloadFile } from "../../utils/fileUtils";
import GenerationWrapper from "../../components/dashboard/GenerationWrapper";
import UnifiedGenerationLayout from "../../components/dashboard/UnifiedGenerationLayout";
import HistoryPanel from "../../components/dashboard/HistoryPanel";
import { getTemplateById, TEMPLATE_CONFIGS } from "../../services/templateSystem";
import { getActiveModels } from "../../services/modelService";
import { enhancePrompt } from "../../services/generationService";
import { generatePromptIdeas } from "../../services/promptService";
import { useLocation } from "react-router-dom";
import GenerationProgress from "../../components/generation/GenerationProgress";

const videoStyles = [
  { id: "cinematic", name: "generator.styles.cinematic", icon: Video, gradient: "from-purple-500 to-indigo-600" },
  { id: "animated", name: "generator.styles.animated", icon: Sparkles, gradient: "from-purple-500 to-pink-600" },
  { id: "realistic", name: "generator.styles.realistic", icon: Play, gradient: "from-purple-500 to-blue-600" },
  { id: "artistic", name: "generator.styles.artistic", icon: Palette, gradient: "from-purple-500 to-violet-600" }
];

export default function TextToVideo() {
  const { t } = useTranslation();
  const location = useLocation();

  // Extract template data from location state
  const templateData = location.state?.templateData || {};

  // Debug: Check what's actually in location.state
  useEffect(() => {
    if (templateData.prompt) {
      console.log('Template loaded from navigation:', templateData);

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

  // Convert duration from string "MM:SS" to seconds
  const convertDurationToSeconds = (durationStr) => {
    if (!durationStr) return 5; // Default 5 seconds

    if (typeof durationStr === 'string') {
      if (durationStr.includes(':')) {
        // Format: "MM:SS"
        const [minutes, seconds] = durationStr.split(':').map(Number);
        return (minutes * 60) + (seconds || 0);
      } else if (durationStr.includes('s')) {
        // Format: "Xs" (e.g., "30s")
        return parseInt(durationStr.replace('s', '')) || 5;
      }
    }

    // If it's already a number or can't parse
    const num = parseInt(durationStr);
    return isNaN(num) ? 5 : num;
  };

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
  const [prompt, setPrompt] = useState(templateData.prompt || "");
  const [extraFields, setExtraFields] = useState({});
  const [selectedStyle, setSelectedStyle] = useState("cinematic"); // Default style
  const [duration, setDuration] = useState(() => convertDurationToSeconds(templateData.duration));
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [resultVideo, setResultVideo] = useState(null);
  const [availableModels, setAvailableModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState(null);
  const [aiIdeas, setAiIdeas] = useState([]);
  const [loadingAiIdeas, setLoadingAiIdeas] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isUsingTemplate, setIsUsingTemplate] = useState(!!templateData.prompt);

  const currentTemplate = getTemplateById(templateId);

  // Load models
  useEffect(() => {
    const loadModels = async () => {
      try {
        const response = await getActiveModels("video");
        if (response.success && response.data.models.length > 0) {
          setAvailableModels(response.data.models);
          setSelectedModel(response.data.models[0]);
        }
      } catch (error) {
        console.error("Failed to load models:", error);
      }
    };
    loadModels();
  }, []);

  // Auto-select style based on template category
  useEffect(() => {
    if (templateData.category) {
      const category = templateData.category.toLowerCase();
      if (category.includes('business') || category.includes('professional')) {
        setSelectedStyle('cinematic');
      } else if (category.includes('social') || category.includes('entertainment')) {
        setSelectedStyle('animated');
      } else if (category.includes('education') || category.includes('personal')) {
        setSelectedStyle('realistic');
      }
    }
  }, [templateData.category]);

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

  const handleUseIdea = (idea) => {
    setPrompt(idea);
    toast.success("Idea applied!");
  };

  const handleGenerateClick = async (handleGenerate) => {
    if (!prompt.trim() || isGenerating) return;
    setIsGenerating(true);

    try {
      const finalPrompt = prompt;
      const result = await handleGenerate({
        prompt: finalPrompt,
        style: selectedStyle,
        duration,
        modelId: selectedModel?.modelId || "kling-v1",
        aspectRatio,
      });

      if (result.success) {
        setResultVideo(result.data.url);
        setRefreshTrigger(prev => prev + 1);
        toast.success("Generation started!");
      }
    } catch (error) {
      toast.error(error.message || "Failed to generate video");
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
              await downloadFile(resultVideo, `pixora-video-${Date.now()}.mp4`);
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

  const handleAiIdeas = async () => {
    if (!prompt.trim()) return;
    setLoadingAiIdeas(true);
    try {
      const response = await generatePromptIdeas({
        context: "text-to-video",
        userInput: prompt,
        style: selectedStyle,
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

  const handleApplyHistory = (item) => {
    if (item.prompt) setPrompt(item.prompt);
    if (item.style) setSelectedStyle(item.style);
    if (item.aspectRatio) setAspectRatio(item.aspectRatio);
    toast.success("Parameters restored from history!");
  };

  const historyPanel = <HistoryPanel typeFilter="video" refreshTrigger={refreshTrigger} onApply={handleApplyHistory} />;

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
      {({ handleGenerate, isExhausted, generationStage }) => {
        const onGenerateClick = () => handleGenerateClick(handleGenerate);

        const templateSelector = (
          <div className="relative group">
            <select
              value={templateId}
              onChange={(e) => {
                setTemplateId(e.target.value);
                setExtraFields({});
                setIsUsingTemplate(false);
              }}
              className="appearance-none bg-white/5 border border-white/10 rounded-2xl px-6 py-4 pe-12 text-white font-bold text-sm focus:border-purple-500 outline-none transition-all cursor-pointer min-w-[200px]"
            >
              {Object.values(TEMPLATE_CONFIGS).map(cfg => (
                <option key={cfg.id} value={cfg.id} className="bg-[#121212]">{t(cfg.name)}</option>
              ))}
            </select>
            <ChevronDown className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={18} />
          </div>
        );

        const promptInput = (
          <div className="space-y-4">
            <TemplateBadge />

            <div className="relative group">
              <div className="absolute inset-x-10 -top-px h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={t(currentTemplate.placeholder)}
                className="w-full h-48 p-6 rounded-[2rem] bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/[0.07] outline-none transition-all duration-500 resize-none text-sm leading-relaxed font-medium"
              />

              <div className="absolute end-6 bottom-6 flex items-center gap-2">
                <motion.button
                  whileHover={prompt.trim() ? { scale: 1.05 } : {}}
                  whileTap={prompt.trim() ? { scale: 0.95 } : {}}
                  onClick={handleEnhancePrompt}
                  disabled={isEnhancing || !prompt.trim()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!prompt.trim()
                    ? 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
                    : 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20 shadow-lg shadow-purple-500/5'
                    }`}
                >
                  <Wand2 size={14} className={isEnhancing ? "animate-spin" : ""} />
                  <span>{isEnhancing ? t("generator.studio.enhancing") : t("generator.studio.enhance")}</span>
                </motion.button>

                <motion.button
                  whileHover={prompt.trim() ? { scale: 1.05 } : {}}
                  whileTap={prompt.trim() ? { scale: 0.95 } : {}}
                  onClick={handleAiIdeas}
                  disabled={loadingAiIdeas || !prompt.trim()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${!prompt.trim()
                    ? 'bg-white/5 text-gray-600 border border-white/5 cursor-not-allowed'
                    : 'bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20 shadow-lg shadow-blue-500/5'
                    }`}
                >
                  <Lightbulb size={14} className={loadingAiIdeas ? "animate-spin" : ""} />
                  <span>{loadingAiIdeas ? t("generator.studio.loadingIdeas") : t("generator.studio.ideas")}</span>
                </motion.button>
              </div>
            </div>

            {/* AI Ideas Panel */}
            <AnimatePresence>
              {aiIdeas.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl">
                    <div className="flex items-center gap-2 mb-3">
                      <Lightbulb className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-bold text-white">AI Suggestions</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                      {aiIdeas.map((idea, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleUseIdea(idea)}
                          className="p-3 bg-white/5 hover:bg-white/10 text-left rounded-xl text-sm text-gray-300 hover:text-white transition-colors border border-white/5"
                        >
                          {idea.length > 80 ? `${idea.substring(0, 80)}...` : idea}
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

        const settingsPanel = (
          <div className="grid grid-cols-1 sm:grid-cols-1 gap-6 md:gap-8">
            <div className="space-y-4">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Video size={16} className="text-purple-400" />
                {t("generator.textToVideo.aspectRatio")} (Resolution)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {/* Specific Resolutions per strict API reqs */}
                {[
                  { label: "Portrait (9:16)", value: "720x1280" },
                  { label: "Landscape (16:9)", value: "1280x720" },

                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setAspectRatio(option.value)}
                    className={`py-3 rounded-2xl border text-xs font-black transition-all ${aspectRatio === option.value
                      ? "bg-white text-black border-white"
                      : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                      }`}
                  >
                    {option.label}
                    <div className="text-[9px] opacity-60 font-medium mt-0.5">{option.value}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-xs font-bold text-white flex items-center gap-2">
                <Play size={16} className="text-purple-400" />
                {t("generator.textToVideo.duration")}
                {templateData.duration && (
                  <span className="text-xs text-purple-400 ml-2">
                    (Template: {templateData.duration})
                  </span>
                )}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[4, 8, 12].map((s) => (
                  <button
                    key={s}
                    onClick={() => setDuration(s)}
                    className={`py-3 rounded-2xl border text-xs font-black transition-all ${duration === s
                      ? "bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20"
                      : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                      }`}
                  >
                    {s}s
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

        const actionButton = (
          <motion.button
            whileHover={prompt.trim() && !isGenerating ? { scale: 1.02 } : {}}
            whileTap={prompt.trim() && !isGenerating ? { scale: 0.98 } : {}}
            onClick={onGenerateClick}
            disabled={!prompt.trim() || isGenerating || isExhausted}
            className={`group relative flex items-center justify-center overflow-hidden py-4 px-10 rounded-[2rem] font-black text-sm tracking-tight transition-all duration-500 ${!prompt.trim() || isGenerating || isExhausted
              ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
              : "bg-white text-black hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]"
              }`}
          >
            <div className="flex items-center gap-3 relative z-10">
              {isGenerating ? (
                <>
                  <Loader className="animate-spin" size={20} />
                  <span className="uppercase italic">{t("generator.textToVideo.generate")}</span>
                </>
              ) : (
                <>
                  <Sparkles size={24} />
                  <span className="uppercase">{t("generator.textToVideo.generate")}</span>
                </>
              )}
            </div>
          </motion.button>
        );

        return (
          <UnifiedGenerationLayout
            title={t("generator.textToVideo.title")}
            subtitle={t("generator.textToVideo.subtitle")}
            // templateSelector={templateSelector}
            promptInput={promptInput}
            settingsPanel={settingsPanel}
            actionButton={actionButton}
            historyPanel={historyPanel}
            resultView={resultView}
            isGenerating={isGenerating}
            generationStage={generationStage}
          />
        );
      }}
    </GenerationWrapper>
  );
}