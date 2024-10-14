// ModalForm.js
import React from 'react';
import { Modal, Box, Typography } from '@mui/material';

export interface ModalFormProps {
    open: boolean;
    onClose: () => void;
    title: string;
    description: string;
    children: React.ReactNode;
}

export const ModalForms: React.FC<ModalFormProps> = ({ open, onClose, title, description, children }) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                    boxShadow: 24,
                    p: 4,
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    {title}
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    {description}
                </Typography>
                {children}
            </Box>
        </Modal>
    );
};
