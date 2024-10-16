import React, { useEffect, useState } from "react";
import { TableApp } from "../../components/TableApp";
import { IProduct } from "../../interfaces/product";
import { getProducts } from "../../api/products/getProducts";
import { ModalForms } from "../../components/ModalForms";
import { FormProduct } from "../../components/FormProduct";
import { CustomModal } from "../../components/CustomModal";
import { IsLoading } from "../../components/IsLoading";

const columnTitles = [
    "id",
    "name",
    "description",
    "stock",
    "category",
    "imgurl",
];

const res = {
    error: null,
    data: [
        {
            id: '2',
            name: 'Product Two',
            description: 'Description for product two.',
            stock_current: 50,
            category_id: { name: 'Category B', _id: 'cat-2' },
            image: 'https://example.com/images/product2.jpg',
            warehouse_id: { name: 'Warehouse 2' },
            brand_id: 'brand-2',
            createdAt: '2024-10-15T12:00:00Z',
            quantity: 5,
            stock_min: '3',
        },
        {
            id: '1',
            name: 'Product One',
            description: 'Description for product one.',
            stock_current: 100,
            category_id: { name: 'Category A', _id: 'cat-1' },
            image: 'https://example.com/images/product1.jpg',
            warehouse_id: { name: 'Warehouse 1' },
            brand_id: 'brand-1',
            createdAt: '2024-10-15T12:00:00Z',
            quantity: 10,
            stock_min: '5',
        }

    ]
}



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

    const [originalData, setOriginalData] = useState<IProduct[]>([]);




    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await getProducts();
                if (response.error) {
                    throw new Error(response.error.message);
                }
                setRowData(response.data || []);
                setOriginalData(response.data || [])
                // setRowData(res.data)
                // setOriginalData(res.data)
            } catch (err: any) {
                setError(err.message || "Error getting products");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const sortProductsByStock = (isChecked: boolean) => {
        if (isChecked) {
            const sortedData = [...rowData].sort((a, b) => {
                return a.stock_current - b.stock_current;
            });
            setRowData(sortedData);
        } else {
            setRowData(originalData);
        }
    };

    const sortProductsByCategory = (isChecked: boolean) => {
        if (isChecked) {
            const sortedData = [...rowData].sort((a, b) => {
                return a.category_id.name.localeCompare(b.category_id.name);
            });
            setRowData(sortedData);
        } else {
            setRowData(originalData);
        }
    };

    const handleDeleteProduct = (product: IProduct) => {
        setSelectedProduct(product);
        setConfirmDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        try {
            setConfirmDeleteModalOpen(false);
            setModalMessage("Removing product...");
            setLoadingModalOpen(true);
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula la eliminacion
            setRowData((prev) => prev.filter((p) => p.id !== selectedProduct?.id));
            setSelectedProduct(null);
            setLoadingModalOpen(false);
        } catch (error) {
            setModalMessage("Error when trying to delete the product."); // Mensaje de éxito
            setModalFinallyActionOpen(true);
        } finally {
            setModalMessage("Product successfully removed."); // Mensaje de éxito
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

            setModalMessage("Updating product...");
            setLoadingModalOpen(true);

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula la creación
            setRowData((prev) => [...prev]);
            setSelectedProduct(null);
            setLoadingModalOpen(false); // Cierra modal que esta a la espera de la creacion del producto

        } catch (error) {
            setModalMessage("Error updating product.");
            setModalFinallyActionOpen(true); // abre modal de exito o error
        } finally {
            setModalMessage("Product updated successfully..."); // crea mensjae para modal 
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

            setModalMessage("Creating product...");
            setLoadingModalOpen(true);

            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simula la creación
            setRowData((prev) => [...prev]);

            setLoadingModalOpen(false); // Cierra modal que esta a la espera de la creacion del producto

        } catch (error) {
            setModalMessage("Error creating product.");
            setModalFinallyActionOpen(true); // abre modal de exito o error
        } finally {

            setModalMessage("Successfully created product..."); // crea mensjae para modal 
            setModalFinallyActionOpen(true); // abre modal de exito o error
        }
    };

    if (isLoading) {
        return <IsLoading message="Loading products..." />
    }

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
                onCheckBox={sortProductsByCategory}
                onCheckBoxStock={sortProductsByStock}
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
                message={`¿Are you sure you want to delete the product? "${selectedProduct?.name}"?`}
                loading={false}
                onConfirmAction={confirmDelete}
            />

            {/* Modal de confirmación de creación */}
            <CustomModal
                open={confirmCreateModalOpen}
                onClose={() => setConfirmCreateModalOpen(false)}
                message="¿You want to create this new product?"
                loading={false}
                onConfirmAction={handleCreateProduct}
            />

            {/* Modal de confirmación de edicion*/}
            <CustomModal
                open={confirmUpdateModalOpen}
                onClose={() => setConfirmUpdateModalOpen(false)}
                message="¿You want to update this product?"
                loading={false}
                onConfirmAction={handleUpdateProduct}
            />
        </div>

    );
};
