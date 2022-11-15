import { configureStore } from "@reduxjs/toolkit";
import followingPostReducer from "../feature/followingPostSlice";
import allPostReducer from "../feature/allPostSlice";

export const store = configureStore({
    reducer: {
        followingPostReducer: followingPostReducer,
        allPostReducer: allPostReducer,
        // checkProfileReducer: checkProfileReducer,
    },
    devTools: true,
});