import api from "../api/axios";
import API from "../api/endpoints";

/**
 * Prompt Service
 * Handles AI-powered prompt generation and enhancement
 */

/**
 * Generate prompt ideas using AI
 * @param {Object} params - Generation parameters
 */
export const generatePromptIdeas = async (params = {}) => {
    try {
        const { context = "text-to-video", userInput = "", style, count = 4 } = params;

        const response = await api.post(API.PROMPT_IDEAS, {
            context,
            userInput,
            style,
            count,
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Enhance a user's prompt with AI
 * @param {string} prompt - Original prompt
 * @param {string} context - Context (video/image)
 */
export const enhancePrompt = async (prompt, context = "video") => {
    try {
        const response = await api.post(API.PROMPT_ENHANCE, {
            prompt,
            context,
        });

        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export default {
    generatePromptIdeas,
    enhancePrompt,
};
