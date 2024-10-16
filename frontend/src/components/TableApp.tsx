import React from "react";
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
} from "@mui/material";
import { IProduct } from "../interfaces/product";

export interface TableAppProps {
    columnTitles: string[];
    rowData: IProduct[];
    nameTable: string;
    actions?: boolean;
    onEdit?: (product: IProduct) => void;
    onDelete?: (product: IProduct) => void;
    onAdd?: () => void;
}

export const TableApp: React.FC<TableAppProps> = ({
    columnTitles,
    rowData,
    nameTable,
    actions,
    onEdit,
    onDelete,
    onAdd,
}) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="div" sx={{ marginTop: 2, marginLeft: 2 }}>
                {nameTable}
            </Typography>
            {actions && (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={onAdd}
                    sx={{ marginTop: 1, marginLeft: 2 }}
                >
                    Add Product
                </Button>
            )}
            <Table sx={{ minWidth: 650, width: '100%' }}>
                <TableHead>
                    <TableRow>
                        {columnTitles.map((title, index) => (
                            <TableCell key={index}>{title}</TableCell>
                        ))}
                        {actions && <TableCell>Acciones</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rowData.map((row, rowIndex) => (
                        <TableRow key={row.id} sx={{ backgroundColor: rowIndex % 2 === 0 ? "#ffff" : "#f9fafb", "&:hover": { backgroundColor: "#f3f4f6" } }}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.stock_current}</TableCell>
                            <TableCell>{row.category_id.name}</TableCell>
                            <TableCell>
                                <img src={row.image} alt={row.name} style={{ maxWidth: "50px", maxHeight: "50px" }} />
                            </TableCell>
                            {actions && (
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => onEdit && onEdit(row)}>
                                        Edit
                                    </Button>
                                    <Button variant="contained" color="secondary" sx={{ marginLeft: 1 }} onClick={() => onDelete && onDelete(row)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

