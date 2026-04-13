import { createSlice } from "@reduxjs/toolkit";
import { fetchRequests } from "../../services/ordersService";

const initialState={
    order:{
        RequestID:0,
        UserID:0,
        OrderStatus:-1,
        CheckDate:new Date().toISOString(),
        Notes:"",
},
    requests:[],
    isOrdersImgsModalOpen:false,
    isOrdersAddressModalOpen:false,
    isConfirmOrderModalOpen:false,
    requestDeviceImg:"",
}
const ordersSlice=createSlice({
    name:"orders",
    initialState,
    reducers:{
        setOrder:(state,action)=>{
            state.order={...state.order,...action.payload};
        },
        toggleOrdersImgModal:(state,action)=>{
            state.isOrdersImgsModalOpen=action.payload;
        },
        toggleOrdersAdrModal:(state,action)=>{
            state.isOrdersAddressModalOpen=action.payload;
        },
        toggleconfirmReqModal:(state,action)=>{
            state.isConfirmOrderModalOpen=action.payload;
        },
        setImageRowIndex:(state,action)=>{
            state.requestDeviceImg=state.requests[action.payload].DeviceImagePath;
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchRequests.fulfilled,(state,action)=>{
            state.requests=action.payload;
        })
    }
})
export const{
    setOrder,
    toggleOrdersImgModal,
    toggleOrdersAdrModal,
    toggleconfirmReqModal,
    setImageRowIndex
}=ordersSlice.actions;
const orderReducer=ordersSlice.reducer;
export default orderReducer;