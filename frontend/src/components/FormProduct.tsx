import React, { useEffect, useState } from 'react';
import { TextField, Button, Box, MenuItem } from '@mui/material';
import { IProduct } from '../interfaces/product';

export interface FormProductProps {
    onSubmit: (product: IProduct) => void;
    productToEdit?: IProduct | null;
}

const categories = [
    'Electronics', 'Clothing', 'Food', 'Books',
];

export const FormProduct: React.FC<FormProductProps> = ({ onSubmit, productToEdit }) => {
    const [productData, setProductData] = useState<IProduct>({
        id: '',
        name: '',
        description: '',
        stock: 0,
        category: '',
        imageUrl: '',
    });

    useEffect(() => {
        if (productToEdit) {
            setProductData(productToEdit);
        }
    }, [productToEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setProductData({
            ...productData,
            [name]: name === 'stock' ? Number(value) : value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit(productData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="Nombre del Producto"
                variant="outlined"
                name="name"
                value={productData.name}
                onChange={handleChange}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Descripción"
                variant="outlined"
                name="description"
                value={productData.description}
                onChange={handleChange}
                multiline
                rows={2}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Stock"
                variant="outlined"
                name="stock"
                type="number"
                value={productData.stock}
                onChange={handleChange}
                required
            />
            <TextField
                fullWidth
                margin="normal"
                select
                label="Categoría"
                variant="outlined"
                name="category"
                value={productData.category}
                onChange={handleChange}
                required
            >
                {categories.map((category, index) => (
                    <MenuItem key={index} value={category}>
                        {category}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                fullWidth
                margin="normal"
                label="URL de la Imagen"
                variant="outlined"
                name="imageUrl"
                value={productData.imageUrl}
                onChange={handleChange}
            />
            <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    {productToEdit ? "Guardar Cambios" : "Crear"}
                </Button>
            </Box>
        </form>
    );
};
