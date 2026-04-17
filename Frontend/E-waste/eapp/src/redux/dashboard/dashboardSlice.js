import { createSlice } from "@reduxjs/toolkit";
import { 
    fetchPendingOrders, 
    fetchTotalPoints, 
    fetchStatistics, 
    fetchUsersCount, 
    fetchTotalOrdersCount,
    fetchCategoriesStats
} from "../../services/dashboardService";

const initialState={
    requestsStatistics:[],
    usersCount:0,
    pendingCount:0,
    totalPoints:0,
    totalOrders:0,
    categories:[]
}

const dashboardSlice=createSlice({
    name:'dashboard',
    initialState,
    extraReducers:(builder)=>{
        builder 
        .addCase(fetchStatistics.fulfilled,(state,action)=>{
            state.requestsStatistics=action.payload;
        })
        .addCase(fetchUsersCount.fulfilled,(state,action)=>{
            state.usersCount=action.payload;
        })
        .addCase(fetchPendingOrders.fulfilled,(state,action)=>{
            state.pendingCount=action.payload;
        })
        .addCase(fetchTotalPoints.fulfilled,(state,action)=>{
            state.totalPoints=action.payload;
        })
        .addCase(fetchTotalOrdersCount.fulfilled,(state,action)=>{
            state.totalOrders=action.payload;
        })
        .addCase(fetchCategoriesStats.fulfilled,(state,action)=>{
            state.categories=action.payload;
        })
    }
})
const dashReducer=dashboardSlice.reducer;
export default dashReducer;