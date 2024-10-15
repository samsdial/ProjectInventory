import React from "react";
import { CircularProgress, Box, Typography } from "@mui/material";

export const IsLoading: React.FC<{message: string}> = ({message}) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
        >
            <CircularProgress />
            <Typography variant="h6" component="div" sx={{ mt: 2 }}>
                {message}
            </Typography>
        </Box>
    );
};
