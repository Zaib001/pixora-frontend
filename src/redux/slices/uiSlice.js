// src/redux/slices/uiSlice.js
import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    toast: { message: "", type: "", visible: false },
    modals: {
      creditPurchase: false,
      planUpgrade: false,
      aiGenerator: false
    },
    loading: false
  },
  reducers: {
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
    showToast: (state, action) => {
      state.toast = {
        message: action.payload.message,
        type: action.payload.type || "info",
        visible: true,
      };
    },
    hideToast: (state) => {
      state.toast = { message: "", type: "", visible: false };
    },
    toggleModal: (state, action) => {
      state.modalOpen = action.payload ?? !state.modalOpen;
    },
    openModal: (state, action) => {
      state.modals[action.payload] = true;
    },
    closeModal: (state, action) => {
      state.modals[action.payload] = false;
    }
  },
});

export const {
  showLoader,
  hideLoader,
  showToast,
  hideToast,
  openModal,closeModal,
  toggleModal,
} = uiSlice.actions;

export default uiSlice.reducer;
