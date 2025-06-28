import { configureStore } from "@reduxjs/toolkit"
import { userSlice } from "./features/userSlice";

export function makeStore(preloadedState = {}) {
    return configureStore({
        reducer: {
            [userSlice.name]: userSlice.reducer
        },
        preloadedState,
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState  = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];