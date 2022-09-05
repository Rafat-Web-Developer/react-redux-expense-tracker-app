import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFilteredTransaction } from "./filterAPI";

const initialState = {
  transactions: [],
  isLoading: false,
  isError: false,
  error: "",
  search: "",
  type: "income",
};

export const filteredTransactions = createAsyncThunk(
  "filter/filteredTransactions",
  async ({ search, type }) => {
    const transactions = await fetchFilteredTransaction(search, type);
    return transactions;
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(filteredTransactions.pending, (state) => {
        state.isError = false;
        state.error = "";
        state.isLoading = true;
      })
      .addCase(filteredTransactions.fulfilled, (state, action) => {
        state.isError = false;
        state.error = "";
        state.isLoading = false;
        state.transactions = action.payload;
      })
      .addCase(filteredTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default filterSlice.reducer;
export const { setType, setSearch } = filterSlice.actions;
