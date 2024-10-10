import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { DashboardPage } from "./DashboardPage";
import { ReportsPage } from "./ReportsPage";
import { SideBar } from "../../components/SideBar";
import { Header } from "../../components/Header";
import { ProductsPage } from "./ProductsPage";
import { HistoryMovementsPage } from "./HistoryMovementsPage";

export const AppRoutes: React.FC = () => {
    return (
        <div className="grid grid-cols-[250px_1fr] grid-rows-[auto_1fr] h-screen fade-in">
            <div className="h-screen">
                <SideBar />
            </div>
            <main className="border-2 border-red-500 overflow-y-auto bg-gray-100 p-3 transition-all duration-300 ease-in-out mt-16">
                <header className="col-span-2 row-span-1">
                    <div className="fixed top-0 left-0 right-0">
                        <Header />
                    </div>
                </header>
                <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/products" element={<ProductsPage />} />
                    <Route path="/reports" element={<ReportsPage />} />
                    <Route path="/history" element={<HistoryMovementsPage />} />
                    <Route path="/*" element={<Navigate to="/home" />} />
                </Routes>
            </main>
        </div>
    );
};
