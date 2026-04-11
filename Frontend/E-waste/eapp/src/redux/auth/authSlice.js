import { createSlice } from "@reduxjs/toolkit";
import { loginUser, newUserRegister, saveImagePath } from "../../services/authService";

const initialState={
    user:{},
    userImgPath:"",
    token:sessionStorage.getItem('token'),
    role:sessionStorage.getItem('role'),
    userAddress:sessionStorage.getItem('address'),
   
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserValues:(state,action)=>{
            state.user={...state.user,...action.payload};
        },
      
    },
    extraReducers:(builder)=>{
        builder
        .addCase(saveImagePath.fulfilled,(state,action)=>{
            state.userImgPath=action.payload;
        })
        .addCase(newUserRegister.fulfilled,(state,action)=>{
            if(action.payload.token){
                sessionStorage.setItem('token',action.payload.token);
                state.token=action.payload.token;
            }
            sessionStorage.setItem('role',action.payload.role);
            state.role=action.payload.role;
            sessionStorage.setItem('address',action.payload.address);
            state.userAddress=action.payload.address;
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            if(action.payload.token){
                sessionStorage.setItem('token',action.payload.token);
                state.token=action.payload.token;
            }
            if(action.payload.address){
                 sessionStorage.setItem('address',action.payload.address);
                 state.userAddress=action.payload.address;
            }
           
        })
    }
})
export const {setUserValues}=authSlice.actions;
const authReducer=authSlice.reducer;
export default authReducer;