import { createAsyncThunk } from "@reduxjs/toolkit";


export const addImage = createAsyncThunk('addImage', async (formData, { rejectWithValue }) => {
    try {
        let token = localStorage.getItem('token')
        const response = await fetch('http://localhost:3005/bill/billImage', {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData
        })
        console.log(token)
        const result = await response.json()
        console.log(result)
        return result

    } catch (error) {
        return rejectWithValue(error.message || 'Network error')
    }
})


export const explainBillAI = createAsyncThunk(
    "explainBillAI",
    async (imageURL, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("http://localhost:3005/bill/explain-bill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ imageURL })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue(error.message || "Network error");
        }
    }
);
