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
} from "@mui/material";

export interface TableAppProps {
    columnTitles: string[];
    rowData: (string | number)[][];
    nameTable?: string;
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const TableApp: React.FC<TableAppProps> = ({
    columnTitles,
    rowData,
    nameTable,
}) => {
    const [openModal, setOpenModal] = useState<{ open: boolean; rowIndex: number | null }>({ open: false, rowIndex: null });

    const handleOpenModal = (rowIndex: number) => setOpenModal({ open: true, rowIndex });
    const handleCloseModal = () => setOpenModal({ open: false, rowIndex: null });

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
                        <TableCell>Acciones</TableCell> {/* Columna para los botones */}
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
                            <TableCell>
                                <Button variant="contained" color="primary" onClick={() => handleOpenModal(rowIndex)}>
                                    Acción 1
                                </Button>
                                <Button variant="contained" color="secondary" sx={{ marginLeft: 1 }} onClick={() => handleOpenModal(rowIndex)}>
                                    Acción 2
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modales */}
            <Modal
                open={openModal.open}
                onClose={handleCloseModal}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-title" variant="h6" component="h2">
                        Modal de Acción
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Aquí puedes añadir contenido para la acción de la fila {openModal.rowIndex !== null ? openModal.rowIndex + 1 : ''}.
                    </Typography>
                </Box>
            </Modal>
        </TableContainer>
    );
};
