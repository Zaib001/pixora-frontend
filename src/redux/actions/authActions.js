import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import API from "../../api/endpoints";
import { setToken, removeToken } from "../../utils/token";
import { showToast, showLoader, hideLoader } from "../slices/uiSlice";

/* REGISTER */
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post(API.REGISTER, formData);
      dispatch(showToast({ message: "Registration successful! OTP sent to your email.", type: "success" }));
      return {
        user: data.user || null,
        token: data.token || null,
        requiresOtpVerification: data.requiresOtpVerification || true,
      };
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed";
      dispatch(showToast({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

/* LOGIN */
export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post(API.LOGIN, formData);

      if (data.requiresOtpVerification) {
        dispatch(showToast({ message: "Please verify your account using OTP first.", type: "warning" }));
        return rejectWithValue("OTP verification required");
      }

      if (data.token) setToken(data.token);
      dispatch(showToast({ message: "Login successful!", type: "success" }));
      return data;
    } catch (err) {
      const message = err.response?.data?.message || "Login failed";
      dispatch(showToast({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

/* LOGOUT */
export const logoutUser = createAsyncThunk("auth/logout", async (_, { dispatch }) => {
  removeToken();
  dispatch(showToast({ message: "Logged out successfully", type: "success" }));
});

/* FETCH PROFILE */
export const fetchUserProfile = createAsyncThunk("auth/fetchUserProfile", async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.get(API.PROFILE);
    return data.user;
  } catch (err) {
    return rejectWithValue(err.response?.data?.message || "Failed to fetch profile");
  }
});

/* UPDATE PROFILE */
export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (formData, { rejectWithValue, dispatch }) => {
    try {
      dispatch(showLoader());
      const { data } = await api.put(API.PROFILE, formData);
      dispatch(showToast({ message: "Profile updated successfully!", type: "success" }));
      return data.user;
    } catch (err) {
      const message = err.response?.data?.message || "Profile update failed";
      dispatch(showToast({ message, type: "error" }));
      return rejectWithValue(message);
    } finally {
      dispatch(hideLoader());
    }
  }
);

/* 🧩 FORGOT PASSWORD (send OTP) */
export const forgotPassword = createAsyncThunk(
  "auth/forgotPassword",
  async (email, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post(API.FORGOT_PASSWORD, { email });
      dispatch(showToast({ message: data.message, type: "success" }));
      return { email, requiresOtpVerification: data.requiresOtpVerification };
    } catch (err) {
      const message = err.response?.data?.message || "Failed to send OTP.";
      dispatch(showToast({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

/* 🧠 VERIFY RESET OTP */
export const verifyResetOtp = createAsyncThunk(
  "auth/verifyResetOtp",
  async ({ email, otp }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post(API.VERIFY_RESET_OTP, { email, otp });
      dispatch(showToast({ message: data.message, type: "success" }));
      return { resetToken: data.resetToken, email };
    } catch (err) {
      const message = err.response?.data?.message || "Invalid OTP.";
      dispatch(showToast({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

/* 🔑 RESET PASSWORD (using token) */
export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async ({ token, password, confirmPassword }, { rejectWithValue, dispatch }) => {
    try {
      const { data } = await api.post(`${API.RESET_PASSWORD}/${token}`, { password, confirmPassword });
      dispatch(showToast({ message: data.message, type: "success" }));
      return data.message;
    } catch (err) {
      const message = err.response?.data?.message || "Password reset failed.";
      dispatch(showToast({ message, type: "error" }));
      return rejectWithValue(message);
    }
  }
);

/* ✅ VERIFY EMAIL OTP */
export const verifyOtp = createAsyncThunk("auth/verifyOtp", async ({ email, otp }, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await api.post(API.VERIFY_OTP, { email, otp });
    dispatch(showToast({ message: data.message, type: "success" }));
    return data;
  } catch (err) {
    const message = err.response?.data?.message || "OTP verification failed";
    dispatch(showToast({ message, type: "error" }));
    return rejectWithValue(message);
  }
});

/* 🔁 RESEND OTP */
export const resendOtp = createAsyncThunk("auth/resendOtp", async (email, { rejectWithValue, dispatch }) => {
  try {
    const { data } = await api.post(API.RESEND_OTP, { email });
    dispatch(showToast({ message: data.message, type: "success" }));
    return data;
  } catch (err) {
    const message = err.response?.data?.message || "Failed to resend OTP";
    dispatch(showToast({ message, type: "error" }));
    return rejectWithValue(message);
  }
});
