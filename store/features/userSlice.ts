import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../types";

interface IUserState {
    user: IUser | null;
}

const initialState: IUserState = {
    user: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = null;
        },
    }
})

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;