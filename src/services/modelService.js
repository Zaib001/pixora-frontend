import api from "../api/axios";
import API from "../api/endpoints";

/**
 * Model Service
 * Handles model-related requests
 */

/**
 * Get all active models
 * @param {string} type - Optional filter by type (video/image)
 */
export const getActiveModels = async (type) => {
    try {
        const params = type ? { type } : {};
        const response = await api.get(API.PUBLIC_MODELS, { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Admin: Get all models with filters
 */
export const getAllModels = async (params = {}) => {
    try {
        const response = await api.get(API.ADMIN_MODELS, { params });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Admin: Create a new model
 */
export const createModel = async (modelData) => {
    try {
        const response = await api.post(API.ADMIN_MODELS, modelData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Admin: Update a model
 */
export const updateModel = async (id, modelData) => {
    try {
        const response = await api.put(`${API.ADMIN_MODELS}/${id}`, modelData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Admin: Delete a model
 */
export const deleteModel = async (id) => {
    try {
        const response = await api.delete(`${API.ADMIN_MODELS}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Admin: Toggle model status
 */
export const toggleModelStatus = async (id, status) => {
    try {
        const response = await api.patch(`${API.ADMIN_MODELS}/${id}/toggle`, { status });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Admin: Save API keys
 */
export const saveAPIKeys = async (apiKeys) => {
    try {
        const response = await api.post(API.ADMIN_CONFIG_KEYS, apiKeys);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Admin: Get API keys (masked)
 */
export const getAPIKeys = async () => {
    try {
        const response = await api.get(API.ADMIN_CONFIG_KEYS);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

/**
 * Admin: Test model connectivity
 */
export const testModel = async (provider = "competapi") => {
    try {
        const response = await api.post(API.ADMIN_TEST_MODEL, { provider });
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export default {
    getActiveModels,
    getAllModels,
    createModel,
    updateModel,
    deleteModel,
    toggleModelStatus,
    saveAPIKeys,
    getAPIKeys,
    testModel,
};
