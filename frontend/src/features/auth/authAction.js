import { createAsyncThunk } from "@reduxjs/toolkit";
export const signUP = createAsyncThunk('signUp',async(data,{rejectWithValue})=>{
try{
  const responce = await fetch('http://localhost:3005/user/register',{
    method:"POST",
    headers:{
        "Content-Type": "application/json",
    },
    credentials:'include',
    body: JSON.stringify(data)
  })
  const result = await responce.json()
  console.log(result)
  return result
}
catch(err){
 return rejectWithValue(err)
}
})


export const signIn = createAsyncThunk('signIn',async(data,{rejectWithValue})=>{
try{
  const responce = await fetch('http://localhost:3005/user/login',{
    method:"POST",
    headers:{
        "Content-Type": "application/json",
    },
    body: JSON.stringify(data)
  })
  const result = await responce.json()
  console.log(result)
  if (result.token) {
    
    localStorage.setItem("token",result.token)
  }
  return result

}
catch(err){
 return rejectWithValue(err)
}
})