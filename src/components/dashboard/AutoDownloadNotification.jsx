import { motion, AnimatePresence } from "framer-motion";
import { Download, CheckCircle, X } from "lucide-react";
import { useState, useEffect } from "react";

/**
 * Auto Download Notification
 * Shows when content is auto-downloading for free tier users
 */
export default function AutoDownloadNotification({ show, filename, onClose }) {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (show) {
            setProgress(0);
            const interval = setInterval(() => {
                setProgress((prev) => {
                    if (prev >= 100) {
                        clearInterval(interval);
                        setTimeout(onClose, 1000);
                        return 100;
                    }
                    return prev + 10;
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [show, onClose]);

    if (!show) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <div className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-xl p-4 shadow-2xl min-w-[320px]">
                    <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${progress === 100 ? 'bg-green-500/20' : 'bg-purple-500/20'}`}>
                            {progress === 100 ? (
                                <CheckCircle size={20} className="text-green-400" />
                            ) : (
                                <Download size={20} className="text-purple-400 animate-bounce" />
                            )}
                        </div>
                        <div className="flex-1">
                            <h4 className="text-white font-semibold text-sm mb-1">
                                {progress === 100 ? 'Download Complete!' : 'Auto-Downloading...'}
                            </h4>
                            <p className="text-gray-400 text-xs mb-2">
                                {filename || 'ai-generated-content.mp4'}
                            </p>

                            {/* Progress Bar */}
                            <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${progress}%` }}
                                    className="h-full bg-gradient-to-r from-purple-500 to-indigo-600"
                                    transition={{ duration: 0.3 }}
                                />
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                            <X size={16} className="text-gray-400" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
