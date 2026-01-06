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
    RefreshCw,
    Layers,
    Camera,
    X,
    Plus,
    Play,
    Download,
    Maximize,
    ChevronDown,
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
import { toast } from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

const transformationStyles = [
    { id: "realistic", name: "generator.styles.realistic", icon: Camera, gradient: "from-purple-500 to-indigo-600" },
    { id: "artistic", name: "generator.styles.artistic", icon: Palette, gradient: "from-blue-500 to-indigo-600" },
    { id: "cyberpunk", name: "generator.styles.cyberpunk", icon: Zap, gradient: "from-pink-500 to-rose-600" },
    { id: "fantasy", name: "generator.styles.fantasy", icon: Wand2, gradient: "from-orange-500 to-red-600" }
];

export default function ImageToImage() {
    const { t } = useTranslation();
    const location = useLocation();

    // Extract template data from location state
    const templateData = location.state?.templateData || {};

    // Debug: Check what's actually in location.state
    useEffect(() => {
        if (templateData.prompt) {
            console.log('Template loaded from navigation in ImageToImage:', templateData);

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
    const [maskFile, setMaskFile] = useState(null);
    const [selectedMask, setSelectedMask] = useState(null);
    const [prompt, setPrompt] = useState(templateData.prompt || "");
    const [extraFields, setExtraFields] = useState({});
    const [selectedStyle, setSelectedStyle] = useState("realistic");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isEnhancing, setIsEnhancing] = useState(false);
    const [loadingAiIdeas, setLoadingAiIdeas] = useState(false);
    const [aiIdeas, setAiIdeas] = useState([]);
    const [resultImage, setResultImage] = useState(null);
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [availableModels, setAvailableModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState(null);
    const [isUsingTemplate, setIsUsingTemplate] = useState(!!templateData.prompt);
    const fileInputRef = useRef(null);
    const maskInputRef = useRef(null);

    const currentTemplate = getTemplateById(templateId);

    // Auto-select style based on template category
    useEffect(() => {
        if (templateData.category) {
            const category = templateData.category.toLowerCase();
            if (category.includes('realistic') || category.includes('professional')) {
                setSelectedStyle('realistic');
            } else if (category.includes('artistic') || category.includes('creative')) {
                setSelectedStyle('artistic');
            } else if (category.includes('cyberpunk') || category.includes('futuristic')) {
                setSelectedStyle('cyberpunk');
            } else if (category.includes('fantasy') || category.includes('magical')) {
                setSelectedStyle('fantasy');
            }
        }
    }, [templateData.category]);

    // Load models
    useEffect(() => {
        const loadModels = async () => {
            try {
                const response = await getActiveModels("image");
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

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedFile(file);
        setImageFile(URL.createObjectURL(file));
    };

    const handleMaskUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setSelectedMask(file);
        setMaskFile(URL.createObjectURL(file));
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
                context: "image-to-image",
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
                    if (!selectedFile || !prompt.trim() || isGenerating) {
                        if (!selectedFile) toast.error("Please upload a base image");
                        return;
                    }
                    setIsGenerating(true);
                    try {
                        const base64Image = await fileToBase64(selectedFile);
                        let base64Mask = null;
                        if (selectedMask) base64Mask = await fileToBase64(selectedMask);

                        const finalPrompt = templateId === 'general' ? prompt : `[${currentTemplate.name}] ${prompt} ${Object.entries(extraFields).map(([k, v]) => `${k}: ${v}`).join(', ')}`;

                        const result = await handleGenerate({
                            prompt: finalPrompt,
                            image: base64Image,
                            mask: base64Mask,
                            style: selectedStyle,
                            type: 'image',
                            modelId: selectedModel?.modelId || 'gpt-image-1',
                        });
                        if (result.success) {
                            setResultImage(result.data.url);
                            setRefreshTrigger(prev => prev + 1);
                            toast.success("Regeneration complete!");
                        }
                    } catch (error) {
                        toast.error(error.message || "Failed to refine image");
                    } finally {
                        setIsGenerating(false);
                    }
                };

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
                    <div className="flex flex-col gap-8">
                        {/* Uploads Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-1 gap-4">
                            <div className="space-y-4">
                                <label className="text-[10px] items-center gap-2 flex font-black uppercase text-gray-500 tracking-widest px-2">
                                    <Upload size={12} className="text-purple-400" />
                                    {t("generator.imageToImage.base")}
                                </label>
                                <div
                                    onClick={() => !imageFile && fileInputRef.current?.click()}
                                    className={`relative h-32 rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 overflow-hidden group/base ${imageFile
                                        ? "border-purple-500/50 bg-purple-500/5"
                                        : "border-white/10 bg-white/5 cursor-pointer hover:border-white/20 hover:bg-white/[0.07]"
                                        }`}
                                >
                                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                                    {imageFile ? (
                                        <>
                                            <img src={imageFile} className="absolute inset-0 w-full h-full object-cover rounded-[2rem]" alt="Source" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/base:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button onClick={() => fileInputRef.current?.click()} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md"><RefreshCw size={14} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); setImageFile(null); setSelectedFile(null); }} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-xl text-red-500 backdrop-blur-md"><X size={14} /></button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center space-y-1">
                                            <Upload size={20} className="text-gray-500 mx-auto" />
                                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest leading-none">{t("generator.imageToImage.source")}</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-[10px] items-center gap-2 flex font-black uppercase text-gray-500 tracking-widest px-2">
                                    <Layers size={12} className="text-blue-400" />
                                    {t("generator.imageToImage.mask")}
                                </label>
                                <div
                                    onClick={() => !maskFile && maskInputRef.current?.click()}
                                    className={`relative h-32 rounded-[2rem] border-2 border-dashed transition-all flex flex-col items-center justify-center p-4 overflow-hidden group/mask ${maskFile
                                        ? "border-blue-500/50 bg-blue-500/5"
                                        : "border-white/10 bg-white/5 cursor-pointer hover:border-white/20 hover:bg-white/[0.07]"
                                        }`}
                                >
                                    <input ref={maskInputRef} type="file" accept="image/png" onChange={handleMaskUpload} className="hidden" />
                                    {maskFile ? (
                                        <>
                                            <img src={maskFile} className="absolute inset-0 w-full h-full object-cover rounded-[2rem]" alt="Mask" />
                                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/mask:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                <button onClick={() => maskInputRef.current?.click()} className="p-2 bg-white/10 hover:bg-white/20 rounded-xl text-white backdrop-blur-md"><RefreshCw size={14} /></button>
                                                <button onClick={(e) => { e.stopPropagation(); setMaskFile(null); setSelectedMask(null); }} className="p-2 bg-red-500/20 hover:bg-red-500/40 rounded-xl text-red-500 backdrop-blur-md"><X size={14} /></button>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="text-center space-y-1">
                                            <Layers size={20} className="text-gray-500 mx-auto" />
                                            <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest leading-none">{t("generator.imageToImage.optional")}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Refinement Preset */}
                        <div className="space-y-4">
                            <label className="text-[10px] font-black text-gray-500 flex items-center gap-2 uppercase tracking-widest">
                                <Palette size={14} className="text-purple-400" />
                                {t("generator.imageToImage.refinementStyle")}
                            </label>
                            <div className="grid grid-cols-2 gap-2">
                                {transformationStyles.map(style => (
                                    <button
                                        key={style.id}
                                        onClick={() => setSelectedStyle(style.id)}
                                        className={`flex items-center gap-3 p-3 rounded-2xl border transition-all text-xs font-bold ${selectedStyle === style.id
                                            ? `bg-gradient-to-br ${style.gradient} border-white/20 text-white shadow-lg`
                                            : "bg-white/5 border-white/10 text-gray-500 hover:text-white"
                                            }`}
                                    >
                                        <style.icon size={16} />
                                        {t(style.name)}
                                    </button>
                                ))}
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
                        className={`group relative overflow-hidden py-4 px-10 rounded-[2.5rem] font-black text-sm tracking-tight transition-all duration-500 ${!selectedFile || !prompt.trim() || isGenerating || isExhausted
                            ? "bg-white/5 text-gray-600 cursor-not-allowed border border-white/5"
                            : "bg-white text-black hover:shadow-[0_0_50px_rgba(168,85,247,0.3)]"
                            }`}
                    >
                        <div className="flex items-center gap-4 relative z-10">
                            {isGenerating ? (
                                <>
                                    <Loader className="animate-spin" size={20} />
                                    <span className="uppercase italic">{t("generator.imageToImage.transforming")}</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles size={20} />
                                    <span className="uppercase">{t("generator.imageToImage.refine")}</span>
                                    <div className="flex items-center gap-1.5 ms-2 ps-3 border-s border-black/10">
                                        <Zap size={14} />
                                        <span className="text-sm italic">
                                            {isUsingTemplate && templateData.credits ?
                                                `${templateData.credits} ${t("templates.credits")}` :
                                                `2 ${t("templates.credits")}`
                                            }
                                        </span>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.button>
                );

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
                                        await downloadFile(resultImage, `pixora-refined-${Date.now()}.png`);
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

                const handleApplyHistory = (item) => {
                    if (item.prompt) setPrompt(item.prompt);
                    if (item.style) setSelectedStyle(item.style);
                    // Notify user
                    toast.success("Parameters restored from history!");
                };

                const historyPanel = <HistoryPanel typeFilter="image" refreshTrigger={refreshTrigger} onApply={handleApplyHistory} />;

                return (
                    <UnifiedGenerationLayout
                        title={t("generator.imageToImage.title")}
                        subtitle={t("generator.imageToImage.subtitle")}
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