import { createSlice } from "@reduxjs/toolkit";
import { manualBill } from "./manualAction";

const manualBillSlice = createSlice({
  name: "manualBill",
  initialState: {
    manual: "",
    loading: false,
    error: null,
  },

  reducers: {
    clearExplanation: (state) => {
      state.manual = "";
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(manualBill.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(manualBill.fulfilled, (state, action) => {
        state.loading = false;
        state.manual = action.payload;
      })
      .addCase(manualBill.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearExplanation } = manualBillSlice.actions;
export default manualBillSlice.reducer;
