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
};

export default API;
