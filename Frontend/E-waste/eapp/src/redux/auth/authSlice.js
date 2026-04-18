import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchUserOrders, 
    loginUser, 
    newUserRegister, 
    saveImagePath 
} from "../../services/authService";

const initialState={
    user:{},
    userImgPath:"",
    token:sessionStorage.getItem('token'),
    userDetails:JSON.parse(sessionStorage.getItem('user')),
    ordersCount:0,
    pendingCount:0
}
const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUserValues:(state,action)=>{
            state.user={...state.user,...action.payload};
        },
        confirmLoggingin:(state,action)=>{
            state.isLoggedin=action.payload;
            if(state.isLoggedin===true){
              state.token="";
              state.user=initialState.user;
            }
        },
        resetUserForm:(state,action)=>{
            state.user=initialState.user;
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
             if(action.payload.userData){
                sessionStorage.setItem('user',JSON.stringify(action.payload.userData));
                state.userDetails=action.payload.userData;
            }
        })
        .addCase(loginUser.fulfilled,(state,action)=>{
            if(action.payload.token){
                sessionStorage.setItem('token',action.payload.token);
                state.token=action.payload.token;
            }
            if(action.payload.userData){
                sessionStorage.setItem('user',JSON.stringify(action.payload.userData));
                state.userDetails=action.payload.userData;
            }
        })
        .addCase(fetchUserOrders.fulfilled,(state,action)=>{
            state.ordersCount=action.payload.orders;
            state.pendingCount=action.payload.pending;
            if (state.userDetails) {
                state.userDetails.Points = action.payload.points;
                sessionStorage.setItem('user', JSON.stringify(state.userDetails));
            }
        })
    }
})
export const {setUserValues,confirmLoggingin,resetUserForm}=authSlice.actions;
const authReducer=authSlice.reducer;
export default authReducer;