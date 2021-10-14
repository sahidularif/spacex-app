import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import   fetchApiSlice  from "./slices/fetchApiSlice";




export const store = configureStore({
    reducer: {
        fetchApi: fetchApiSlice,
    },
    middleware: [thunk],
    devTools: process.env.NODE_ENV !== "production",
})