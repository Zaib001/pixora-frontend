import api from "../api/axios";
import API from "../api/endpoints";

/**
 * Admin Service
 * Handles all admin-related API calls
 */

// ========== User Management ==========

/**
 * Get all users with pagination, search, and filters
 * @param {Object} params - Query parameters (page, limit, search, role, etc.)
 * @returns {Promise} Users list with pagination
 */
export const getAllUsers = async (params = {}) => {
    try {
        const response = await api.get(API.ADMIN_USERS, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get user by ID with detailed information
 * @param {string} userId - User ID
 * @returns {Promise} User details, subscription, transactions
 */
export const getUserById = async (userId) => {
    try {
        const response = await api.get(`${API.ADMIN_USER_BY_ID}${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Update user role (SuperAdmin only)
 * @param {string} userId - User ID
 * @param {string} role - New role (user, admin, superadmin)
 * @returns {Promise} Updated user
 */
export const updateUserRole = async (userId, role) => {
    try {
        const response = await api.patch(`${API.ADMIN_UPDATE_ROLE}${userId}/role`, { role });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Toggle user active status (suspend/activate)
 * @param {string} userId - User ID
 * @param {boolean} isActive - Active status
 * @returns {Promise} Updated user
 */
export const toggleUserStatus = async (userId, isActive) => {
    try {
        const response = await api.patch(`${API.ADMIN_TOGGLE_STATUS}${userId}/status`, { isActive });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ========== Statistics & Analytics ==========

/**
 * Get user statistics
 * @returns {Promise} User stats (total, active, by role, by plan, etc.)
 */
export const getUserStats = async () => {
    try {
        const response = await api.get(API.ADMIN_USER_STATS);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get comprehensive dashboard statistics
 * @returns {Promise} Dashboard stats (users, revenue, subscriptions, etc.)
 */
export const getDashboardStats = async () => {
    try {
        const response = await api.get(API.ADMIN_DASHBOARD_STATS);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get revenue analytics with date range
 * @param {Object} params - Query parameters (startDate, endDate, groupBy)
 * @returns {Promise} Revenue analytics
 */
export const getRevenueAnalytics = async (params = {}) => {
    try {
        const response = await api.get(API.ADMIN_REVENUE_ANALYTICS, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get credit usage analytics
 * @param {Object} params - Query parameters (startDate, endDate)
 * @returns {Promise} Credit analytics
 */
export const getCreditAnalytics = async (params = {}) => {
    try {
        const response = await api.get(API.ADMIN_CREDIT_ANALYTICS, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ========== Activity Logs ==========

/**
 * Get activity logs (recent transactions and user activities)
 * @param {Object} params - Query parameters (limit, page, type)
 * @returns {Promise} Activity logs
 */
export const getActivityLogs = async (params = {}) => {
    try {
        const response = await api.get(API.ADMIN_ACTIVITY_LOGS, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Refund a transaction
 * @param {string} transactionId - Transaction ID
 * @returns {Promise} Refunded transaction
 */
export const refundTransaction = async (transactionId) => {
    try {
        const response = await api.post(`${API.ADMIN_TRANSACTIONS}/${transactionId}/refund`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    // User Management
    getAllUsers,
    getUserById,
    updateUserRole,
    toggleUserStatus,

    // Statistics & Analytics
    getUserStats,
    getDashboardStats,
    getRevenueAnalytics,
    getCreditAnalytics,

    // Activity Logs
    getActivityLogs,

    // Refunds
    refundTransaction,
};
