import authReducer from "../features/auth/authSlice"
import imageReducer from '../features/image/imageSlice'
import manualBillReducer from '../features/manual/manualSlice'
import { configureStore } from "@reduxjs/toolkit";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        image: imageReducer,
        manualBill: manualBillReducer,
    }
})