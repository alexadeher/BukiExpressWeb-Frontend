import React, { useState } from "react";
import {Box, Button, TextField, MenuItem, Typography, InputAdornment, IconButton, Link} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FondoForm from "../assets/welcomeLogin.png";
import Fondo from "../assets/welcomeBackground.png";
import Logo from "../assets/logoHorizontalSombra.png"

const Registro = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box sx={{ backgroundImage: `url(${Fondo})`, display: 'flex', minHeight: '100vh', 
        justifyContent: 'center', alignItems: 'center', flexDirection: 'column-reverse', px: 2 }}>
            <Box sx={{ display: 'flex', width: '100%', maxWidth: '1000px', height: '600px',
            boxShadow: 6, borderRadius: '20px', overflow: 'hidden', backgroundColor: 'white' }}>
                {/* Lado izquierdo: Bienvenida */}
                <Box sx={{ flex: 1, backgroundImage: `url(${FondoForm})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', 
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left',  px: 4, paddingLeft: '65px'}}>
                    <Typography variant="body1" sx={{mt: 2}}>Forma parte de</Typography>
                    <Typography variant="h2" sx={{textAlign: 'left', fontWeight: 'bold'}}>Buki</Typography>
                    <Typography variant="h2" sx={{textAlign: 'left', fontWeight: 'bold'}}>Express</Typography>
                    <Typography variant="body1" sx={{mt: 2 }}>Crea una cuenta para acceder al sistema</Typography>
                </Box>

                {/* Lado derecho: Formulario */}
                <Box sx={{backgroundColor: 'white', flex: 1, display: 'flex', 
                    justifyContent: 'center', alignItems: 'center', px: 4, overflow: 'auto', maxHeight: '100%' }}>
                    <Box sx={{ width: '100%', maxWidth: 400, height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box sx={{ flexShrink: 0, px: 3, pt: 5 }}>
                            <Box display="flex" justifyContent="center" mb={2}>
                                <img src={Logo} alt="Logo" style={{ width: '10rem' }} />
                            </Box>
                            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center', mb: 1, color: '#39405C' }}>
                                Registrar cuenta
                            </Typography>
                            <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0' }}>
                                <div style={{ width: '80px', height: '8px', backgroundColor: '#71C3F3' }}></div>
                                <div style={{ flexGrow: 1, height: '2px', backgroundColor: '#D9D9D9' }}></div>
                            </div>
                        </Box>
                        <Box sx={{flexGrow: 1,overflowY: 'auto',pr: 1}}>
                            <TextField
                                required
                                variant='filled'
                                label="Nombre"
                                placeholder="Nombre(s)"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                required
                                variant='filled'
                                label="Apellidos"
                                placeholder="Apellidos"
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                required
                                variant='filled'
                                label="Correo electrónico"
                                placeholder="ejemplo@gmail.com"
                                fullWidth
                                margin="normal"
                                type="email"
                            />
                            <TextField
                                required
                                variant='filled'
                                label="Contraseña"
                                placeholder="••••••••"
                                fullWidth
                                margin="normal"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleTogglePassword} edge="end">
                                            {showPassword ? <Visibility /> : <VisibilityOff/>}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                }}
                            />
                            <TextField
                                select
                                required
                                fullWidth
                                label="Rol"
                                variant="filled"
                                margin="normal"
                            >                        
                                <MenuItem value="" disabled></MenuItem>
                                {['Administrador'].map((i) => (
                                <MenuItem key={i} value={i.toLowerCase()}>{i}</MenuItem>
                                ))}
                            </TextField>
                        </Box>
                        <Box sx={{ flexShrink: 0, px: 3, pb: 5, mt: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                <Button variant="contained"
                                    sx={{backgroundColor: '#25316D', color: 'white', py: 1.5, textTransform: 'none', 
                                        width: '10rem', borderRadius: '60px', fontSize: '16px', 
                                        '&:hover': {
                                            backgroundColor: '#33428eff',
                                        },
                                    }}
                                >
                                    Registrar
                                </Button>
                            </Box>
                            <Box textAlign="center" mt={2}>
                                <Typography variant="body2" sx={{color: '#39405C'}}>
                                ¿Ya tienes cuenta?{' '}
                                <Link href="/login" underline='hover'>
                                    Inicia sesión
                                </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Registro;
