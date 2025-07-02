//store/features/userSlice.tsx
import api, { GET_OWN_PROFILE } from "@/apis/api";
import { IUser } from "@/types/types";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserReducerInitialState {
    user: IUser | null;
    loading: boolean;
}

const initialState: UserReducerInitialState = {
    user: null,
    loading: true,
};

export const fetchOwnProfile = createAsyncThunk<IUser | null>(
    'user/fetchOwnProfile',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await api.get(GET_OWN_PROFILE);
            return data.data as IUser;
        } catch (err) {
            return rejectWithValue(null);
        }
    }
);

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
    extraReducers: (builder) => {
        builder
            .addCase(fetchOwnProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchOwnProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(fetchOwnProfile.rejected, (state) => {
                state.user = null;
                state.loading = false;
            });
    },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
