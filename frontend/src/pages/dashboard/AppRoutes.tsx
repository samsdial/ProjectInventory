import { Box, Grid } from "@mui/material";
import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { Header } from "../../components/Header";
import { INavLink, SideBar } from "../../components/SideBar";
import { HistoryMovementsPage } from "./HistoryMovementsPage";
import { ProductsPage } from "./ProductsPage";
import { ReportsPage } from "./ReportsPage";
import { StockPage } from "./StockPage";

const items: INavLink[] = [
  { navItemText: "Products", to: "/dashboard/products" },
  // { navItemText: "Stock", to: "/dashboard/stock" },
  { navItemText: "Reports", to: "/dashboard/reports" },
  { navItemText: "History of movements", to: "/dashboard/history" },
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
            maxHeight: "calc(100vh - 64px)",
            overflowY: "auto",
            padding: 2,
          }}
        >
          <Routes>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/stock" element={<StockPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/history" element={<HistoryMovementsPage />} />
            <Route path="/*" element={<Navigate to="/products" />} />
          </Routes>
        </Box>
      </Grid>
    </Grid>
  );
};
