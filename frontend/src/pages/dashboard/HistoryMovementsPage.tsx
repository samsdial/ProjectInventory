import React, { useEffect, useState } from "react";
import { TableApp } from "../../components/TableApp";
import { ITransaction } from "../../interfaces/product";
import { getTransactions } from "../../api/products/getProducts";
import { IsLoading } from "../../components/IsLoading";
import { TableTransaction } from "../../components/TableTransaction";

const columnTitles = [
    "product",
    "user",
    "description",
    "movement type",
    "quantity moved",
    "date",
];


export const HistoryMovementsPage: React.FC = () => {
    const [rowData, setRowData] = useState<ITransaction[]>([]);
    const [isloading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getTransactions();
                if (response.error) {
                    throw new Error(response.error.message);
                }
                setRowData(response.data || []);
            } catch (err: any) {
                
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (isloading) {
        return <IsLoading message="Loading..." />
    }

    return (
        <div className="fade-in">
            <TableTransaction columnTitles={columnTitles} rowData={rowData} nameTable="History of movements" />
        </div>
    );
};
