import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../api/api";

export const generateTextToVideo = createAsyncThunk(
  "generation/textToVideo",
  async ({ prompt }, { rejectWithValue }) => {
    try {
      const res = await API.post("/generate/text-to-video", { prompt });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || "Failed to generate video");
    }
  }
);
