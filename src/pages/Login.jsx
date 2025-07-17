import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import {Box, Button, TextField, Typography, InputAdornment, IconButton, Link} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FondoForm from "../assets/welcomeLogin.png";
import Fondo from "../assets/welcomeBackground.png";
import Logo from "../assets/logoHorizontalSombra.png"

const Login = () => {
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const {handleLogin} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleCorreoChange = (e) => {
        setCorreo(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Formulario enviado con:", { correo, password });
    await handleLogin(correo, password);
    const token = localStorage.getItem("jwt");
    if (token) {
        navigate("/home"); // Redirige solo si hay token
    } else {
        toast.error("Error: Usuario o contraseña incorrectos.");
    }
    };

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    return (
        <Box sx={{ backgroundImage: `url(${Fondo})`, display: 'flex', minHeight: '100vh', 
        justifyContent: 'center', alignItems: 'center', flexDirection: 'column-reverse', px: 2 }}>
            <Box sx={{ display: 'flex', width: '100%', maxWidth: '1000px', minHeight: '600px',
            boxShadow: 6, borderRadius: '20px', overflow: 'hidden', backgroundColor: 'white' }}>
                {/* Lado izquierdo: Bienvenida */}
                <Box sx={{ flex: 1, backgroundImage: `url(${FondoForm})`, backgroundSize: 'cover', backgroundPosition: 'center', color: 'white', 
                display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'left',  px: 4, paddingLeft: '65px'}}>
                    <Typography variant="body1" sx={{mt: 2}}>Bienvenido a</Typography>
                    <Typography variant="h2" sx={{textAlign: 'left', fontWeight: 'bold'}}>Buki</Typography>
                    <Typography variant="h2" sx={{textAlign: 'left', fontWeight: 'bold'}}>Express</Typography>
                    <Typography variant="body1" sx={{mt: 2 }}>Inicie sesión para acceder a su cuenta</Typography>
                </Box>

                {/* Lado derecho: Formulario */}
                <Box sx={{backgroundColor: 'white', flex: 1, display: 'flex', 
                    justifyContent: 'center', alignItems: 'center', px: 4 }}>
                    <Box component='form' onSubmit={handleSubmit} sx={{ width: '100%', maxWidth: 400 }}>
                        <Box display="flex" justifyContent="center" mb={2}>
                            <img src={Logo}alt="Logo" style={{width: '16rem'}} />
                        </Box>
                        <Typography variant="h5" sx={{fontWeight:'bold', textAlign:'center', mb:1, color: '#39405C' }}>
                            Inicio de sesión
                        </Typography>
                        <div style={{ display: 'flex', alignItems: 'center', margin: '1rem 0'}}>
                            <div style={{ width: '80px', height: '8px', backgroundColor: '#71C3F3' }}></div>
                            <div style={{ flexGrow: 1, height: '2px', backgroundColor: '#D9D9D9'}}></div>
                        </div>
                        <TextField
                            required
                            variant='filled'
                            label="Correo electrónico"
                            placeholder="ejemplo@gmail.com"
                            fullWidth
                            margin="normal"
                            type="email"
                            value={correo}
                            onChange={handleCorreoChange}
                        />
                        <TextField
                            required
                            variant='filled'
                            label="Contraseña"
                            placeholder="••••••••"
                            fullWidth
                            margin="normal"
                            value={password}
                            onChange={handlePasswordChange}
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
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                            <Button type="submit" variant="contained"
                                sx={{backgroundColor: '#25316D', color: 'white', py: 1.5, textTransform: 'none', 
                                    width: '10rem', borderRadius: '60px', fontSize: '16px', 
                                    '&:hover': {
                                        backgroundColor: '#33428eff',
                                    },
                                }}
                            >
                                Ingresar
                            </Button>
                        </Box>
                        <Box textAlign="center" mt={2}>
                            <Typography variant="body2" sx={{color: '#39405C'}}>
                            ¿Nuevo usuario?{' '}
                            <Link 
                                component="button" 
                                onClick={() => navigate('/registro')} 
                                underline='hover'
                                sx={{ cursor: 'pointer' }}>
                                Crear cuenta
                            </Link>
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ToastContainer/>
        </Box>
    );
};

export default Login;
