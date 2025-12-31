import api from "../api/axios";
import API from "../api/endpoints";

/**
 * Payment Service
 * Handles all payment-related API calls for Stripe integration
 */

// ========== Credit Purchases ==========

/**
 * Create a Stripe checkout session for credit purchase
 * @param {number} packId - ID of the credit pack (1, 2, or 3)
 * @returns {Promise} Checkout session data with sessionId and sessionUrl
 */
export const createCreditCheckout = async (packId) => {
    try {
        const response = await api.post(API.CREATE_CHECKOUT, { packId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Redirect user to Stripe Checkout
 * @param {string} sessionUrl - Stripe checkout URL
 */
export const redirectToCheckout = (sessionUrl) => {
    window.location.href = sessionUrl;
};

/**
 * Get payment status for a session
 * @param {string} sessionId - Stripe session ID
 * @returns {Promise} Payment status details
 */
export const getPaymentStatus = async (sessionId) => {
    try {
        const response = await api.get(`${API.PAYMENT_STATUS}/${sessionId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ========== Subscriptions ==========

/**
 * Create a Stripe checkout session for subscription
 * @param {string} planId - Plan ID ('pro' or 'enterprise')
 * @returns {Promise} Checkout session data
 */
export const createSubscriptionCheckout = async (planId) => {
    try {
        const response = await api.post(API.CREATE_SUBSCRIPTION, { planId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get user's current subscription
 * @returns {Promise} Subscription details
 */
export const getUserSubscription = async () => {
    try {
        const response = await api.get(API.GET_SUBSCRIPTION);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Cancel user's subscription
 * @param {boolean} immediately - Cancel immediately or at period end
 * @param {string} reason - Cancellation reason
 * @returns {Promise} Cancellation result
 */
export const cancelSubscription = async (immediately = false, reason = "") => {
    try {
        const response = await api.post(API.CANCEL_SUBSCRIPTION, {
            immediately,
            reason,
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Reactivate a canceled subscription
 * @returns {Promise} Reactivation result
 */
export const reactivateSubscription = async () => {
    try {
        const response = await api.post(API.REACTIVATE_SUBSCRIPTION);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Update subscription plan
 * @param {string} newPlanId - New plan ID
 * @returns {Promise} Update result
 */
export const updateSubscriptionPlan = async (newPlanId) => {
    try {
        const response = await api.patch(API.UPDATE_SUBSCRIPTION, { newPlanId });
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ========== Transactions ==========

/**
 * Get user's transaction history
 * @param {Object} params - Query parameters (page, limit, type, status)
 * @returns {Promise} Transaction history
 */
export const getUserTransactions = async (params = {}) => {
    try {
        const response = await api.get(API.USER_TRANSACTIONS, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get all transactions (Admin only)
 * @param {Object} params - Query parameters
 * @returns {Promise} All transactions
 */
export const getAllTransactions = async (params = {}) => {
    try {
        const response = await api.get(API.ADMIN_TRANSACTIONS, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get pending transactions for approval (Admin only)
 * @returns {Promise} Pending transactions
 */
export const getPendingTransactions = async () => {
    try {
        const response = await api.get(API.ADMIN_PENDING_TRANSACTIONS);
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Approve a transaction (Admin only)
 * @param {string} transactionId - Transaction ID
 * @returns {Promise} Approval result
 */
export const approveTransaction = async (transactionId) => {
    try {
        const response = await api.patch(
            `${API.APPROVE_TRANSACTION}/${transactionId}/approve`
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Reject a transaction (Admin only)
 * @param {string} transactionId - Transaction ID
 * @param {string} reason - Rejection reason
 * @returns {Promise} Rejection result
 */
export const rejectTransaction = async (transactionId, reason) => {
    try {
        const response = await api.patch(
            `${API.REJECT_TRANSACTION}/${transactionId}/reject`,
            { reason }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Get transaction statistics (Admin only)
 * @param {Object} params - Query parameters (startDate, endDate)
 * @returns {Promise} Transaction statistics
 */
export const getTransactionStats = async (params = {}) => {
    try {
        const response = await api.get(API.ADMIN_TRANSACTION_STATS, { params });
        return response.data;
    } catch (error) {
        throw error;
    }
};

/**
 * Refund a transaction (Admin only)
 * @param {string} transactionId - Transaction ID
 * @returns {Promise} Refund result
 */
export const refundTransaction = async (transactionId, reason) => {
    try {
        const response = await api.post(
            `${API.ADMIN_REFUND_TRANSACTION}/${transactionId}/refund`,
            { reason }
        );
        return response.data;
    } catch (error) {
        throw error;
    }
};

// ========== Helper Functions ==========

/**
 * Handle payment success callback
 * @param {string} sessionId - Stripe session ID from URL
 */
export const handlePaymentSuccess = async (sessionId) => {
    try {
        const status = await getPaymentStatus(sessionId);
        return status;
    } catch (error) {
        console.error("Error checking payment status:", error);
        throw error;
    }
};

/**
 * Initialize credit purchase flow
 * @param {number} packId - Credit pack ID
 */
export const initiateCreditPurchase = async (packId) => {
    try {
        const { data } = await createCreditCheckout(packId);
        redirectToCheckout(data.sessionUrl);
    } catch (error) {
        console.error("Error initiating credit purchase:", error);
        throw error;
    }
};

/**
 * Initialize subscription flow
 * @param {string} planId - Subscription plan ID
 */
export const initiateSubscription = async (planId) => {
    try {
        const { data } = await createSubscriptionCheckout(planId);
        redirectToCheckout(data.sessionUrl);
    } catch (error) {
        console.error("Error initiating subscription:", error);
        throw error;
    }
};

// ========== Content Generation ==========

/**
 * Generate AI content
 * @param {Object} data - Generation data (type, prompt, style)
 * @returns {Promise} Generated content
 */
export const generateContent = async (data) => {
    try {
        const response = await api.post(API.GENERATE_CONTENT, data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export default {
    // Credit purchases
    createCreditCheckout,
    redirectToCheckout,
    getPaymentStatus,
    initiateCreditPurchase,

    // Subscriptions
    createSubscriptionCheckout,
    getUserSubscription,
    cancelSubscription,
    reactivateSubscription,
    updateSubscriptionPlan,
    initiateSubscription,

    // Transactions
    getUserTransactions,
    getAllTransactions,
    getPendingTransactions,
    approveTransaction,
    rejectTransaction,
    getTransactionStats,
    refundTransaction, // Added this export

    // Content
    generateContent,

    // Helpers
    handlePaymentSuccess,
};

