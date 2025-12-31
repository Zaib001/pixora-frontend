const API = {
    // AUTH
    REGISTER: "/auth/register",
    LOGIN: "/auth/login",
    LOGOUT: "/auth/logout",
    PROFILE: "/auth/profile",

    // PASSWORD RESET
    FORGOT_PASSWORD: "/auth/forgot-password",
    VERIFY_RESET_OTP: "/auth/verify-reset-otp",
    RESET_PASSWORD: "/auth/reset-password",
    // OTP VERIFICATION
    VERIFY_OTP: "/auth/verify-otp",
    RESEND_OTP: "/auth/resend-otp",

    // CREDITS
    CREDIT_BALANCE: "/credits/balance",
    CREDIT_HISTORY: "/credits/history",
    PURCHASE_CREDITS: "/credits/purchase",

    // PAYMENTS
    CREATE_CHECKOUT: "/payments/create-checkout-session",
    CREATE_SUBSCRIPTION: "/payments/create-subscription",
    PAYMENT_STATUS: "/payments/status",

    // CONTENT
    GENERATE_CONTENT: "/content/generate",
    FREE_TIER_STATUS: "/content/free-tier-status",
    CONTENT_HISTORY: '/content/history',
    TEMPLATES: '/templates',
    DASHBOARD_STATS: "/content/dashboard-stats",
    COMMUNITY_CONTENT: "/content/community",

    // HELP
    HELP_CONTENT: "/help",
    HELP_TUTORIALS: "/help/tutorials",
    HELP_FAQS: "/help/faqs",
    HELP_ARTICLES: '/help/articles',

    // SUBSCRIPTIONS
    GET_SUBSCRIPTION: "/subscriptions",
    CANCEL_SUBSCRIPTION: "/subscriptions/cancel",
    REACTIVATE_SUBSCRIPTION: "/subscriptions/reactivate",
    UPDATE_SUBSCRIPTION: "/subscriptions/update",

    // TRANSACTIONS
    USER_TRANSACTIONS: "/transactions",
    ADMIN_TRANSACTIONS: "/transactions/admin/all",
    ADMIN_PENDING_TRANSACTIONS: "/transactions/admin/pending",
    ADMIN_TRANSACTION_STATS: "/transactions/admin/stats",
    APPROVE_TRANSACTION: "/transactions/admin",
    REJECT_TRANSACTION: "/transactions/admin",

    // ADMIN
    ADMIN_REFUND_TRANSACTION: "/admin/transactions",
    ADMIN_USERS: "/admin/users",
    ADMIN_USER_BY_ID: "/admin/users/",
    ADMIN_UPDATE_ROLE: "/admin/users/",
    ADMIN_TOGGLE_STATUS: "/admin/users/",
    ADMIN_USER_STATS: "/admin/stats/users",
    ADMIN_DASHBOARD_STATS: "/admin/stats/dashboard",
    ADMIN_REVENUE_ANALYTICS: "/admin/analytics/revenue",
    ADMIN_CREDIT_ANALYTICS: "/admin/analytics/credits",
    ADMIN_ACTIVITY_LOGS: "/admin/activity-logs",

    // ADMIN - Model Management
    ADMIN_MODELS: "/admin/models",
    ADMIN_CONFIG_KEYS: "/admin/config/api-keys",
    ADMIN_TEST_MODEL: "/admin/config/test-model",

    // PUBLIC - Models
    PUBLIC_MODELS: "/models",

    // PROMPTS
    PROMPT_IDEAS: "/prompts/ideas",
    PROMPT_ENHANCE: "/prompts/enhance",
};

export default API;
