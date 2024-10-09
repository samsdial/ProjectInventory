import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../pages/auth";
import { AppRoutes } from "../pages/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../types/stateGlobal";


export const MainRouter: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState)=> state.auth.isAutheticated)
    
    return (
        <Routes>
            {isAuthenticated ? (
                <>
                    <Route path="/home/*" element={<AppRoutes />} />
                    <Route path="/*" element={<Navigate to="/home" />} />
                </>
            ) : (
                <>
                    <Route path="/*" element={<AuthRoutes />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </>
            )}
        </Routes>
    );
};
