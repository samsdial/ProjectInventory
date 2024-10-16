import React, { useEffect, useState } from "react";
import { TableApp } from "../../components/TableApp";
import { IProduct } from "../../interfaces/product";
import { getProducts } from "../../api/products/getProducts";
import { ModalForms } from "../../components/ModalForms";
import { FormProduct } from "../../components/FormProduct";
import { CustomModal } from "../../components/CustomModal";

const columnTitles = [
    "ID",
    "Imagen",
    "Nombre",
    "Descripción",
    "Stock",
    "Categoría",
];

export const ProductsPage: React.FC = () => {
    const [rowData, setRowData] = useState<IProduct[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [openModalForm, setOpenModalForm] = useState<boolean>(false);//Controla el modal con el formularios

    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState<string>(""); // Mensaje para el modal
    const [modalOpenOk, setModalOpenOk] = useState<boolean>(false); // Mensaje para el modal
    const [loadingMessage, setLoadingMessage] = useState<string>("");
    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState(false);
    const [confirmCreateModalOpen, setConfirmCreateModalOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState<IProduct | null>(null);

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

    const handleEditProduct = (product: IProduct) => {
        setSelectedProduct(product);
        //setOpenModal(true);
    };

    const handleDeleteProduct = (product: IProduct) => {
        setProductToDelete(product);
        setConfirmDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            setLoadingMessage("Eliminando producto...");
            setLoadingModalOpen(true);

            setRowData((prev) => prev.filter((p) => p.id !== productToDelete?.id));

            setModalMessage("Producto eliminado con éxito."); // Mensaje de éxito
        } catch (error) {
            setLoadingMessage("Error eliminando producto.");
        } finally {
            setLoadingModalOpen(false);
            setConfirmDeleteModalOpen(false);
        }
    };



    const handleAddProduct = () => {//Button Add Product
        setOpenModalForm(true); //Abre el modal con el formulario
    };

    const handleCreateProduct = async () => {
        try {
            setOpenModalForm(false) //Cierra modal con formulario
            setConfirmCreateModalOpen(false); 

            setLoadingMessage("Creando producto...");
            setLoadingModalOpen(true);

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula la creación
            setRowData((prev) => [...prev]);

            setLoadingModalOpen(false);

        } catch (error) {
            setLoadingMessage("Error al crear producto.");
        } finally {

            setLoadingMessage("Producto creado con exitó...");
            setModalOpenOk(true);
        }
    };

    const handleCloseModal = async () => {
        setLoadingMessage("Actualizando producto...");
        setLoadingModalOpen(true);
        setIsLoading(true);
        // Lógica para actualizar o agregar producto
        //setOpenModal(false);
        setLoadingModalOpen(false);
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="fade-in">
            <TableApp
                columnTitles={columnTitles}
                rowData={rowData}
                nameTable="Products"
                actions={true}
                onEdit={handleEditProduct}
                onDelete={handleDeleteProduct}
                onAdd={handleAddProduct}
            />

            {/* Modal para editar o agregar productos */}
            <ModalForms open={openModalForm} onClose={() => setOpenModalForm(false)} title={selectedProduct ? "Update Product" : "Create Product"}>
                <FormProduct onSubmit={() => setConfirmCreateModalOpen(true)} />
            </ModalForms>

            {/* Modal de informando accion exitosa  */}
            <CustomModal
                open={modalOpenOk}
                onClose={() => setModalOpenOk(false)}
                message={loadingMessage}
                loading={false}
                isSuccessMessage={true}
            />

            {/* Modal de carga */}
            <CustomModal
                open={isLoadingModalOpen}
                onClose={() => setLoadingModalOpen(false)}
                message={loadingMessage}
                loading={true}
            />

            {/* Modal de confirmación de eliminación */}
            <CustomModal
                open={confirmDeleteModalOpen}
                onClose={() => setConfirmDeleteModalOpen(false)}
                message={`¿Está seguro de que desea eliminar el producto "${productToDelete?.name}"?`}
                loading={false}
                onConfirmAction={confirmDelete}
            />

            {/* Modal de confirmación de creación */}
            <CustomModal
                open={confirmCreateModalOpen}
                onClose={() => setConfirmCreateModalOpen(false)}
                message="¿Desea crear este nuevo producto?"
                loading={false}
                onConfirmAction={handleCreateProduct}
            />
        </div>
    );
};
