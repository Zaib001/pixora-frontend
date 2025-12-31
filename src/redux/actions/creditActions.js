import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios";
import API from "../../api/endpoints";
import { showToast } from "../slices/uiSlice";

/**
 * Fetch user's current credit balance
 */
export const fetchCredits = createAsyncThunk(
  "credits/fetchCredits",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API.PROFILE);
      return {
        credits: response.data.data.credits || 0,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch credits"
      );
    }
  }
);

/**
 * Fetch user's transaction history
 */
export const fetchTransactions = createAsyncThunk(
  "credits/fetchTransactions",
  async (params = {}, { rejectWithValue }) => {
    try {
      const response = await api.get(API.USER_TRANSACTIONS, { params });
      return {
        transactions: response.data.data.transactions || [],
        total: response.data.data.total || 0,
        page: response.data.data.page || 1,
        limit: response.data.data.limit || 10,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transactions"
      );
    }
  }
);

/**
 * Add credits (for testing purposes - actual credit addition happens via payment webhook)
 */
export const addCredits = createAsyncThunk(
  "credits/addCredits",
  async (creditData, { dispatch, rejectWithValue }) => {
    try {
      // This is typically handled by the payment webhook
      // But can be used for admin credit grants
      const newTransaction = {
        id: Date.now(),
        type: "purchase",
        description: `Credit Purchase - ${creditData.packageId} Package`,
        amount: creditData.amount,
        createdAt: new Date().toISOString(),
        status: "completed",
        package: creditData.packageId,
        price: creditData.price,
      };

      dispatch(
        showToast({
          message: `Successfully added ${creditData.amount} credits!`,
          type: "success",
        })
      );

      return {
        amount: creditData.amount,
        transaction: newTransaction,
      };
    } catch (error) {
      dispatch(
        showToast({
          message: error.message,
          type: "error",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Deduct credits (used during content generation)
 */
export const deductCredits = createAsyncThunk(
  "credits/deductCredits",
  async (deductionData, { dispatch, rejectWithValue }) => {
    try {
      // Credits are deducted server-side during generation
      // This action is for local state update
      const newTransaction = {
        id: Date.now(),
        type: "usage",
        description: deductionData.description || "Credit Usage",
        amount: deductionData.amount,
        createdAt: new Date().toISOString(),
        status: "completed",
        projectId: deductionData.projectId,
      };

      return {
        amount: deductionData.amount,
        transaction: newTransaction,
      };
    } catch (error) {
      dispatch(
        showToast({
          message: "Failed to process credit deduction",
          type: "error",
        })
      );
      return rejectWithValue(error.message);
    }
  }
);

/**
 * Purchase credit package via Stripe
 */
export const purchaseCreditPackage = createAsyncThunk(
  "credits/purchasePackage",
  async (packageId, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.post(API.CREATE_CHECKOUT, { packId: packageId });

      if (response.data.success && response.data.data.sessionUrl) {
        // Redirect to Stripe checkout
        window.location.href = response.data.data.sessionUrl;
        return response.data.data;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to initiate purchase";
      dispatch(
        showToast({
          message: errorMessage,
          type: "error",
        })
      );
      return rejectWithValue(errorMessage);
    }
  }
);

/**
 * Sync credits after payment success
 */
export const syncCreditsAfterPayment = createAsyncThunk(
  "credits/syncAfterPayment",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Fetch updated user profile with new credits
      await dispatch(fetchCredits()).unwrap();
      await dispatch(fetchTransactions()).unwrap();

      dispatch(
        showToast({
          message: "Credits updated successfully!",
          type: "success",
        })
      );
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
