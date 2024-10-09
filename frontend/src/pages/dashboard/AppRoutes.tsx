import React from "react";
import { Route, Routes } from "react-router";
import { MainPage } from "./MainPage";

export const AppRoutes: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} /> {/* Cambiado a '/' */}
        </Routes>
    );
};
