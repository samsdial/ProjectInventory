import React, { useEffect, useState } from "react";
import { TableApp } from "../../components/TableApp";
import { IProduct } from "../../interfaces/product";
import { getProducts } from "../../api/products/getProducts";
import { ModalForms } from "../../components/ModalForms";
import { FormProduct } from "../../components/FormProduct";
import { CustomModal } from "../../components/CustomModal";

const columnTitles = [
    "id",
    "name",
    "description",
    "stock",
    "category",
    "imgurl",
];

export const ProductsPage: React.FC = () => {
    const [rowData, setRowData] = useState<IProduct[]>([]);
    //Definimos estados de los modales

    const [isLoading, setIsLoading] = useState<boolean>(true);//Proceso de carga inicial
    const [error, setError] = useState<string | null>(null);// Porceso de carga inicial identifica error

    const [openModalForm, setOpenModalForm] = useState<boolean>(false);//1. Controla el modal con el formularios
    
    const [confirmCreateModalOpen, setConfirmCreateModalOpen] = useState<boolean>(false); //2. Modal Confirmar la creacion del producto
    const [modalMessage, setModalMessage] = useState<string>(""); // Mensaje para cualquier accion en proceso

    const [isLoadingModalOpen, setLoadingModalOpen] = useState(false);// Controla el modal de Proceso activo

    const [modalFinallyActionOpen, setModalFinallyActionOpen] = useState<boolean>(false); // Controla modal informa exito error 

    const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);

    const [confirmDeleteModalOpen, setConfirmDeleteModalOpen] = useState<boolean>(false);

    const [confirmUpdateModalOpen, setConfirmUpdateModalOpen] = useState<boolean>(false);// Modal actualizar


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


    const handleDeleteProduct = (product: IProduct) => {
        setSelectedProduct(product);
        setConfirmDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            setConfirmDeleteModalOpen(false);
            setModalMessage("Eliminando producto...");
            setLoadingModalOpen(true);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula la eliminacion
            setRowData((prev) => prev.filter((p) => p.id !== selectedProduct?.id));
            setSelectedProduct(null);
            setLoadingModalOpen(false);
        } catch (error) {
            setModalMessage("Error al intentar eliminar el producto."); // Mensaje de éxito
            setModalFinallyActionOpen(true);
        } finally {
            setModalMessage("Producto eliminado con éxito."); // Mensaje de éxito
            setModalFinallyActionOpen(true);

        }
    };

    const handleEditProduct = (product: IProduct) => {
        setSelectedProduct(product);
        setOpenModalForm(true); //Abre el modal con el formulario
    };

    const handleUpdateProduct = async () => {
        try {
            setOpenModalForm(false) //Cierra modal con formulario
            setConfirmUpdateModalOpen(false); // cierra el modal con botones para confirmar

            setModalMessage("Actualizando producto...");
            setLoadingModalOpen(true);

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula la creación
            setRowData((prev) => [...prev]);
            setSelectedProduct(null);
            setLoadingModalOpen(false); // Cierra modal que esta a la espera de la creacion del producto

        } catch (error) {
            setModalMessage("Error al actualizar el producto.");
            setModalFinallyActionOpen(true); // abre modal de exito o error
        } finally {
            setModalMessage("Producto actualizado con exitó..."); // crea mensjae para modal 
            setModalFinallyActionOpen(true); // abre modal de exito o error
        }
    };

    const handleAddProduct = () => {//Button Add Product
        setOpenModalForm(true); //Abre el modal con el formulario
    };

    const handleCreateProduct = async () => {
        try {
            setOpenModalForm(false) //Cierra modal con formulario
            setConfirmCreateModalOpen(false); // cierra el modal con botones para confirmar

            setModalMessage("Creando producto...");
            setLoadingModalOpen(true);

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula la creación
            setRowData((prev) => [...prev]);

            setLoadingModalOpen(false); // Cierra modal que esta a la espera de la creacion del producto

        } catch (error) {
            setModalMessage("Error al crear producto.");
            setModalFinallyActionOpen(true); // abre modal de exito o error
        } finally {

            setModalMessage("Producto creado con exitó..."); // crea mensjae para modal 
            setModalFinallyActionOpen(true); // abre modal de exito o error
        }
    };

    // if (error) {
    //     return <div>Error: {error}</div>;
    // }

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
            <ModalForms open={openModalForm} onClose={() => {
                setOpenModalForm(false);
                setSelectedProduct(null);
            }} title={selectedProduct ? "Update Product" : "Create Product"}
            >
                <FormProduct onSubmit={() => selectedProduct ? setConfirmUpdateModalOpen(true) : setConfirmCreateModalOpen(true)} productToEdit={selectedProduct} />
            </ModalForms>

            {/* Modal de informando accion exitosa o error  */}
            <CustomModal
                open={modalFinallyActionOpen}
                onClose={() => setModalFinallyActionOpen(false)}
                message={modalMessage}
                loading={false}
                isSuccessMessage={true}
            />

            {/* Modal de carga */}
            <CustomModal
                open={isLoadingModalOpen}
                onClose={() => setLoadingModalOpen(false)}
                message={modalMessage}
                loading={true}
            />

            {/* Modal de confirmación de eliminación */}
            <CustomModal
                open={confirmDeleteModalOpen}
                onClose={() => {
                    setConfirmDeleteModalOpen(false);
                    setSelectedProduct(null);
                }}
                message={`¿Está seguro de que desea eliminar el producto "${selectedProduct?.name}"?`}
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

            {/* Modal de confirmación de edicion*/}
            <CustomModal
                open={confirmUpdateModalOpen}
                onClose={() => setConfirmUpdateModalOpen(false)}
                message="¿Desea actualizar este producto?"
                loading={false}
                onConfirmAction={handleUpdateProduct}
            />
        </div>
    );
};
