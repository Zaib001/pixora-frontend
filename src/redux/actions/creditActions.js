// src/redux/actions/creditActions.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { showToast } from "../slices/uiSlice";

// Mock data for testing
const MOCK_TRANSACTIONS = [
  {
    id: 1,
    type: "purchase",
    description: "Starter Package Purchase",
    amount: 100,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed"
  },
  {
    id: 2,
    type: "usage",
    description: "AI Video Generation - Project 'Summer Vibes'",
    amount: 50,
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed"
  },
  {
    id: 3,
    type: "usage",
    description: "Template Usage - Business Presentation",
    amount: 25,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    status: "completed"
  },
  {
    id: 4,
    type: "purchase",
    description: "Pro Package Purchase",
    amount: 500,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: "completed"
  },
  {
    id: 5,
    type: "usage",
    description: "AI Voiceover Generation",
    amount: 30,
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    status: "completed"
  }
];

const MOCK_USER_STATS = {
  monthlyUsage: 8,
  projectsCreated: 12,
  creditsSpent: 450,
  templatesUsed: 5,
  aiGenerations: 23
};

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchCredits = createAsyncThunk(
  "credits/fetchCredits",
  async (_, { rejectWithValue }) => {
    try {
      await delay(1000); // Simulate API call
      
      // Mock response - in real app, this would be an API call
      const mockResponse = {
        credits: 1250,
        stats: MOCK_USER_STATS
      };
      
      return mockResponse;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchTransactions = createAsyncThunk(
  "credits/fetchTransactions",
  async (_, { rejectWithValue }) => {
    try {
      await delay(800); // Simulate API call
      
      // Return mock transactions
      return {
        transactions: MOCK_TRANSACTIONS,
        total: MOCK_TRANSACTIONS.length,
        page: 1,
        limit: 10
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addCredits = createAsyncThunk(
  "credits/addCredits",
  async (creditData, { dispatch, rejectWithValue }) => {
    try {
      await delay(1500); // Simulate payment processing
      
      // Simulate random success/failure for demo
      if (Math.random() < 0.9) { // 90% success rate
        const newTransaction = {
          id: Date.now(),
          type: "purchase",
          description: `Credit Purchase - ${creditData.packageId} Package`,
          amount: creditData.amount,
          createdAt: new Date().toISOString(),
          status: "completed",
          package: creditData.packageId,
          price: creditData.price
        };
        
        dispatch(showToast({
          message: `Successfully added ${creditData.amount} credits!`,
          type: "success"
        }));
        
        return {
          amount: creditData.amount,
          transaction: newTransaction
        };
      } else {
        throw new Error("Payment processing failed. Please try again.");
      }
    } catch (error) {
      dispatch(showToast({
        message: error.message,
        type: "error"
      }));
      return rejectWithValue(error.message);
    }
  }
);

export const deductCredits = createAsyncThunk(
  "credits/deductCredits",
  async (deductionData, { dispatch, rejectWithValue }) => {
    try {
      await delay(500);
      
      const newTransaction = {
        id: Date.now(),
        type: "usage",
        description: deductionData.description || "Credit Usage",
        amount: deductionData.amount,
        createdAt: new Date().toISOString(),
        status: "completed",
        projectId: deductionData.projectId
      };
      
      return {
        amount: deductionData.amount,
        transaction: newTransaction
      };
    } catch (error) {
      dispatch(showToast({
        message: "Failed to process credit deduction",
        type: "error"
      }));
      return rejectWithValue(error.message);
    }
  }
);

export const purchaseCreditPackage = createAsyncThunk(
  "credits/purchasePackage",
  async (packageId, { dispatch, rejectWithValue }) => {
    try {
      const packages = {
        starter: { credits: 100, price: 9.99 },
        pro: { credits: 500, price: 39.99 },
        premium: { credits: 1000, price: 69.99 }
      };
      
      const selectedPackage = packages[packageId];
      if (!selectedPackage) {
        throw new Error("Invalid package selected");
      }
      
      return await dispatch(addCredits({
        amount: selectedPackage.credits,
        packageId: packageId,
        price: selectedPackage.price
      })).unwrap();
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);