import { configureStore } from "@reduxjs/toolkit";
import followingPostReducer from "../feature/followingPostSlice";

export const store = configureStore({
    reducer: {
        followingPostReducer: followingPostReducer,
        // followingAccountReducer: followingAccountReducer,
        // checkProfileReducer: checkProfileReducer,
    },
    devTools: true,
});