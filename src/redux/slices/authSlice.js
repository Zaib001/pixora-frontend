import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  registerUser,
  logoutUser,
  fetchUserProfile,
  updateProfile,
  verifyOtp,
  resendOtp,
  forgotPassword,
  verifyResetOtp,
  resetPassword,
} from "../actions/authActions";
import { getToken, removeToken } from "../../utils/token";

const initialState = {
  user: null,
  token: getToken(),
  loading: false,
  error: null,
  isAuthenticated: !!getToken(),
  requiresOtpVerification: false,
  otpSent: false,
  resetEmail: null,
  resetToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
      state.error = null;
      state.loading = false;
    },
    manualLogout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.requiresOtpVerification = false;
      state.otpSent = false;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      /* REGISTER */
      .addCase(registerUser.pending, (state) => { state.loading = true; })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.requiresOtpVerification = action.payload.requiresOtpVerification;
        state.otpSent = true;
      })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* LOGIN */
      .addCase(loginUser.pending, (state) => { state.loading = true; })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
        state.requiresOtpVerification = false;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        if (action.payload?.includes("OTP")) state.requiresOtpVerification = true;
      })

      /* FORGOT PASSWORD */
      .addCase(forgotPassword.pending, (state) => { state.loading = true; })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.otpSent = true;
        state.resetEmail = action.payload.email;
      })
      .addCase(forgotPassword.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* VERIFY RESET OTP */
      .addCase(verifyResetOtp.pending, (state) => { state.loading = true; })
      .addCase(verifyResetOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.resetToken = action.payload.resetToken;
      })
      .addCase(verifyResetOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* RESET PASSWORD */
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = false;
        state.resetEmail = null;
        state.resetToken = null;
      })

      /* VERIFY EMAIL OTP */
      .addCase(verifyOtp.pending, (state) => { state.loading = true; })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.requiresOtpVerification = false;
        state.otpSent = false;
      })
      .addCase(verifyOtp.rejected, (state, action) => { state.loading = false; state.error = action.payload; })

      /* RESEND OTP */
      .addCase(resendOtp.fulfilled, (state) => { state.otpSent = true; })

      /* FETCH PROFILE */
      .addCase(fetchUserProfile.fulfilled, (state, action) => { state.user = action.payload; })

      /* UPDATE PROFILE */
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      })

      /* LOGOUT */
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.requiresOtpVerification = false;
        state.otpSent = false;
      });
  },
});

export const { resetAuthState, manualLogout } = authSlice.actions;
export default authSlice.reducer;
