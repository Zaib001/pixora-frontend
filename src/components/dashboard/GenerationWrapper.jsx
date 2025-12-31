// GenerationWrapper.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateCredits } from "../../redux/slices/creditSlice";
import { fetchUserProfile } from "../../redux/actions/authActions";
import WatermarkNotice from "./WatermarkNotice";
import UpgradePromptModal from "./UpgradePromptModal";
import AutoDownloadNotification from "./AutoDownloadNotification";
import { generateContent, getFreeTierStatus } from "../../services/generationService";

/**
 * Generation Wrapper Component
 * Wraps generation functionality with free tier logic
 */
export default function GenerationWrapper({ children, type }) {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { credits } = useSelector((state) => state.credits);

    const [showUpgradeModal, setShowUpgradeModal] = useState(false);
    const [showAutoDownload, setShowAutoDownload] = useState(false);
    const [downloadFilename, setDownloadFilename] = useState("");
    const [freeTierStatus, setFreeTierStatus] = useState(null);
    const [watermarkVisible, setWatermarkVisible] = useState(false);
    const [downloadData, setDownloadData] = useState(null);

    // Check if user is on free tier
    const isFreeTier = user &&
        ((user.subscriptionPlan === 'free' && user.freeGenerationsLeft > 0) ||
            (user.credits === 0 && user.freeGenerationsLeft > 0));

    const isExhausted = user &&
        user.subscriptionPlan === 'free' &&
        user.freeGenerationsLeft === 0 &&
        user.credits === 0;

    // Load free tier status
    useEffect(() => {
        const loadStatus = async () => {
            try {
                const status = await getFreeTierStatus();
                setFreeTierStatus(status.data);

                // Show watermark if on free tier
                if (status.data.isFreeTier) {
                    setWatermarkVisible(true);
                }
            } catch (error) {
                console.error("Failed to load free tier status:", error);
            }
        };

        if (user) {
            loadStatus();
        }
    }, [user]);

    // Sync user credits to slice on load if mismatch
    useEffect(() => {
        if (user && user.credits !== undefined && credits === 0 && user.credits > 0) {
            dispatch(updateCredits(user.credits));
        }
    }, [user, credits, dispatch]);

    // Show upgrade modal if exhausted
    useEffect(() => {
        if (isExhausted) {
            setShowUpgradeModal(true);
        }
    }, [isExhausted]);

    const handleDownload = async (contentId) => {
        try {
            const response = await fetch(`/api/content/download/${contentId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (!response.ok) throw new Error('Download failed');

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `pixora-${contentId}-${Date.now()}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const handleGenerate = async (generationData) => {
        try {
            // Check if user can generate
            if (isExhausted) {
                setShowUpgradeModal(true);
                throw new Error("Free tier exhausted. Please upgrade to continue.");
            }

            // Show watermark for free tier generation
            if (isFreeTier) {
                setWatermarkVisible(true);
            }

            // Generate content with tier information
            const result = await generateContent({
                ...generationData,
                type,
                isFreeTier: isFreeTier,
                userId: user?._id
            });

            // Update user credits if response includes them
            if (result.creditsRemaining !== undefined) {
                dispatch(updateCredits(result.creditsRemaining));
            }

            // Update user profile to refresh freeGenerationsLeft
            if (result.freeGenerationsLeft !== undefined) {
                dispatch(fetchUserProfile());
            }

            // Show auto-download notification for free tier
            if (result.data && result.data.autoDownload && isFreeTier) {
                // Store download data for the notification
                setDownloadData({
                    contentId: result.data.generationId,
                    filename: `pixora-${result.data.generationId}.png`,
                    hasWatermark: true
                });
                setShowAutoDownload(true);

                // Auto-download the image
                setTimeout(() => {
                    handleDownload(result.data.generationId);
                }, 1000);
            }

            // Add watermark info to result
            if (isFreeTier && result.data) {
                result.data.hasWatermark = true;
                result.data.watermarkText = "Generated with Free Tier - Upgrade to remove";
            }

            return result;
        } catch (error) {
            console.error("Generation failed:", error);

            // Show upgrade modal for credit/limit errors
            if (error.response?.data?.requiresUpgrade ||
                error.response?.data?.insufficientCredits ||
                error.message?.includes("Free tier exhausted")) {
                setShowUpgradeModal(true);
            }

            throw error;
        }
    };

    return (
        <>
            {/* Watermark Notice for Free Tier */}
            <WatermarkNotice
                isVisible={watermarkVisible}
                onClose={() => setWatermarkVisible(false)}
                tier={isFreeTier ? "free" : "premium"}
                remainingGenerations={user?.freeGenerationsLeft || 0}
            />

            {/* Main Content */}
            {typeof children === 'function'
                ? children({
                    handleGenerate,
                    isFreeTier,
                    isExhausted,
                    freeTierStatus,
                    creditsRemaining: credits || user?.credits || 0,
                    freeGenerationsLeft: user?.freeGenerationsLeft || 0,
                    handleDownload // Pass download function to children
                })
                : children
            }

            {/* Upgrade Modal */}
            <UpgradePromptModal
                isOpen={showUpgradeModal}
                onClose={() => setShowUpgradeModal(false)}
                freeGensUsed={3 - (user?.freeGenerationsLeft || 0)}
                tier={user?.subscriptionPlan || 'free'}
            />

            {/* Auto Download Notification */}
            <AutoDownloadNotification
                show={showAutoDownload}
                filename={downloadData?.filename || ""}
                onClose={() => setShowAutoDownload(false)}
                isWatermarked={downloadData?.hasWatermark || false}
                onDownload={() => downloadData && handleDownload(downloadData.contentId)}
            />
        </>
    );
}
