// MyForm.js
import React from 'react';
import { TextField, Button, Box } from '@mui/material';

export interface FormProductProps{
    onSubmit: () => void;
}

export const FormProduct: React.FC<FormProductProps> = ({ onSubmit }) => {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit();
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                fullWidth
                margin="normal"
                label="Nombre"
                variant="outlined"
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Email"
                type="email"
                variant="outlined"
                required
            />
            <TextField
                fullWidth
                margin="normal"
                label="Mensaje"
                multiline
                rows={4}
                variant="outlined"
                required
            />
            <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" color="primary">
                    Enviar
                </Button>
            </Box>
        </form>
    );
};
