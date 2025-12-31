import { motion } from "framer-motion";
import { X, AlertCircle, Sparkles } from "lucide-react";

export default function WatermarkNotice({ isVisible, onClose, tier = "free", remainingGenerations = 0 }) {
    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
        >
            <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 backdrop-blur-xl 
                border border-purple-500/30 rounded-2xl p-4 shadow-2xl shadow-purple-500/25"
            >
                <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl">
                            <AlertCircle size={20} className="text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-white text-lg">
                                {tier === 'free' ? 'Free Tier Generation' : 'Watermarked Output'}
                            </h3>
                            <p className="text-gray-300 text-sm mt-1">
                                {tier === 'free'
                                    ? `Your generated content will include a watermark. 
                                       ${remainingGenerations > 0
                                        ? `${remainingGenerations} free generation${remainingGenerations !== 1 ? 's' : ''} remaining.`
                                        : 'Upgrade to remove watermarks and access premium features.'
                                    }`
                                    : 'This output includes a watermark as per your current plan.'
                                }
                            </p>

                            {tier === 'free' && remainingGenerations > 0 && (
                                <div className="mt-3">
                                    <div className="flex items-center gap-2 text-sm text-purple-300">
                                        <Sparkles size={14} />
                                        <span>Free Generations: {remainingGenerations}/3</span>
                                    </div>
                                    <div className="w-full bg-white/10 rounded-full h-2 mt-1">
                                        <div
                                            className="bg-gradient-to-r from-purple-500 to-indigo-600 h-full rounded-full transition-all duration-500"
                                            style={{ width: `${(remainingGenerations / 3) * 100}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {tier === 'free' && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">
                                Watermark features: Pixora logo + timestamp
                            </span>
                            <button className="px-3 py-1.5 bg-gradient-to-r from-purple-500 to-indigo-600 
                                text-white text-sm font-medium rounded-lg hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                            >
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}