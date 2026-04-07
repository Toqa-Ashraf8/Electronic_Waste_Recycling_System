import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../redux/global/uiSlice";
import authReducer from "../redux/auth/authSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        ui:uiReducer,
    }
})