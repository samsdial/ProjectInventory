import React, { useEffect, useState } from "react";
import { TableApp } from "../../components/TableApp";
import { IProduct } from "../../interfaces/product";
import { getProducts } from "../../api/products/getProducts";
import { IsLoading } from "../../components/IsLoading";

const columnTitles = [
    "id",
    "name",
    "description",
    "stock",
    "category",
    "imgurl",
];


export const HistoryMovementsPage: React.FC = () => {
    const [rowData, setRowData] = useState<IProduct[]>([]);
    const [isloading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
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
            <TableApp columnTitles={columnTitles} rowData={rowData} nameTable="History of movements" />
        </div>
    );
};
