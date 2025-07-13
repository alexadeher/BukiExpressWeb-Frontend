import React, { useState } from "react";
import {Box, Button, TextField, Typography, InputAdornment, IconButton, Link} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Logo from "../../assets/welcomeLogin.png";
import Fondo from "../../assets/welcomeBackground.png";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box sx={{ backgroundImage: `url(${Fondo})`, display: 'flex', minHeight: '100vh', overflow: 'hidden', borderRadius: '10px' }}>
            {/* Lado izquierdo: Bienvenida */}
                <Box
                    sx={{
                        flex: 1,
                        backgroundImage: `url(${Logo})`, 
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        color: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        px: 4
                    }}
                >
                    <Typography variant="h4" fontWeight="bold">Bienvenido a</Typography>
                    <Typography variant="h2" fontWeight="bold">Buki</Typography>
                    <Typography variant="h2" fontWeight="bold">Express</Typography>
                    <Typography variant="body1" mt={2} textAlign="center">Inicie sesión para acceder a su cuenta</Typography>
                </Box>

            {/* Lado derecho: Formulario */}
            <Box
                sx={{
                backgroundColor: 'white',
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 4,
                }}>
                <Box sx={{ width: '100%', maxWidth: 400 }}>
                    <Box display="flex" justifyContent="center" mb={2}>
                        {/* No olvidar poner logo */}
                    </Box>
                    <Typography variant="h5" fontWeight="bold" textAlign="center" mb={1}>
                        Inicio de sesión
                    </Typography>
                    <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0'}}>
                        <div style={{ width: '80px', height: '8px', backgroundColor: '#71C3F3' }}></div>
                        <div style={{ flexGrow: 1, height: '2px', backgroundColor: '#D9D9D9'}}></div>
                    </div>
                    <TextField
                        label="Correo electrónico"
                        placeholder="ejemplo@gmail.com"
                        fullWidth
                        margin="normal"
                        type="email"
                    />
                    <TextField
                        label="Contraseña"
                        fullWidth
                        margin="normal"
                        type={showPassword ? 'text' : 'password'}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                        }}
                    />
                    <Button
                        fullWidth
                        variant="contained"
                        sx={{
                            backgroundColor: '#1C2363',
                            color: 'white',
                            mt: 3,
                            py: 1.5,
                            fontWeight: 'bold',
                            borderRadius: 3,
                            '&:hover': {
                                backgroundColor: '#2C348D',
                            },
                        }}
                    >
                    Ingresar
                    </Button>
                    <Box textAlign="center" mt={2}>
                        <Typography variant="body2">
                        ¿Nuevo usuario?{' '}
                        <Link href="/crear" underline="hover">
                            Crear
                        </Link>
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
