import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { ErrorOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
        <Box
        sx={{
            height: '100vh',
            bgcolor: '#f5f5f5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            px: 2,
        }}
        >
        <ErrorOutline color="error" sx={{ fontSize: 80, mb: 2 }} />
        <Typography variant="h3" component="h1" gutterBottom>
            404 - Página no encontrada
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
            Lo sentimos, la página que buscas no existe.
        </Typography>
        <Button variant="contained" onClick={() => navigate('/')}>
            Volver al inicio
        </Button>
        </Box>
    );
};

export default NotFoundPage;
