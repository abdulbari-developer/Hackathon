import { createSlice } from "@reduxjs/toolkit";
import { signUP, signIn } from "./authAction";


export const authSlice = createSlice({
    name: "authSlice",
    initialState:{
        user:[],
        error:null,
        loading:false,
        message:''
    },
    reducers:{},
    extraReducers: (builder)=>{
 builder
 .addCase(signUP.pending,(state)=>{
    state.loading=true;
 })
 .addCase(signUP.fulfilled,(state,action)=>{
    state.loading= false,
    state.user=action.payload
    state.message=action.payload.message
 })
 .addCase(signUP.rejected,(state,action)=>{
    state.loading= false,
    state.error=action.payload
 })
 .addCase(signIn.pending,(state)=>{
    state.loading=true;
 })
 .addCase(signIn.fulfilled,(state,action)=>{
    state.loading= false,
    state.user=action.payload
    state.message=action.payload.message
 })
 .addCase(signIn.rejected,(state,action)=>{
    state.loading= false,
    state.error=action.payload
 })
    }
})

export default authSlice.reducer
