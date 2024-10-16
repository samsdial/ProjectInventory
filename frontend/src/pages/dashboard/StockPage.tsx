import React, { useEffect, useState } from "react";
import { IProduct } from "../../interfaces/product";
import { getProducts } from "../../api/products/getProducts";
import { TableStock } from "../../components/TableStock";
import { CustomModal } from "../../components/CustomModal";

const columnTitles = [
    "id",
    "Name",
    "Stock",
    "Image",
];

export const StockPage: React.FC = () => {
    const [rowData, setRowData] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [confirmIncreaseStockModalOpen, setConfirmIncreaseStockModalOpen] = useState<boolean>(false);
    const [confirmDecreaseStockModalOpen, setConfirmDecreaseStockModalOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [modalMessage, setModalMessage] = useState<string>("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();

                if (response.error) {
                    throw new Error(response.error.message);
                }
                setRowData(response.data || []);
            } catch (err: any) {
                setError(err.message || "Error al obtener productos");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const handleIncreaseStock = (product: IProduct) => {
        setSelectedProduct(product);
        setConfirmIncreaseStockModalOpen(true);
    };

    const handleDecreaseStock = (product: IProduct) => {
        setSelectedProduct(product);
        setConfirmDecreaseStockModalOpen(true);
    };

    const confirmIncreaseStock = async () => {
        try {
            // Simula la operación de aumentar stock
            setModalMessage(`Aumentando stock para "${selectedProduct?.name}"...`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setRowData((prev) =>
                prev.map((p) =>
                    p.id === selectedProduct?.id ? { ...p, stock: p.stock_current + 1 } : p
                )
            );
            setModalMessage("Stock aumentado con éxito.");
        } catch (error) {
            setModalMessage("Error al aumentar el stock.");
        } finally {
            setConfirmIncreaseStockModalOpen(false);
        }
    };

    const confirmDecreaseStock = async () => {
        try {
            // Simula la operación de disminuir stock
            setModalMessage(`Disminuyendo stock para "${selectedProduct?.name}"...`);
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setRowData((prev) =>
                prev.map((p) =>
                    p.id === selectedProduct?.id ? { ...p, stock: Math.max(0, p.stock_current - 1) } : p
                )
            );
            setModalMessage("Stock disminuido con éxito.");
        } catch (error) {
            setModalMessage("Error al disminuir el stock.");
        } finally {
            setConfirmDecreaseStockModalOpen(false);
        }
    };

    if (isLoading) {
        return <div>Cargando productos...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="fade-in">
            <TableStock
                columnTitles={columnTitles}
                rowData={rowData}
                nameTable="Stock Manager"
                actions={true}
            />

            {/* Modal de confirmación para aumentar stock */}
            <CustomModal
                open={confirmIncreaseStockModalOpen}
                onClose={() => setConfirmIncreaseStockModalOpen(false)}
                message={`¿Está seguro de que desea aumentar el stock del producto "${selectedProduct?.name}"?`}
                loading={false}
                onConfirmAction={confirmIncreaseStock}
            />

            {/* Modal de confirmación para disminuir stock */}
            <CustomModal
                open={confirmDecreaseStockModalOpen}
                onClose={() => setConfirmDecreaseStockModalOpen(false)}
                message={`¿Está seguro de que desea disminuir el stock del producto "${selectedProduct?.name}"?`}
                loading={false}
                onConfirmAction={confirmDecreaseStock}
            />

            {/* Modal de mensaje de acción */}
            <CustomModal
                open={!!modalMessage}
                onClose={() => setModalMessage("")}
                message={modalMessage}
                loading={false}
            />
        </div>
    );
};
