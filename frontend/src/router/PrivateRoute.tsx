import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";
import { RootState } from "../types/stateGlobal";

export const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return isAuthenticated ? children : <Navigate to="/auth/login" />;
};
