import { createSlice } from "@reduxjs/toolkit";
import { fetchBrands, fetchPriceEstimation, fetchRequests, saveData, saveDeviceImagePath } from "../../services/sellingService";

const initialState={
    request:{},
    brands:[],
    priceEstimation:{},
    deviceImgPath:"",
    requestsList:[]
}
const sellingSlice=createSlice({
    name:'selldevice',
    initialState,
    reducers:{
        setRequestValues:(state,action)=>{
            state.request={...state.request,...action.payload};
            if(!state.request.RequestID){
                 state.request={RequestID:0,...state.request,...action.payload};
            }
            else{
                 state.request={...state.request,...action.payload};
            }
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchBrands.fulfilled,(state,action)=>{
            state.brands=action.payload;
        })
        .addCase(fetchPriceEstimation.fulfilled, (state, action) => {
            if (action.payload && action.payload.conditions && action.payload.conditions.length > 0) {
                state.priceEstimation = action.payload.conditions[0];
                state.request.DeviceCondition=state.priceEstimation.Condition;
                state.request.EstimatedPrice=state.priceEstimation.EstimatedPrice;
             
            } else {
                state.priceEstimation = {}; 
            }
        }) 
        .addCase(saveDeviceImagePath.fulfilled,(state,action)=>{
            state.deviceImgPath=action.payload;
        }) 
        .addCase(saveData.fulfilled,(state,action)=>{
            state.request.RequestID=action.payload.id;
        })
        .addCase(fetchRequests.fulfilled,(state,action)=>{
            state.requestsList=action.payload;
        })
       
    }
})
export const {setRequestValues}=sellingSlice.actions;
const sellReducer=sellingSlice.reducer;
export default sellReducer;