import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../redux/global/uiSlice";
import authReducer from "../redux/auth/authSlice";
import catReducer from "../redux/categories/categorySlice";
import sellReducer from "../redux/selldevice/sellingSlice";
import orderReducer from "../redux/orders/ordersSlice";
import cartReducer from "../redux/cart/cartSlice";
import storeReducer from "../redux/TechStore/storeSlice";

export const store=configureStore({
    reducer:{
        auth:authReducer,
        ui:uiReducer,
        category:catReducer,
        selldevice:sellReducer,
        orders:orderReducer,
        cart:cartReducer,
        store:storeReducer,
    }
})