import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Image,
    Sparkles,
    Zap,
    Wand2,
    Lightbulb,
    Loader,
    Palette,
    RefreshCw,
    Layout,
    Star,
    Maximize,
    ChevronDown,
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

const stylePresets = [
    { id: "realistic", name: "generator.styles.realistic", icon: Image, gradient: "from-purple-500 to-indigo-600" },
    { id: "cinematic", name: "generator.styles.cinematic", icon: Sparkles, gradient: "from-blue-500 to-indigo-600" },
    { id: "artistic", name: "generator.styles.artistic", icon: Palette, gradient: "from-pink-500 to-rose-600" },
    { id: "anime", name: "generator.styles.anime", icon: Star, gradient: "from-orange-500 to-red-600" },
    { id: "3d-render", name: "generator.styles.3dRender", icon: Zap, gradient: "from-emerald-500 to-teal-600" }
];

const aspectRatios = [
    { id: "1:1", name: "1:1", label: "Square" },
    { id: "16:9", name: "16:9", label: "Landscape" },
    { id: "9:16", name: "9:16", label: "Portrait" }
];

export default function TextToImage() {
    const { t } = useTranslation();
    const location = useLocation();

    // Extract template data from location state
    const templateData = location.state?.templateData || {};

    // Debug: Check what's actually in location.state
    useEffect(() => {
        if (templateData.prompt) {
            console.log('Template loaded from navigation in TextToImage:', templateData);

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
    const [prompt, setPrompt] = useState(templateData.prompt || "");
    const [extraFields, setExtraFields] = useState({});
    const [selectedStyle, setSelectedStyle] = useState("cinematic"); // Default style
    const [selectedAspect, setSelectedAspect] = useState("1024x1024");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [loadingAiIdeas, setLoadingAiIdeas] = useState(false);
    const [aiIdeas, setAiIdeas] = useState([]);
    const [resultImage, setResultImage] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [isUsingTemplate, setIsUsingTemplate] = useState(!!templateData.prompt);

    const currentTemplate = getTemplateById(templateId);

    // Auto-select style based on template category
    useEffect(() => {
        if (templateData.category) {
            const category = templateData.category.toLowerCase();
            if (category.includes('business') || category.includes('professional')) {
                setSelectedStyle('cinematic');
            } else if (category.includes('artistic') || category.includes('creative')) {
                setSelectedStyle('artistic');
            } else if (category.includes('realistic') || category.includes('photorealistic')) {
                setSelectedStyle('realistic');
            } else if (category.includes('anime') || category.includes('manga')) {
                setSelectedStyle('anime');
            } else if (category.includes('3d') || category.includes('render')) {
                setSelectedStyle('3d-render');
            }
        }
    }, [templateData.category]);

    useEffect(() => {
        const loadModels = async () => {
            try {
                const activeModels = await getActiveModels();
                const imageModels = activeModels.filter(m => m.type === "image");
                setModels(imageModels);
                if (imageModels.length > 0) setSelectedModel(imageModels[0].modelId);
            } catch (error) {
                toast.error("Failed to load models");
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
                context: "text-to-image",
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
        <GenerationWrapper type="image">
            {({ handleGenerate, isExhausted, freeGenerationsLeft }) => {
                const onGenerateClick = async () => {
                    if (!prompt.trim() || isGenerating) return;
                    setIsGenerating(true);
                    try {
                        const finalPrompt = templateId === 'general' ? prompt : `[${currentTemplate.name}] ${prompt} ${Object.entries(extraFields).map(([k, v]) => `${k}: ${v}`).join(', ')}`;

                        const result = await handleGenerate({
                            type: "image",
                            prompt: finalPrompt,
                            style: selectedStyle,
                            aspectRatio: selectedAspect,
                            modelId: selectedModel
                        });
                        if (result.success) {
                            setResultImage(result.data.url);
                            setRefreshTrigger(prev => prev + 1);
                            toast.success("Generation started!");
                        }
                    } catch (error) {
                        toast.error(error.message || "Failed to generate image");
                    } finally {
                        setIsGenerating(false);
                    }
                };

                const resultView = ({ openPreview }) => resultImage ? (
                    <div className="relative group bg-black/40 rounded-3xl overflow-hidden border border-purple-500/30 shadow-2xl shadow-purple-500/10 h-full flex items-center justify-center">
                        <img
                            src={resultImage}
                            className="w-full h-full object-contain"
                            alt="Result"
                        />
                        <div className="absolute top-4 end-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <button
                                onClick={() => openPreview({ url: resultImage, type: 'image' })}
                                className="p-3 bg-black/60 backdrop-blur-md rounded-2xl text-white hover:bg-purple-500 transition-colors border border-white/10"
                                title="Full Screen Preview"
                            >
                                <Maximize size={20} />
                            </button>
                            <button
                                onClick={async () => {
                                    const toastId = toast.loading("Preparing download...");
                                    try {
                                        await downloadFile(resultImage, `pixora-image-${Date.now()}.png`);
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
                                className="w-full h-48 p-6 rounded-[2.5rem] bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:border-purple-500/50 focus:bg-white/[0.07] outline-none transition-all duration-500 resize-none text-sm leading-relaxed font-medium"
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
                    <div className="flex flex-col gap-8">
                        {/* Model Selection */}
                        <div className="space-y-4">
                            <label className="text-[10px] items-center gap-2 flex font-black uppercase text-gray-500 tracking-widest px-2">
                                <MonitorPlay size={12} className="text-purple-400" />
                                {t("generator.textToVideo.model")}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {["dall-e-3", "gpt-image-1", "flux-kontext-pro", "wanx-2.2-plus-img"].map((model) => (
                                    <button
                                        key={model}
                                        onClick={() => setSelectedModel(model)}
                                        className={`py-3 px-4 rounded-xl text-xs font-bold transition-all border ${selectedModel === model
                                            ? "bg-purple-500/10 border-purple-500/50 text-white shadow-[0_0_20px_rgba(168,85,247,0.15)]"
                                            : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10 hover:text-gray-200"
                                            }`}
                                    >
                                        {model}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Size Selection (Strictly Squares) */}
                        <div className="space-y-4">
                            <label className="text-xs font-bold text-white flex items-center gap-2">
                                <Maximize size={16} className="text-blue-400" />
                                Image Size
                            </label>
                            <div className="grid grid-cols-3 gap-2">
                                {["1024x1024", "512x512", "256x256"].map((size) => (
                                    <button
                                        key={size}
                                        onClick={() => setSelectedAspect(size)}
                                        className={`py-3 rounded-xl border transition-all text-xs font-bold relative group overflow-hidden ${selectedAspect === size
                                            ? "bg-blue-500/20 border-blue-500/50 text-white shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                                            : "bg-white/5 border-white/10 text-gray-400 hover:border-white/20 hover:text-gray-200"
                                            }`}
                                    >
                                        {size}
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
                        className={`group relative flex items-center justify-center overflow-hidden py-4 px-10 rounded-[2.5rem] font-black text-sm tracking-tight transition-all duration-500 ${!prompt.trim() || isGenerating || isExhausted
                            ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                            : "bg-white text-black hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]"
                            }`}
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            {isGenerating ? (
                                <>
                                    <Loader className="animate-spin" size={20} />
                                    <span className="uppercase italic">{t("generator.textToImage.visualizing")}</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    <span className="uppercase">{t("generator.textToImage.generate")}</span>

                                </>
                            )}
                        </div>
                    </motion.button>
                );

                const handleApplyHistory = (item) => {
                    if (item.prompt) setPrompt(item.prompt);
                    if (item.style) setSelectedStyle(item.style);
                    if (item.aspectRatio) setSelectedAspect(item.aspectRatio);
                    // Notify user
                    toast.success("Parameters restored from history!");
                };

                const historyPanel = <HistoryPanel typeFilter="image" refreshTrigger={refreshTrigger} onApply={handleApplyHistory} />;

                return (
                    <UnifiedGenerationLayout
                        title={t("generator.textToImage.title")}
                        subtitle={t("generator.textToImage.subtitle")}
                        // templateSelector={templateSelector}
                        promptInput={promptInput}
                        settingsPanel={settingsPanel}
                        actionButton={actionButton}
                        historyPanel={historyPanel}
                        resultView={resultView}
                    />
                );
            }}
        </GenerationWrapper>
    );
}