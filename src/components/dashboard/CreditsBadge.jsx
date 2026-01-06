import { useSelector } from "react-redux";
import { Sparkles, Zap } from "lucide-react";
import useCredits from "../../hooks/useCredits";
import { useTranslation } from "react-i18next";

export default function CreditsBadge() {
  const { t } = useTranslation();
  const { credits } = useCredits(); // Real-time credits with auto-refresh
  const { user } = useSelector((state) => state.auth);

  // Display credits from hook (which syncs with backend) or fallback to user object
  const displayCredits = credits || user?.credits || 0;

  if (user?.subscriptionPlan === 'free' || user?.freeGenerationsLeft > 0) {
    return (
      <div className="flex items-center gap-3 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm">
        {/* Free Generations */}
        <div className="flex items-center gap-2 text-gray-300">
          <Sparkles size={14} className="text-purple-400" />
          <span>{t("common.free")}: <span className="text-white font-semibold">{user?.freeGenerationsLeft || 0}/3</span></span>
        </div>

        {/* Divider */}
        <div className="w-px h-4 bg-white/20"></div>

        {/* Paid Credits */}
        <div className="flex items-center gap-2 text-gray-300">
          <Zap size={14} className="text-yellow-400" />
          <span>{t("common.credits")}: <span className="text-green-400 font-semibold">{displayCredits}</span></span>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-gray-300">
      <Zap size={14} className="text-yellow-400" />
      <span>{t("common.credits")}: <span className="text-green-400 font-semibold">{displayCredits}</span></span>
    </div>
  );
}
