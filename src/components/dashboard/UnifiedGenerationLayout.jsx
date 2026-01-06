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
    generationStage
}) {
    const { t } = useTranslation();
    const [showHistory, setShowHistory] = React.useState(false);

    // Preview Modal State
    const [isPreviewOpen, setIsPreviewOpen] = React.useState(false);
    const [previewContent, setPreviewContent] = React.useState(null); // { url, type: 'image' | 'video' }

    // Pre-render resultView to check if it actually returns content
    const renderedResult = typeof resultView === 'function'
        ? resultView({ openPreview: (data) => { setPreviewContent(data); setIsPreviewOpen(true); } })
        : resultView;

    return (
        <div className="flex h-[calc(100vh-80px)] overflow-hidden bg-[#0A0A0A] relative">
            {/* Split Workspace */}
            <div className="flex-1 lg:grid lg:grid-cols-12 h-full overflow-hidden">

                {/* 1. Left Column: Control Studio */}
                <aside className="lg:col-span-5 xl:col-span-4 h-full overflow-y-auto no-scrollbar border-e border-white/5 bg-[#0D0D0D]/50 flex flex-col">
                    <div className="p-6 md:p-8 space-y-8 flex-1">
                        {/* Compact Header */}
                        <header className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="space-y-1">
                                    <h1 className="text-2xl font-black text-white tracking-tighter uppercase flex items-center gap-2">
                                        <Sparkles className="text-purple-500" size={20} />
                                        {title}
                                    </h1>
                                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">
                                        {subtitle}
                                    </p>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowHistory(true)}
                                    className="p-3 bg-white/5 border border-white/10 rounded-2xl text-gray-400 hover:text-white transition-all shadow-lg"
                                    title="View Activity"
                                >
                                    <Clock size={16} />
                                </motion.button>
                            </div>

                            <div className="pt-4 border-t border-white/5">
                                {templateSelector}
                            </div>
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
                    <footer className="p-6 border-t border-white/5 bg-[#0A0A0A]/80 backdrop-blur-xl flex flex-col gap-4">
                        {actionButton}
                        <p className="text-[9px] text-gray-500 font-bold uppercase tracking-[0.15em] text-center opacity-60">
                            {t("generator.studio.qualityNotice")}
                        </p>
                    </footer>
                </aside>

                {/* 2. Right Column: Live Canvas */}
                <main className="lg:col-span-7 xl:col-span-8 h-full overflow-y-auto no-scrollbar bg-gradient-to-br from-[#0A0510] via-[#080808] to-[#050A10] flex flex-col p-6 md:p-10 lg:p-14 relative">
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
                                    <GenerationProgress currentStage={generationStage} />
                                </motion.div>
                            ) : renderedResult ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9, y: 30 }}
                                    className="w-full h-full max-w-7xl flex items-center justify-center p-4 lg:p-8"
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
                                    className="w-full max-w-4xl aspect-[16/10] flex items-center justify-center rounded-[3rem] border-2 border-dashed border-white/5 bg-gradient-to-br from-purple-900/5 via-black to-indigo-900/5 group hover:bg-gradient-to-br hover:from-purple-900/10 hover:via-black hover:to-indigo-900/10 transition-all duration-1000 relative overflow-hidden"
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

                                    {/* Floating particles */}
                                    {[...Array(20)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            className="absolute w-1 h-1 bg-purple-400/20 rounded-full"
                                            style={{
                                                left: `${Math.random() * 100}%`,
                                                top: `${Math.random() * 100}%`,
                                            }}
                                            animate={{
                                                y: [0, -30, 0],
                                                opacity: [0.2, 0.5, 0.2],
                                                scale: [1, 1.5, 1],
                                            }}
                                            transition={{
                                                duration: 3 + Math.random() * 2,
                                                repeat: Infinity,
                                                delay: Math.random() * 2,
                                                ease: "easeInOut"
                                            }}
                                        />
                                    ))}

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

                                            {/* Pulsing rings */}
                                            {[...Array(3)].map((_, i) => (
                                                <motion.div
                                                    key={`ring-${i}`}
                                                    className="absolute inset-0 rounded-3xl border border-purple-500/10"
                                                    initial={{ scale: 1, opacity: 0.5 }}
                                                    animate={{ scale: 1.5 + i * 0.2, opacity: 0 }}
                                                    transition={{
                                                        duration: 3,
                                                        repeat: Infinity,
                                                        delay: i * 1,
                                                        ease: "easeOut"
                                                    }}
                                                />
                                            ))}

                                            {/* Orbiting icons */}
                                            {[
                                                { Icon: Video, delay: 0, angle: 0 },
                                                { Icon: ImageIcon, delay: 0.5, angle: 90 },
                                                { Icon: Palette, delay: 1, angle: 180 },
                                                { Icon: Zap, delay: 1.5, angle: 270 }
                                            ].map(({ Icon, delay, angle }, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="absolute top-1/2 left-1/2"
                                                    style={{
                                                        marginLeft: '-12px',
                                                        marginTop: '-12px',
                                                    }}
                                                    animate={{
                                                        rotate: [angle, angle + 360],
                                                        x: [
                                                            Math.cos((angle * Math.PI) / 180) * 60,
                                                            Math.cos(((angle + 360) * Math.PI) / 180) * 60
                                                        ],
                                                        y: [
                                                            Math.sin((angle * Math.PI) / 180) * 60,
                                                            Math.sin(((angle + 360) * Math.PI) / 180) * 60
                                                        ],
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.4, 0.8, 0.4],
                                                    }}
                                                    transition={{
                                                        duration: 20,
                                                        repeat: Infinity,
                                                        delay: delay,
                                                        ease: "linear"
                                                    }}
                                                >
                                                    <div className="w-6 h-6 bg-gradient-to-br from-purple-500/30 to-indigo-500/30 rounded-lg border border-purple-500/40 flex items-center justify-center backdrop-blur-sm">
                                                        <Icon className="text-purple-300" size={14} />
                                                    </div>
                                                </motion.div>
                                            ))}
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
                    <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-[9px] font-black text-gray-600 uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                            <span>{t("generator.studio.systemIntegrated")}</span>
                        </div>
                        <span className="opacity-40">{t("generator.studio.engineVersion")}</span>
                    </div>
                </main>
            </div>

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

            {/* Slide-over History Side-Drawer */}
            <AnimatePresence>
                {showHistory && (
                    <>
                        {/* Overlay backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowHistory(false)}
                            className="absolute inset-0 z-[60] bg-black/80 backdrop-blur-sm"
                        />

                        {/* Drawer body */}
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
                                    onClick={() => setShowHistory(false)}
                                    className="p-3 hover:bg-white/5 rounded-2xl text-gray-500 hover:text-white transition-all transform hover:rotate-90"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto no-scrollbar bg-[#0A0A0A]">
                                {historyPanel}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
