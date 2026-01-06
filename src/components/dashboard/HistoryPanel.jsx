import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Play,
    Image as ImageIcon,
    Clock,
    RefreshCw,
    ExternalLink,
    ChevronRight,
    Video,
    FileText,
    Sparkles,
    Download,
    Maximize,
    Loader2
} from "lucide-react";
import { getGenerationHistory } from "../../services/generationService";
import { formatDistanceToNow } from "date-fns";
import { downloadFile } from "../../utils/fileUtils";

export default function HistoryPanel({ typeFilter, refreshTrigger, onApply, openPreview }) {
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchHistory = async () => {
        setLoading(true);
        try {
            const response = await getGenerationHistory({ page: 1, limit: 12 });
            if (response.success) {
                let items = response.data.content || [];
                if (typeFilter) {
                    items = items.filter(item => item.type === typeFilter);
                }
                setHistory(items);
            }
        } catch (error) {
            console.error("Failed to fetch history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, [typeFilter, refreshTrigger]);

    return (
        <div className="flex flex-col p-8 space-y-8">
            <div className="flex-1 overflow-y-auto space-y-4">
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4 opacity-50">
                        <LoaderIcon />
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Workspace Sync...</p>
                    </div>
                ) : history.length > 0 ? (
                    <div className="space-y-3">
                        {history.map((item) => (
                            <motion.div
                                key={item._id}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                whileHover={{ scale: 1.02, x: -4 }}
                                onClick={() => onApply && onApply(item)}
                                className="group relative flex items-center gap-4 p-4 rounded-[1.5rem] bg-white/5 border border-white/5 hover:border-purple-500/50 hover:bg-white/10 transition-all cursor-pointer overflow-hidden"
                            >
                                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-black/40 flex-shrink-0 border border-white/10 group-hover:border-purple-500/30 transition-colors">
                                    {(item.mediaUrl || item.url) ? (
                                        <img
                                            src={item.mediaUrl || item.url}
                                            className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                            alt="Preview"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-purple-500/10">
                                            {item.type === 'video' ? <Video size={20} className="text-purple-400" /> : <ImageIcon size={20} className="text-blue-400" />}
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className={`text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${item.type === 'video' ? "bg-purple-500/10 text-purple-400" : "bg-blue-500/10 text-blue-400"
                                            }`}>
                                            {item.type}
                                        </span>
                                        <span className="text-[9px] font-bold text-gray-500 uppercase">
                                            {formatDistanceToNow(new Date(item.createdAt || Date.now()), { addSuffix: true })}
                                        </span>
                                    </div>
                                    <p className="text-xs font-bold text-white/90 truncate pr-6 group-hover:text-white transition-colors">
                                        {item.prompt || "Untitled Manifestation"}
                                    </p>
                                </div>

                                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 flex items-center gap-2">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            openPreview && openPreview({ url: item.mediaUrl || item.url, type: item.type });
                                        }}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-purple-500 text-white flex items-center justify-center transition-colors border border-white/10"
                                        title="Preview"
                                    >
                                        <Maximize size={14} />
                                    </button>
                                    <button
                                        onClick={async (e) => {
                                            e.stopPropagation();
                                            const filename = `pixora-${item.type}-${item._id}.${item.type === 'video' ? 'mp4' : 'png'}`;
                                            await downloadFile(item.mediaUrl || item.url, filename);
                                        }}
                                        className="w-8 h-8 rounded-full bg-white/10 hover:bg-blue-500 text-white flex items-center justify-center transition-colors border border-white/10"
                                        title="Download"
                                    >
                                        <Download size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-20 space-y-6 opacity-30">
                        <div className="w-20 h-20 bg-white/5 rounded-[2rem] border border-white/10 flex items-center justify-center">
                            <FileText size={32} className="text-gray-400" />
                        </div>
                        <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest text-center leading-loose">
                            The canvas is empty.<br />Begin your journey above.
                        </p>
                    </div>
                )}
            </div>

            <div className="mt-auto p-5 bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/10 rounded-[2rem] relative overflow-hidden group">
                <div className="relative z-10 flex items-center gap-4">
                    <div className="p-3 bg-purple-500/20 rounded-2xl">
                        <Zap size={18} className="text-purple-400" />
                    </div>
                    <div>
                        <p className="text-xs font-black text-white uppercase tracking-widest">Real-time Library</p>
                        <p className="text-[10px] text-gray-500 font-bold leading-relaxed mt-0.5">Click any item to restore its prompt & settings.</p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Sparkles size={40} className="text-purple-500" />
                </div>
            </div>
        </div>
    );
}

function LoaderIcon() {
    return (
        <div className="relative">
            <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
            <Sparkles className="absolute inset-0 m-auto text-purple-400" size={14} />
        </div>
    );
}

function Zap({ size, className }) {
    return (
        <svg
            width={size}
            height={size}
            className={className}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    );
}
