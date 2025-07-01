// store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import userSliceReducer, { userSlice } from "./features/userSlice";

export function makeStore(preloadedState = {}) {
    return configureStore({
        reducer: {
            [userSlice.name]: userSliceReducer,
        },
        preloadedState,
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
