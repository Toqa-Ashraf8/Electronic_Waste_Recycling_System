import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../redux/global/uiSlice";
import authReducer from "../redux/auth/authSlice";
import catReducer from "../redux/categories/categorySlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        ui:uiReducer,
        category:catReducer,
    }
})