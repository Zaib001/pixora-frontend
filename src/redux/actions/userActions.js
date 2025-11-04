import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";

/**
 * Fetch the logged-in user's profile
 */
export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/auth/profile");
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to fetch user profile");
    }
  }
);

/**
 * Update the logged-in user's profile
 */
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.put("/auth/profile", data);
      return response.data.user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to update profile");
    }
  }
);
