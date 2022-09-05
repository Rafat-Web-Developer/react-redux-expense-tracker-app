import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: "",
  type: "income",
};

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
});

export default filterSlice.reducer;
export const { setType, setSearch } = filterSlice.actions;
