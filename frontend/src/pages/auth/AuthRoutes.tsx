import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { LoginPage, RegisterPage } from "./";

export const AuthRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/*" element={<Navigate to="/login" />} />
        </Routes>
    );
};
