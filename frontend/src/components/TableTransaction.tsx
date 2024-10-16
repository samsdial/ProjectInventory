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
import { ITransaction } from "../interfaces/product";

export interface TableAppProps {
    columnTitles: string[];
    rowData: ITransaction[];
    nameTable: string;
    actions?: boolean;
    onEdit?: (product: ITransaction) => void;
    onDelete?: (product: ITransaction) => void;
    onAdd?: () => void;
    onCheckBox?: (isChecked: boolean) => void;
    onCheckBoxStock?: (isChecked: boolean) => void;
}

export const TableTransaction: React.FC<TableAppProps> = ({
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
                            <TableCell>{row.product_id.name}</TableCell>
                            <TableCell>{row.user_id.name}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.movement_type}</TableCell>
                            <TableCell>{row.quantity_moved}</TableCell>
                            <TableCell>{row.create_at}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

