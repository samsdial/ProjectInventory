import React from "react";
import { Modal, Box, CircularProgress, Typography, Button, Divider } from "@mui/material";

interface CustomModalProps {
    open: boolean;
    onClose?: () => void;
    message: string;
    loading: boolean;
    onConfirmAction?: () => void;
    isSuccessMessage?: boolean; // Prop para identificar si es un mensaje de éxito
}

export const CustomModal: React.FC<CustomModalProps> = ({
    open,
    onClose,
    message,
    loading,
    onConfirmAction,
    isSuccessMessage, // Usar esta prop para mostrar el mensaje de éxito
}) => {
    return (
        <Modal
            open={open}
            onClose={onClose}
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box
                sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    width: 300,
                    bgcolor: "background.paper",
                    boxShadow: 24,
                    borderRadius: 1,
                    p: 4,
                    textAlign: "center"
                }}
            >
                <Typography id="modal-title" variant="h6" component="h2">
                    {isSuccessMessage ? "Message" : "Confirmar"}
                </Typography>
                <Divider />
                {
                    loading ? (
                        <>
                            <CircularProgress />
                            <Typography id="modal-description" sx={{ mt: 2 }}>
                                {message}
                            </Typography>
                        </>
                    ) : (
                        <>
                            <Typography id="modal-description" sx={{ mt: 2, mb: 2 }}>
                                {message}
                            </Typography>
                            <Divider />
                            <Box
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                    gap: 2,
                                    mt: 2
                                }}
                            >
                                {isSuccessMessage ? ( // Muestra solo el botón de cerrar en caso de éxito
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={onClose}
                                    >
                                        Close
                                    </Button>
                                ) : (
                                    <>
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={onClose}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="success"
                                            onClick={onConfirmAction}
                                        >
                                            Confirm
                                        </Button>
                                    </>
                                )}
                            </Box>
                        </>
                    )
                }
            </Box>
        </Modal>
    );
};
