import React from "react";
import { TopProductsPage } from "./TopProductsPage";
import { MovementHistoryPage } from "./MovementHistoryPage";

export const ReportsPage: React.FC = () => {
  return (
    <>
      <div className="fade-in mt-6">
        <h2>Top 5 Products by Inventory Movements in the Last Month</h2>
        <TopProductsPage />
      </div>
      <div className="fade-in mt-6">
        <h2>Inventory Movements Over Selected Date Range</h2>
        <MovementHistoryPage />
      </div>
    </>
  );
};
