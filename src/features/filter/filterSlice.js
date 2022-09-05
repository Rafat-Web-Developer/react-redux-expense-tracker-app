import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchFilteredTransaction } from "./filterAPI";

const initialState = {
  isLoading: false,
  isError: false,
  error: "",
  search: "",
  type: "",
  page: 1,
  limit: 10,
  total: 0,
};

export const filteredTransactions = createAsyncThunk(
  "filter/filteredTransactions",
  async ({ search, type, page }) => {
    const transactions = await fetchFilteredTransaction(search, type, page);
    return transactions;
  }
);

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setType: (state, action) => {
      state.type = action.payload;
      state.page = 1;
    },
    setSearch: (state, action) => {
      state.search = action.payload;
      state.page = 1;
    },
    setPageNumber: (state, action) => {
      state.page = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    resetFilter: (state) => {
      state.search = "";
      state.type = "";
      state.page = 1;
      state.limit = 0;
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
        state.transactions = action.payload.searchData;
        state.total = action.payload.totalData;
      })
      .addCase(filteredTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.transactions = [];
        state.total = 0;
        state.isError = true;
        state.error = action.error.message;
      });
  },
});

export default filterSlice.reducer;
export const { setType, setSearch, setPageNumber, resetFilter, setLimit } =
  filterSlice.actions;
