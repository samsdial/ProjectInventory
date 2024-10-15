import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Button,
    Modal,
    Box,
    TextField,
} from "@mui/material";
import { ModalForms } from "./ModalForms";
import { FormProduct } from "./FormProduct";
import { updateProduct } from "../api/products/updateProduct";


export interface TableAppProps {
    columnTitles: string[];
    rowData: (string | number)[][];
    nameTable: string;
    actions?: Boolean;
}

export const TableApp: React.FC<TableAppProps> = ({
    columnTitles,
    rowData,
    nameTable,
    actions,
}) => {
    const [openModal, setOpenModal] = useState<{ open: boolean; rowIndex: number | null }>({ open: false, rowIndex: 2 });

    const handleOpenModal = (rowIndex: number) => setOpenModal({ open: true, rowIndex });
    const handleCloseModal = () => {
        setOpenModal({ open: false, rowIndex: null });
        updateProduct();
        //Pendiente Crear modal de Actualizando producto y despues producto Actualizado con exito...    
    }

    return (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="div" sx={{ padding: 2 }}>
                {nameTable}
            </Typography>

            {/* Tabla */}
            <Table>
                <TableHead>
                    <TableRow>
                        {columnTitles.map((title, index) => (
                            <TableCell key={index}>{title}</TableCell>
                        ))}
                        {
                            actions && <TableCell>Acciones</TableCell>
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData.map((row, rowIndex) => (
                        <TableRow
                            key={rowIndex}
                            sx={{
                                backgroundColor: rowIndex % 2 === 0 ? "#ffff" : "#f8fafc",
                                "&:hover": {
                                    backgroundColor: "#eef2ff",
                                },
                            }}
                        >
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex}>{cell}</TableCell>
                            ))}
                            {
                                actions && <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(rowIndex)}>
                                        Acción 1
                                    </Button>
                                    <Button variant="contained" color="secondary" sx={{ marginLeft: 1 }} onClick={() => handleOpenModal(rowIndex)}>
                                        Acción 2
                                    </Button>
                                </TableCell>
                            }
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ModalForms
                open={openModal.open}
                onClose={handleCloseModal}
                title="Modal de Acción"
                description={`Modal ${openModal.rowIndex !== null ? openModal.rowIndex + 1 : ''}.`}
            >
                <FormProduct onSubmit={handleCloseModal} />
            </ModalForms>

        </TableContainer>
    );
};
