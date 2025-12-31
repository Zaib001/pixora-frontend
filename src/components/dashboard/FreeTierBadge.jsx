import { Sparkles, Zap } from "lucide-react";
import { useSelector } from "react-redux";

/**
 * Free Tier Badge Component
 * Displays remaining free generations for free tier users
 */
export default function FreeTierBadge() {
    const { user } = useSelector((state) => state.auth);

    // Only show for users with free generations available or recently exhausted
    if (!user || (user.freeGenerationsLeft === 0 && user.subscriptionPlan !== 'free')) {
        return null;
    }

    const freeGensLeft = user.freeGenerationsLeft || 0;
    const totalFreeGens = 3;
    const used = totalFreeGens - freeGensLeft;
    const percentage = (freeGensLeft / totalFreeGens) * 100;

    // Color based on remaining generations
    const getColor = () => {
        if (freeGensLeft === 0) return "red";
        if (freeGensLeft === 1) return "orange";
        return "purple";
    };

    const color = getColor();

    return (
        <div className={`bg-gradient-to-r from-${color}-500/10 to-${color}-600/10 border border-${color}-500/20 rounded-xl p-4`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                    <Sparkles size={18} className={`text-${color}-400`} />
                    <span className="text-white font-semibold text-sm">Free Tier</span>
                </div>
                <span className={`text-${color}-400 font-bold text-lg`}>
                    {freeGensLeft}/{totalFreeGens}
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-white/5 rounded-full h-2 mb-2 overflow-hidden">
                <div
                    className={`h-full bg-gradient-to-r from-${color}-500 to-${color}-600 transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                />
            </div>

            {/* Status Text */}
            <p className="text-gray-400 text-xs">
                {freeGensLeft > 0 ? (
                    <>
                        <span className="text-white font-medium">{freeGensLeft}</span> free generation{freeGensLeft !== 1 ? 's' : ''} remaining
                    </>
                ) : (
                    <span className="text-red-400 font-medium">Free tier exhausted - Upgrade to continue</span>
                )}
            </p>

            {/* Watermark Notice */}
            {freeGensLeft > 0 && (
                <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-xs text-gray-400 flex items-center gap-2">
                        <Zap size={12} className={`text-${color}-400`} />
                        Free content includes watermark
                    </p>
                </div>
            )}
        </div>
    );
}
