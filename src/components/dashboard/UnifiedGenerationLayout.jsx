import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lightbulb, ArrowRight, Info, Clock, X, ChevronRight, Video, Image as ImageIcon, Palette, Zap, Infinity as InfinityIcon } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import GenerationProgress from '../generation/GenerationProgress';

/**
 * UnifiedGenerationLayout: Side-by-Side Studio
 * Left: Control Workbench
 * Right: Live Canvas Preview
 */
export default function UnifiedGenerationLayout({
    title,
    subtitle,
    children,
    templateSelector,
    promptInput,
    settingsPanel,
    actionButton,
    historyPanel,
    resultView,
    isGenerating,
    generationStage,
    realProgress,
    statusMessage,
    activeItemId, // New prop to track which history item is being viewed
    modelSelector // New prop for header model selection
}) {
    const { t } = useTranslation();
    const [showHistoryOverlay, setShowHistoryOverlay] = React.useState(false);
    const [isRailExpanded, setIsRailExpanded] = React.useState(false);

    // Preview Modal State
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
    const [previewContent, setPreviewContent] = React.useState(null); // { url, type: 'image' | 'video' }

    // Pre-render resultView
    const renderedResult = typeof resultView === 'function'
        ? resultView({ openPreview: (data) => { setPreviewContent(data); setIsPreviewOpen(true); } })
        : resultView;

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#0A0A0A] relative">


            {/* Split Workspace */}
            <div className="flex-1 lg:grid lg:grid-cols-12 h-full overflow-y-auto lg:overflow-hidden">

                {/* 2. Middle Column: Control Studio */}
                <aside className="lg:col-span-5 xl:col-span-4 h-auto lg:h-full lg:overflow-y-auto no-scrollbar border-e border-white/5 bg-[#0D0D0D]/50 flex flex-col relative order-2 lg:order-1">
                    <div className="p-6 md:p-8 space-y-8 flex-1">
                        {/* Compact Header */}
                        <header className="space-y-4">
                            <div className="flex items-center justify-between gap-4">
                                <div className="space-y-1">
                                    <h1 className="text-xl md:text-2xl lg:text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-2">
                                        <Sparkles className="text-purple-500" size={20} />
                                        {title}
                                    </h1>
                                    <p className="text-[10px] md:text-xs lg:text-sm text-gray-500 font-bold uppercase tracking-widest leading-none">
                                        {subtitle}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {modelSelector}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowHistoryOverlay(true)}
                                        className="lg:hidden p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all shadow-lg"
                                        title="View Activity"
                                    >
                                        <Clock size={16} />
                                    </motion.button>
                                </div>
                            </div>

                            {templateSelector && (
                                <div className="pt-4 border-t border-white/5">
                                    {templateSelector}
                                </div>
                            )}
                        </header>

                        {/* Workbench Tools */}
                        <section className="space-y-8">
                            {/* Prompt Section */}
                            <div className="space-y-3">
                                <div className="flex items-center gap-2 text-white/40 uppercase tracking-[0.2em] text-[9px] font-black">
                                    <Lightbulb size={12} className="text-yellow-500/50" />
                                    <span>{t("generator.studio.conceptualInput")}</span>
                                </div>
                                {promptInput}
                            </div>

                            {/* Settings Section */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-white/40 uppercase tracking-[0.2em] text-[9px] font-black">
                                    <Info size={12} className="text-purple-500/50" />
                                    <span>{t("generator.studio.technicalParameters")}</span>
                                </div>
                                <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5">
                                    {settingsPanel}
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Left Sticky Action Bar */}
                    <footer className="p-6 md:p-8 border-t border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex flex-col gap-4 sticky bottom-0 z-30">
                        <div className="w-full flex justify-center">
                            {actionButton}
                        </div>
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.15em] text-center opacity-60">
                            {t("generator.studio.qualityNotice")}
                        </p>
                    </footer>
                </aside>

                {/* 3. Right Column: Live Canvas */}
                <main className="lg:col-span-7 xl:col-span-8 h-auto lg:h-full lg:overflow-y-auto no-scrollbar bg-gradient-to-br from-[#0A0510] via-[#080808] to-[#050A10] flex flex-col p-4 md:p-10 lg:p-14 relative order-1 lg:order-2 min-h-[60vh] lg:min-h-0">
                    {/* Animated background effects */}
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none"
                        animate={{
                            x: [0, -50, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.3, 1],
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <div className="flex items-center gap-2 text-white/40 uppercase tracking-[0.2em] text-[10px] font-black mb-8 lg:mb-12 relative z-10">
                        <Sparkles size={14} className="text-purple-500" />
                        <span>{t("generator.studio.liveCanvas")}</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center w-full relative z-10">
                        <AnimatePresence mode="wait">
                            {isGenerating ? (
                                <motion.div
                                    key="generating"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="w-full flex items-center justify-center py-20"
                                >
                                    <GenerationProgress
                                        currentStage={generationStage}
                                        progress={realProgress}
                                        statusMessage={statusMessage}
                                    />
                                </motion.div>
                            ) : renderedResult ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                    className="w-full h-full max-w-7xl flex items-center justify-center p-0 md:p-4 lg:p-8"
                                >
                                    <div className="w-full h-full rounded-[2.5rem] lg:rounded-[3.5rem] overflow-hidden shadow-[0_0_100px_rgba(168,85,247,0.15)] bg-black/40 border border-white/5 flex flex-col">
                                        {renderedResult}
                                    </div>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="placeholder"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="w-full max-w-4xl aspect-square md:aspect-video lg:aspect-[16/10] flex items-center justify-center rounded-[2rem] md:rounded-[3rem] border-2 border-dashed border-white/5 bg-gradient-to-br from-purple-900/5 via-black to-indigo-900/5 group hover:bg-gradient-to-br hover:from-purple-900/10 hover:via-black hover:to-indigo-900/10 transition-all duration-1000 relative overflow-hidden"
                                >
                                    {/* Animated gradient orbs */}
                                    <motion.div
                                        className="absolute top-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
                                        animate={{
                                            x: [0, 100, 0],
                                            y: [0, -50, 0],
                                        }}
                                        transition={{
                                            duration: 15,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                    <motion.div
                                        className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px]"
                                        animate={{
                                            x: [0, -100, 0],
                                            y: [0, 50, 0],
                                        }}
                                        transition={{
                                            duration: 20,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />

                                    {/* Center content */}
                                    <div className="text-center space-y-6 p-12 max-w-md z-10 relative">
                                        {/* Animated icons grid */}
                                        <div className="relative w-32 h-32 mx-auto mb-8 z-20">
                                            {/* Center main icon */}
                                            <motion.div
                                                className="absolute inset-0 flex items-center justify-center"
                                                animate={{
                                                    scale: [1, 1.15, 1],
                                                    rotate: [0, 5, -5, 0]
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                            >
                                                <div className="w-24 h-24 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-3xl border border-purple-500/40 flex items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                                                    <InfinityIcon className="text-purple-400" size={40} />
                                                </div>
                                            </motion.div>
                                        </div>

                                        <h3 className="text-2xl font-black text-white/40 uppercase tracking-tighter">{t("generator.studio.creativeVoid")}</h3>
                                        <p className="text-xs text-gray-500 leading-relaxed font-bold uppercase tracking-widest opacity-60">
                                            {t("generator.studio.creativeVoidDesc")}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Bottom Status / Tip */}
                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-[9px] font-black text-gray-600 uppercase tracking-widest relative z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                            <span>{t("generator.studio.systemIntegrated")}</span>
                        </div>
                        <span className="opacity-40">{t("generator.studio.engineVersion")}</span>
                    </div>
                </main>
            </div>

            {/* 3. History Rail (Persistent Right Sidebar) */}
            <aside
                className={`hidden lg:flex flex-col border-s border-white/5 bg-[#080808] transition-all duration-500 relative z-40 ${isRailExpanded ? "w-80" : "w-16"
                    }`}
            >
                <div className="p-6 border-b border-white/5 flex items-center justify-between overflow-hidden">
                    <button
                        onClick={() => setIsRailExpanded(!isRailExpanded)}
                        className={`p-2 hover:bg-white/5 rounded-xl text-gray-500 hover:text-white transition-all ${!isRailExpanded ? "mx-auto" : ""}`}
                    >
                        {isRailExpanded ? <X size={16} /> : <Clock size={20} className="text-purple-500" />}
                    </button>

                    <AnimatePresence mode="wait">
                        {isRailExpanded && (
                            <motion.div
                                key="expanded"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="flex items-center gap-3 flex-1 ml-3"
                            >
                                <Clock className="text-purple-500 flex-shrink-0" size={18} />
                                <span className="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">
                                    {t("generator.studio.chronicle")}
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className={`flex-1 overflow-y-auto no-scrollbar transition-all duration-500 ${!isRailExpanded ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                    {/* Re-inject the historyPanel component here */}
                    {React.cloneElement(historyPanel, {
                        activeItemId: activeItemId,
                        openPreview: (data) => { setPreviewContent(data); setIsPreviewOpen(true); }
                    })}
                </div>

                {isRailExpanded && (
                    <div className="p-4 border-t border-white/5">
                        <div className="p-4 bg-purple-500/5 rounded-2xl border border-purple-500/10">
                            <p className="text-[9px] text-gray-500 font-bold uppercase tracking-widest leading-relaxed">
                                {t("Keep track of your creative journey.")}
                            </p>
                        </div>
                    </div>
                )}
            </aside>

            {/* In-App Preview Modal */}
            <AnimatePresence>
                {isPreviewOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-2xl p-4 md:p-10"
                    >
                        <motion.button
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            onClick={() => setIsPreviewOpen(false)}
                            className="absolute top-8 end-8 p-4 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-[110]"
                        >
                            <X size={24} />
                        </motion.button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full max-w-6xl aspect-video rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(168,85,247,0.2)] bg-black"
                        >
                            {previewContent?.type === 'video' ? (
                                <video
                                    src={previewContent.url}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                />
                            ) : (
                                <img
                                    src={previewContent?.url}
                                    className="w-full h-full object-contain"
                                    alt="Preview"
                                />
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Mobile-only Slide-over History Side-Drawer */}
            <AnimatePresence>
                {showHistoryOverlay && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowHistoryOverlay(false)}
                            className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="absolute end-0 top-0 bottom-0 w-full sm:w-[450px] z-[70] bg-[#0D0D0D] border-s border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col"
                        >
                            <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-black text-white uppercase tracking-tight flex items-center gap-2">
                                        <Clock className="text-purple-500" size={20} />
                                        {t("generator.studio.chronicle")}
                                    </h2>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{t("generator.studio.chronicleDesc")}</p>
                                </div>
                                <button
                                    onClick={() => setShowHistoryOverlay(false)}
                                    className="p-3 hover:bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all transform hover:rotate-90"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto no-scrollbar bg-[#0A0A0A]">
                                {React.cloneElement(historyPanel, {
                                    openPreview: (data) => { setPreviewContent(data); setIsPreviewOpen(true); }
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
