import React from "react";
import { TableApp } from "../../components/TableApp";
const columnTitles = [
    "title1",
    "title2",
    "title3",
    "title4",
    "title5",
    "title6",
    "title7",
    "title8",
    "title9",
];

const rowData = [
    ["row1", 159, 6.0, 24, 4.0, 1.333, 1.333, 1.333, 1.333],
    ["row1", 159, 6.0, 24, 4.0, 1.333, 1.333, 1.333, 1.333],
    ["row1", 159, 6.0, 24, 4.0, 1.333, 1.333, 1.333, 1.333],
    ["row1", 159, 6.0, 24, 4.0, 1.333, 1.333, 1.333, 1.333],
    ["row1", 159, 6.0, 24, 4.0, 1.333, 1.333, 1.333, 1.333],
    ["row1", 159, 6.0, 24, 4.0, 1.333, 1.333, 1.333, 1.333],
    ["row1", 159, 6.0, 24, 4.0, 1.333, 1.333, 1.333, 1.333],    
];

export const ProductsPage: React.FC = () => {
    return (
        <div className="fade-in">
            <TableApp columnTitles={columnTitles} rowData={rowData} nameTable="Products" />
        </div>
    );
};
