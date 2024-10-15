import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { DashboardPage } from "./DashboardPage";
import { ReportsPage } from "./ReportsPage";
import { INavLink, SideBar } from "../../components/SideBar";
import { Header } from "../../components/Header";
import { ProductsPage } from "./ProductsPage";
import { HistoryMovementsPage } from "./HistoryMovementsPage";
import { Box, Grid } from "@mui/material";

const items: INavLink[] = [

    { navItemText: "Products", to: "/home/products" },
    { navItemText: "Reports", to: "/home/reports" },
    { navItemText: "History of movements", to: "/home/history" },
];

export const AppRoutes: React.FC = () => {
    return (
        <Grid container sx={{ height: "100vh", overflow: "hidden" }}>

            <Grid item sx={{ height: "100vh", flex: "0 0 250px" }}>
                <SideBar items={items} />
            </Grid>


            <Grid item sx={{ flex: 1, display: "flex", flexDirection: "column" }}>

                <Box
                    component="header"
                    sx={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 1100,
                        bgcolor: "background.paper",
                        boxShadow: 1,
                    }}
                >
                    <Header />
                </Box>


                <Box
                    sx={{
                        flex: 1,
                        marginTop: "64px",
                        overflowY: "auto",
                        padding: 2,
                    }}
                >
                    <Routes>
                        <Route path="/" element={<DashboardPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="/history" element={<HistoryMovementsPage />} />
                        <Route path="/*" element={<Navigate to="/home" />} />
                    </Routes>
                </Box>
            </Grid>
        </Grid>
    );
};
