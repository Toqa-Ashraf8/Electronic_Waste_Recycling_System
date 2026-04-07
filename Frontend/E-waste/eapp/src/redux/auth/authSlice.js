import { createSlice } from "@reduxjs/toolkit";
import { newUserRegister, saveImagePath } from "../../services/authService";

const initialState={
    user:{},
    userImgPath:"",
    token:sessionStorage.getItem('token'),
    role:sessionStorage.getItem('role'),
   
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
        })
        
    }
})
export const {setUserValues}=authSlice.actions;
const authReducer=authSlice.reducer;
export default authReducer;