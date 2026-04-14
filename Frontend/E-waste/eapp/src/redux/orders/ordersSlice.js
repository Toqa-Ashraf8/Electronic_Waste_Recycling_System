import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchOrders, 
    fetchRejectedOrders, 
    fetchRequests, 
    saveOrders 
} from "../../services/ordersService";

const initialState={
    order:{
        OrderStatus:0,
        CheckDate:new Date().toISOString(),
        Notes:"",
    },
    requests:[],
    isOrdersImgsModalOpen:false,
    isOrdersAddressModalOpen:false,
    isConfirmOrderModalOpen:false,
    requestDeviceImg:"",
    isRejectOrderModalOpen:false,
    rowReqID:-1,
    ordersList:[],
    rejectedList:[]
}
const ordersSlice=createSlice({
    name:"orders",
    initialState,
    reducers:{
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
            if(state.requests.length>0){
                 state.requestDeviceImg=state.requests[action.payload].DeviceImagePath;
            }
            if(state.ordersList.length>0){
             state.requestDeviceImg=state.ordersList[action.payload].DeviceImagePath;
            }
            
        },
        setOrder:(state,action)=>{
            state.rowReqID=action.payload.reqId;
            state.order={...state.order,...action.payload.orderRow};
            if(action.payload.Action==="Approve"){
                state.order.OrderStatus=1;
            }
            else if(action.payload.Action==="Reject"){
                state.order.OrderStatus=2;
            }
        },
        toggleRejectReqModal:(state,action)=>{
            state.isRejectOrderModalOpen=action.payload;
        },
        setRejectNote:(state,action)=>{
            state.order={...state.order,...action.payload};
        }
},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchRequests.fulfilled,(state,action)=>{
            state.requests=action.payload;
        })
        .addCase(saveOrders.fulfilled,(state,action)=>{
            if(action.payload.saved===true){
             state.isConfirmOrderModalOpen=false;
             state.isRejectOrderModalOpen=false;
             state.requests=state.requests.filter(req=>req.RequestID!==state.rowReqID);
            }
        })
        .addCase(fetchOrders.fulfilled,(state,action)=>{
            state.ordersList=action.payload;
        })
        .addCase(fetchRejectedOrders.fulfilled,(state,action)=>{
            state.rejectedList=action.payload;
        })
    }
})
export const{
    setOrder,
    toggleOrdersImgModal,
    toggleOrdersAdrModal,
    toggleconfirmReqModal,
    setImageRowIndex,
    toggleRejectReqModal,
    setRejectNote
}=ordersSlice.actions;
const orderReducer=ordersSlice.reducer;
export default orderReducer;