import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAuthState, IUser } from "../../interfaces/auth";

const storedAuthData = localStorage.getItem("authData");
const initialState: IAuthState = storedAuthData ? JSON.parse(storedAuthData)
    : {
        isAuthenticated: false,
        data: {
            token: "",
            user: {
                id: 0,
                name: "",
                email: "",
                role: ""
            }
        }
    };

const sliceAuthReducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<IUser>) => {
            const authData = {
                isAuthenticated: true,
                data: {
                    ...action.payload,
                }
            };
            localStorage.setItem("authData", JSON.stringify(authData));
            state.isAuthenticated = true;
        },
        logout: (state) => {
            localStorage.removeItem("authData");
            state.isAuthenticated = false;
        }
    }
});

export const { login, logout } = sliceAuthReducer.actions;

export default sliceAuthReducer.reducer;
