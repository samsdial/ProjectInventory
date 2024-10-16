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
    Box,
    FormControlLabel,
    Checkbox,
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
    onCheckBox?: (isChecked: boolean) => void;
    onCheckBoxStock?: (isChecked: boolean) => void;
}

export const TableApp: React.FC<TableAppProps> = ({
    columnTitles,
    rowData,
    nameTable,
    actions,
    onEdit,
    onDelete,
    onAdd,
    onCheckBox,
    onCheckBoxStock,
}) => {
    return (
        <TableContainer component={Paper} sx={{ marginTop: 2 }}>
            <Typography variant="h6" component="div" sx={{ marginTop: 2, marginLeft: 2 }}>
                {nameTable}
            </Typography>
            <Box
                display="flex"
                alignItems="center"
            >
                
                {actions && (
                    <Box pr={5} mb={1}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={onAdd}
                            sx={{ marginTop: 1 }}
                        >
                            Add Product
                        </Button>
                    </Box>
                )}

                
                <Box pr={3}>
                    <Typography variant="body1">Sort by:</Typography>
                </Box>

                
                <Box display="flex" alignItems="center" justifyContent="center">
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => onCheckBox && onCheckBox(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Category"
                    />
                </Box>
                <Box display="flex" alignItems="center" justifyContent="center">
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={(e) => onCheckBoxStock && onCheckBoxStock(e.target.checked)}
                                color="primary"
                            />
                        }
                        label="Low stock"
                    />
                </Box>
            </Box>
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

