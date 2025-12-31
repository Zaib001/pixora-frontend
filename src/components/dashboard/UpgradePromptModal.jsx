import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Zap, Star, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Upgrade Prompt Modal
 * Shows when user has exhausted free tier
 */
export default function UpgradePromptModal({ isOpen, onClose, freeGensUsed = 3 }) {
    const navigate = useNavigate();

    const handleUpgrade = () => {
        navigate("/dashboard/billing");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-gradient-to-br from-gray-900 to-black border border-white/10 rounded-2xl max-w-md w-full p-6 shadow-2xl"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-lg transition-colors"
                    >
                        <X size={20} className="text-gray-400" />
                    </button>

                    {/* Icon */}
                    <div className="flex justify-center mb-4">
                        <div className="p-4 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl shadow-lg shadow-purple-500/25">
                            <Crown size={32} className="text-white" />
                        </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl font-bold text-white text-center mb-2">
                        Free Tier Exhausted
                    </h2>
                    <p className="text-gray-400 text-center mb-6">
                        You've used all {freeGensUsed} free generations. Upgrade to continue creating amazing content!
                    </p>

                    {/* Benefits */}
                    <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-3 text-sm">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Zap size={16} className="text-purple-400" />
                            </div>
                            <span className="text-gray-300">Unlimited generations with credits</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Star size={16} className="text-purple-400" />
                            </div>
                            <span className="text-gray-300">No watermarks on your content</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                            <div className="p-2 bg-purple-500/20 rounded-lg">
                                <Crown size={16} className="text-purple-400" />
                            </div>
                            <span className="text-gray-300">Keep your content private</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleUpgrade}
                            className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-purple-500/25 transition-all"
                        >
                            <Crown size={18} />
                            <span>Upgrade Now</span>
                            <ArrowRight size={18} />
                        </motion.button>
                        <button
                            onClick={onClose}
                            className="w-full py-3 px-6 bg-white/5 hover:bg-white/10 text-gray-300 rounded-xl font-medium transition-colors"
                        >
                            Maybe Later
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
