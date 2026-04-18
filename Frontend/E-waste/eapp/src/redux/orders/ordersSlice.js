import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchOrders, 
    fetchRejectedOrders, 
    fetchRequests, 
    getRequestWithDispatches, 
    recieveOK, 
    saveDispatch, 
    saveOrders, 
    search, 
    sendPoints,
} from "../../services/ordersService";

const initialState={
    order:{
        OrderStatus:0,
        CheckDate:new Date().toISOString(),
        Notes:"",
    },
    requests:[],
    isOrdersImgsModalOpen:false,
    isConfirmOrderModalOpen:false,
    requestDeviceImg:"",
    isRejectOrderModalOpen:false,
    rowReqID:-1,
    ordersList:[],
    rejectedList:[],
    isCourierModalOpen:false,
    dispatchData:{
        CourierName:"-1",
        CourierPhone:"",
        ArrivalTime:"", 
        CreatedAt:new Date().toISOString()
    },
    selectedCourier:[],
    isConfirmRecieveModal:false,
    isSendPointsModalOpen:false,
    orderDetail:{},
   
}
const ordersSlice=createSlice({
    name:"orders",
    initialState,
    reducers:{
        toggleOrdersImgModal:(state,action)=>{
            state.isOrdersImgsModalOpen=action.payload;
        },
        toggleconfirmReqModal:(state,action)=>{
            state.isConfirmOrderModalOpen=action.payload;
        },
        setImageRowIndex:(state,action)=>{
            if(action.payload.status==="pending"){
                 state.requestDeviceImg=state.requests[action.payload.index].DeviceImagePath;
            }
            if(action.payload.status==="inprocess"){
             state.requestDeviceImg=state.ordersList[action.payload.index].DeviceImagePath;
            }
            if(action.payload.status==="rejecting"){
                state.requestDeviceImg=state.rejectedList[action.payload.index].DeviceImagePath;
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
        },
        toggleCourierModal:(state,action)=>{
            state.isCourierModalOpen=action.payload;
            
        },
        setDispatchData:(state,action)=>{
            state.dispatchData={...state.dispatchData,...action.payload};
        },
        resetDipatchModal:(state,action)=>{
             state.dispatchData.CourierName="-1";
             state.dispatchData.CourierPhone="";
             state.dispatchData.ArrivalTime="";
        },
         toggleConfirmRecieveModal:(state,action)=>{
            state.isConfirmRecieveModal=action.payload;
        },
         toggleSendPointsModal:(state,action)=>{
            state.isSendPointsModalOpen=action.payload;
        },
        setOrderDetails:(state,action)=>{
            state.orderDetail=action.payload;
        },
        
        
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
        .addCase(saveDispatch.fulfilled,(state,action)=>{
            state.isCourierModalOpen=false;
        })
        .addCase(getRequestWithDispatches.fulfilled,(state,action)=>{
            state.selectedCourier=action.payload;
        })
        .addCase(recieveOK.fulfilled,(state,action)=>{
            state.isConfirmRecieveModal=false;
        }) 
        .addCase(sendPoints.fulfilled,(state,action)=>{
            state.isSendPointsModalOpen=false;
            
        })
        .addCase(search.fulfilled,(state,action)=>{
          state.ordersList=action.payload;
        }) 
        
    }
})
export const{
    setOrder,
    toggleOrdersImgModal,
    toggleconfirmReqModal,
    setImageRowIndex,
    toggleRejectReqModal,
    setRejectNote,
    toggleCourierModal,
    setDispatchData,
    resetDipatchModal,
    toggleConfirmRecieveModal,
    toggleSendPointsModal,
    setOrderDetails,
}=ordersSlice.actions;
const orderReducer=ordersSlice.reducer;
export default orderReducer;