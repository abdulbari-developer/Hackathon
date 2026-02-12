import { addImage, explainBillAI } from "./imageAction";
import { createSlice } from "@reduxjs/toolkit";

export const imageSlice = createSlice({
    name: 'imageSlice',
    initialState: {
        image: [],
        loading: false,
        error: null,
        message: '',
        aiResult: '',
        aiLoading: false,
        aiError: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add Image
            .addCase(addImage.pending, (state) => {
                state.loading = true;
            })
            .addCase(addImage.fulfilled, (state, action) => {
                state.loading = false;
                state.image = action.payload.billImage;
                state.message = action.payload.message;
                state.aiResult = action.payload.aiResult;


            })
            .addCase(addImage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Explain Bill AI
            .addCase(explainBillAI.pending, (state) => {
                state.aiLoading = true;
                state.aiError = null;
                state.aiResult = '';
            })
            .addCase(explainBillAI.fulfilled, (state, action) => {
                state.aiLoading = false;
                state.aiResult = action.payload.result;
            })
            .addCase(explainBillAI.rejected, (state, action) => {
                state.aiLoading = false;
                state.aiError = action.payload;
            })
    }
})

export default imageSlice.reducer;
