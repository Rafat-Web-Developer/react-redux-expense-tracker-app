import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  fetchTransactions,
  updateTransaction,
} from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};

// create thunks
export const fetchAllTransactions = createAsyncThunk(
  "transaction/fetchAllTransactions",
  async () => {
    const transactions = await fetchTransactions();
    return transactions;
  }
);
export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (data) => {
    const transaction = await addTransaction(data);
    return transaction;
  }
);
export const editTransaction = createAsyncThunk(
  "transaction/editTransaction",
  async ({ id, data }) => {
    const transaction = await updateTransaction(id, data);
    return transaction;
  }
);

// create slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTransactions.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.transactions = [];
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(createTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";
        state.transactions.push(action.payload);
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      })
      .addCase(editTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
        state.error = "";
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.isError = false;
        state.isLoading = false;
        state.error = "";

        const index = state.transactions.findIndex(
          (t) => t.id === action.payload.id
        );

        state.transactions[index] = action.payload;
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;
