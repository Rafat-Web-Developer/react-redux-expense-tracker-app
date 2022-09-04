import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
};

// create thunks
const fetchAllTransactions = createAsyncThunk(
  "transaction/fetchAllTransactions",
  async () => {
    const transactions = await fetchTransactions();
    return transactions;
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
        state.transactions = [];
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
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;
