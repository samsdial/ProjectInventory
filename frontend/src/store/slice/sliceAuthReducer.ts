import { createSlice } from "@reduxjs/toolkit";
import { IAuthState } from "../../interfaces/auth";

const initialState: IAuthState = {
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
}

const sliceAuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            
            localStorage.setItem("isAuthenticated", "true");
            state.isAuthenticated = true;
            
        },
        logout: (state) => {
            
            localStorage.removeItem("isAuthenticated");
            state.isAuthenticated = false;
            
        }
    }
});

export const { login, logout } = sliceAuthReducer.actions;

export default sliceAuthReducer.reducer;
