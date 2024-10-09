import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../interfaces/auth";

const initialState: IAuthState = {
    isAutheticated: false,
}

const sliceAuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAutheticated = true;
        },
        logout: (state) => {
            state.isAutheticated = false;
        }
    }
});

export const { login, logout } = sliceAuthReducer.actions;

export default sliceAuthReducer.reducer;