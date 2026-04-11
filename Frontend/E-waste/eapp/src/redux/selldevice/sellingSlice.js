import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchBrands, 
    fetchPriceEstimation, 
    fetchRequests, 
    removeRequest, 
    saveData, 
    saveDeviceImagePath 
} from "../../services/sellingService";

const initialState={
    request:{
        RequestID:0,
        CategoryID:'-1',
        DeviceCategory:"",
        ItemID:'-1',
        DeviceItem:"",
        DeviceBrand:"-1",
        DeviceQuality:'-1',
        DeviceCondition:"",
        EstimatedPrice:0,
        PickUpMethod:-1,
        ShippingAddress:"",
        PickUpDate:"",
        SubmissionDate:new Date().toISOString().split('T')[0],
        RequestStatus:0,
},
    brands:[],
    priceEstimation:{},
    deviceImgPath:"",
    requestsList:[],
    requestRowIndex:-1,
    requestRowId:-1,
    isDeleteReqModalOpen:false,
}
const sellingSlice=createSlice({
    name:'selldevice',
    initialState,
    reducers:{
        setRequestValues:(state,action)=>{
            state.request={...state.request, ...action.payload};
            if(!state.request.RequestID){
                 state.request={RequestID:0,...state.request,...action.payload};
            }
            else{
                 state.request={...state.request,...action.payload};
            }
        },
        setEditRequestIndex:(state,action)=>{
            state.requestRowIndex=action.payload;
            state.request=state.requestsList[state.requestRowIndex];
            state.request.PickUpDate=state.requestsList[state.requestRowIndex].PickUpDate.split('T')[0];
            state.deviceImgPath=state.requestsList[state.requestRowIndex].DeviceImagePath;
        },
        toggleDeleteReqModal:(state,action)=>{
            state.isDeleteReqModalOpen=action.payload;
        },
        setRemoveRequestIndex:(state,action)=>{
            state.requestRowId=state.requestsList[action.payload].RequestID;
            state.isDeleteReqModalOpen=true;
        },
        resetRequestForm:(state,action)=>{
            state.request=initialState.request;
            state.deviceImgPath="";
            state.priceEstimation = {};
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
        .addCase(removeRequest.fulfilled,(state,action)=>{
            state.requestsList=state.requestsList.filter((req=>req.RequestID!==state.requestRowId));
            state.requestRowId=-1;
        })
    }
})
export const {
    setRequestValues,
    setEditRequestIndex,
    toggleDeleteReqModal,
    setRemoveRequestIndex,
    resetRequestForm
}=sellingSlice.actions;
const sellReducer=sellingSlice.reducer;
export default sellReducer;