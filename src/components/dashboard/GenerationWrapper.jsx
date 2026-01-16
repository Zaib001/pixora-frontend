// GenerationWrapper.jsx
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/authSlice";
import { updateCredits } from "../../redux/slices/creditSlice";
import { fetchUserProfile } from "../../redux/actions/authActions";
import { fetchCredits } from "../../redux/actions/creditActions";
import WatermarkNotice from "./WatermarkNotice";
import UpgradePromptModal from "./UpgradePromptModal";
import AutoDownloadNotification from "./AutoDownloadNotification";
import { generateContent, getFreeTierStatus, getContentStatus } from "../../services/generationService";

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
    const [generationStage, setGenerationStage] = useState(0);
    const [realProgress, setRealProgress] = useState(0);
    const [statusMessage, setStatusMessage] = useState("");
    const [isPolling, setIsPolling] = useState(false);

    // Check if user is on free tier
    const isFreeTier = user &&
        ((user.subscriptionPlan === 'free' && user.freeGenerationsLeft > 0) ||
            (user.credits === 0 && user.freeGenerationsLeft > 0));

    const isExhausted = user &&
        user.subscriptionPlan === 'free' &&
        user.freeGenerationsLeft === 0 &&
        credits === 0;

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
            setGenerationStage(0);
            setRealProgress(0);
            setStatusMessage("Starting...");

            if (isExhausted) {
                setShowUpgradeModal(true);
                throw new Error("Free tier exhausted. Please upgrade to continue.");
            }

            if (isFreeTier) {
                setWatermarkVisible(true);
            }

            setGenerationStage(1);

            // Initiate generation
            const initResult = await generateContent({
                ...generationData,
                type,
                isFreeTier: isFreeTier,
                userId: user?._id
            });

            const contentId = initResult.data?._id || initResult.data?.id;
            if (!contentId) {
                throw new Error("Failed to start generation - no ID returned");
            }

            // Start Polling
            setIsPolling(true);
            setGenerationStage(2);

            return new Promise((resolve, reject) => {
                const pollInterval = setInterval(async () => {
                    try {
                        const statusResult = await getContentStatus(contentId);
                        const { status, progress, url, error, thumbnailUrl } = statusResult.data;

                        setRealProgress(progress);

                        if (status === "completed") {
                            clearInterval(pollInterval);
                            setIsPolling(false);
                            setGenerationStage(3);

                            // Proactive Sync
                            // 4. Update Credits/Free Tier Immediately using Backend Source of Truth
                            // initResult contains { success, creditsRemaining, freeGenerationsLeft }
                            if (initResult.freeGenerationsLeft !== undefined) {
                                dispatch(updateUser({ freeGenerationsLeft: initResult.freeGenerationsLeft }));
                            }

                            if (initResult.creditsRemaining !== undefined) {
                                dispatch(updateCredits(initResult.creditsRemaining));
                                // Also update user object in auth slice for isExhausted consistency
                                dispatch(updateUser({ credits: initResult.creditsRemaining }));
                            } else if (!isFreeTier) {
                                // Fallback if backend didn't return (shouldn't happen with our backend)
                                const currentCredits = credits || user?.credits || 0;
                                const cost = initResult.costUsed || 2;
                                dispatch(updateCredits(Math.max(0, currentCredits - cost)));
                                dispatch(updateUser({ credits: Math.max(0, (user?.credits || 0) - cost) }));
                            }

                            // 5. Exhaustive Sync (Background)
                            dispatch(fetchUserProfile());
                            dispatch(fetchCredits());

                            // Handle Auto-download
                            if (isFreeTier && url) {
                                setDownloadData({
                                    contentId: contentId,
                                    filename: `pixora-${contentId}.mp4`,
                                    hasWatermark: true
                                });
                                setShowAutoDownload(true);
                                setTimeout(() => handleDownload(contentId), 1000);
                            }

                            const finalResult = {
                                ...statusResult,
                                success: true,
                                data: {
                                    ...statusResult.data,
                                    hasWatermark: isFreeTier
                                }
                            };

                            setGenerationStage(0);
                            resolve(finalResult);

                        } else if (status === "failed") {
                            clearInterval(pollInterval);
                            setIsPolling(false);
                            setGenerationStage(0);
                            reject(new Error(error || "Generation failed"));
                        }
                    } catch (pollError) {
                        console.error("Polling error:", pollError);
                        // Don't stop polling on single network error, wait for next cycle
                    }
                }, 3000); // Poll every 3 seconds
            });

        } catch (error) {
            console.error("Generation failed:", error);
            setGenerationStage(0);
            setIsPolling(false);

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
                    generationStage,
                    realProgress,
                    statusMessage,
                    isPolling,
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
