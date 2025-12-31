import api from "../api/axios";
import API from "../api/endpoints";

export const getHelpContent = async () => {
    try {
        const response = await api.get(API.HELP_CONTENT);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// Tutorials
export const createTutorial = async (data) => {
    try {
        const response = await api.post(API.HELP_TUTORIALS, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const updateTutorial = async (id, data) => {
    try {
        const response = await api.put(`${API.HELP_TUTORIALS}/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const deleteTutorial = async (id) => {
    try {
        const response = await api.delete(`${API.HELP_TUTORIALS}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

// FAQs
export const createFAQ = async (data) => {
    try {
        const response = await api.post(API.HELP_FAQS, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const updateFAQ = async (id, data) => {
    try {
        const response = await api.put(`${API.HELP_FAQS}/${id}`, data);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};

export const deleteFAQ = async (id) => {
    try {
        const response = await api.delete(`${API.HELP_FAQS}/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error;
    }
};
