import { createAsyncThunk } from "@reduxjs/toolkit";
import  axios  from "axios";
import { variables } from "../components/variables";
 
export const saveImagePath=createAsyncThunk("saveImagePath/auth",async(image)=>{
    const resp=await axios.post(variables.AUTH_API+"UploadUserImage",image)
    .then((res)=>res.data);
    return resp;
})
export const newUserRegister=createAsyncThunk("newUserRegister/auth",async(user)=>{
    const resp=await axios.post(variables.AUTH_API+"Register",user)
    .then((res)=>res.data);
    return resp;
})
export const loginUser=createAsyncThunk("loginUser/auth",async(user)=>{
    const resp=await axios.post(variables.AUTH_API+"Login",user)
    .then((res)=>res.data);
    return resp;
})