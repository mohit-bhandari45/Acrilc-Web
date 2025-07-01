//store/features/userSlice.tsx
import { IUser } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserReducerInitialState {
    user: IUser | null;
    loading: boolean;
}

const initialState: UserReducerInitialState = {
    user: null,
    loading: true,
};

export const userSlice = createSlice({
    name: "userReducer",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
            state.loading = false;
        },
        clearUser: (state) => {
            state.loading = false;
            state.user = null;
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
