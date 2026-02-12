import { createAsyncThunk } from "@reduxjs/toolkit";

export const manualBill = createAsyncThunk(
  "manualBill/explain",
  async (billData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:3005/manual/manual-bill", {
         method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
        body: JSON.stringify(billData),
      });

      const data = await res.json();

      if (!res.ok) {
        return rejectWithValue(data.message || "Failed to explain bill");
      }

      return data.explanation;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
