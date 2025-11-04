import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCredits,
  fetchTransactions,
  addCredits,
  deductCredits,
} from "../actions/creditActions";

const initialState = {
  credits: 0,
  transactions: [],
  loading: false,
  error: null,
};

const creditSlice = createSlice({
  name: "credits",
  initialState,
  reducers: {
    clearCreditError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Credits
      .addCase(fetchCredits.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCredits.fulfilled, (state, action) => {
        state.loading = false;
        state.credits = action.payload.credits;
      })
      .addCase(fetchCredits.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch Transactions
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.transactions = action.payload.transactions;
      })
      // Add Credits
      .addCase(addCredits.fulfilled, (state, action) => {
        state.credits += action.payload.amount;
        state.transactions.unshift(action.payload.transaction);
      })
      // Deduct Credits
      .addCase(deductCredits.fulfilled, (state, action) => {
        state.credits -= action.payload.amount;
        state.transactions.unshift(action.payload.transaction);
      });
  },
});

export const { clearCreditError } = creditSlice.actions;
export default creditSlice.reducer;
