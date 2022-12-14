import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTransaction,
  deleteTransaction,
  fetchTransactions,
  updateTransaction,
} from "./transactionAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  editing: {},
  total: 0,
};

// create thunks
export const fetchAllTransactions = createAsyncThunk(
  "transaction/fetchAllTransactions",
  async (filterData) => {
    const transactions = await fetchTransactions(filterData);
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
export const removeTransaction = createAsyncThunk(
  "transaction/removeTransaction",
  async (id) => {
    const transaction = await deleteTransaction(id);
    return transaction;
  }
);

// create slice
const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    setEditData: (state, action) => {
      state.editing = action.payload;
    },
    removeEditData: (state) => {
      state.editing = [];
    },
  },
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
        state.transactions = action.payload.searchData;
        state.total = action.payload.totalData;
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
      })
      .addCase(removeTransaction.pending, (state) => {
        state.isError = false;
        state.isLoading = true;
      })
      .addCase(removeTransaction.fulfilled, (state, action) => {
        console.log(action);
        state.isError = false;
        state.isLoading = false;

        state.transactions = state.transactions.filter(
          (t) => t.id !== action.meta.arg
        );
      })
      .addCase(removeTransaction.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.error?.message;
      });
  },
});

export default transactionSlice.reducer;
export const { setEditData, removeEditData } = transactionSlice.actions;
