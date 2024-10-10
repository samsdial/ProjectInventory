import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { AuthRoutes } from "../pages/auth";
import { AppRoutes } from "../pages/dashboard";
import { useSelector } from "react-redux";
import { RootState } from "../types/stateGlobal";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export const MainRouter: React.FC = () => {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    if (isAuthenticated === null) {
        return <p>Loading...</p>;
    }

    return (
        <Routes>
            {/*Rutas publicas*/}
            <Route path="/auth/*" element={
                <PublicRoute>
                    <AuthRoutes />
                </PublicRoute>
            } />

            {/*Rutas privadas*/}
            <Route path="/home/*" element={
                <PrivateRoute>
                    <AppRoutes />
                </PrivateRoute>
            } />

            {/*Redirecciona a rutas base segun estado de autenticacion*/}
            <Route path="/*" element={<Navigate to={isAuthenticated ? "/home/dashboard" : "/auth/login"} />} />
        </Routes>
    );
};
