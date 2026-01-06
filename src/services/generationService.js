import api from "../api/axios";
import API from "../api/endpoints";
import { downloadFile } from "../utils/fileUtils";

/**
 * Generation Service
 * Handles content generation requests with free tier support
 */

/**
 * Check free tier status
 */
export const getFreeTierStatus = async () => {
    try {
        const response = await api.get(API.FREE_TIER_STATUS);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Generate content (video, image, etc.)
 * Automatically handles free tier vs paid generation
 */
export const generateContent = async (generationData) => {
    try {
        const { type, prompt, style, modelId, aspectRatio, duration, image } = generationData;

        const response = await api.post(API.GENERATE_CONTENT, {
            type,
            prompt,
            style,
            modelId,
            aspectRatio,
            duration,
            image, // Pass image for Image-to-Video
            cfgScale: generationData.cfgScale,
            // Image editing parameters
            mask: generationData.mask,
            quality: generationData.quality,
            size: generationData.size,
            n: generationData.n,
            options: generationData.options,
        });

        // Handle inconsistent API response structure (data under data or direct)
        // Check if response.data.data exists (standard) or if fields are at top level
        let responseData = response.data;
        let dataContent = responseData.data;

        // Extract flags
        const autoDownload = dataContent?.autoDownload || responseData.autoDownload; // Check both locations

        // Auto-download if free tier
        if (autoDownload && dataContent?.url) {
            await triggerAutoDownload(dataContent.url, `${type}_${Date.now()}`);
        }

        return responseData;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Trigger auto-download for free tier content
 */
const triggerAutoDownload = async (url, filename) => {
    try {
        await downloadFile(url, filename);
    } catch (error) {
        console.error('Auto-download failed:', error);
    }
};

/**
 * Get generation history
 */
export const getGenerationHistory = async (params = {}) => {
    try {
        const { page = 1, limit = 10 } = params;
        const response = await api.get(API.CONTENT_HISTORY, {
            params: { page, limit },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Check if user can generate content
 */
export const canGenerate = async () => {
    try {
        const freeTierStatus = await getFreeTierStatus();
        return {
            canGenerate: freeTierStatus.data.canGenerate,
            isFreeTier: freeTierStatus.data.freeGenerationsLeft > 0,
            freeGenerationsLeft: freeTierStatus.data.freeGenerationsLeft,
        };
    } catch (error) {
        console.error('Failed to check generation eligibility:', error);
        return {
            canGenerate: false,
            isFreeTier: false,
            freeGenerationsLeft: 0,
        };
    }
};

export const getDashboardStats = async () => {
    try {
        const response = await api.get(API.DASHBOARD_STATS);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const getCommunityContent = async (page = 1) => {
    try {
        const response = await api.get(`${API.COMMUNITY_CONTENT}?page=${page}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export default {
    getFreeTierStatus,
    generateContent,
    getGenerationHistory,
    canGenerate,
    getDashboardStats,
    getCommunityContent,
};

/**
 * Enhance prompt using AI
 */
export const enhancePrompt = async (prompt) => {
    try {
        const response = await api.post("/content/enhance-prompt", { prompt });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Delete generated content
 */
export const deleteContent = async (contentId) => {
    try {
        const response = await api.delete(`/content/${contentId}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
