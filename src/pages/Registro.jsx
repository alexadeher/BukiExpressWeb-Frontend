import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import {Box, Button, TextField, MenuItem, Typography, InputAdornment, IconButton, Link} from '@mui/material';
import { Visibility, VisibilityOff } from "@mui/icons-material";
import FondoForm from "../assets/welcomeLogin.png";
import Fondo from "../assets/welcomeBackground.png";
import Logo from "../assets/logoHorizontalSombra.png"
import { crearUsuario } from "../api/usuarios";

const Registro = () => {
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleNombreChange = (e) => {
        setNombre(e.target.value);
    }

    const handleApellidosChange = (e) => {
        setApellidos(e.target.value);
    }

    const handleCorreoChange = (e) => {
        setCorreo(e.target.value);    
    }
    const handleContrasenaChange = (e) => {
        setContrasena(e.target.value);
    }

    const handleTogglePassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleSubmit = async () => {
        const camposFaltantes = [];

        if (!nombre.trim()) camposFaltantes.push("Nombre");
        if (!apellidos.trim()) camposFaltantes.push("Apellidos");
        if (!correo.trim()) camposFaltantes.push("Correo electrónico");
        if (!contrasena.trim()) camposFaltantes.push("Contraseña");
        if (!rol.trim()) camposFaltantes.push("Rol");

        if (camposFaltantes.length > 0) {
            toast.error(`Faltan campos requeridos: ${camposFaltantes.join(', ')}`);
            return;
        }

        // Si todo está bien, continuar con el registro...
        try {
            const usuarioCreado = await crearUsuario(nombre, apellidos, correo, contrasena, rol);            
            //console.log("Usuario creado:", usuarioCreado);
            toast.success("Cuenta registrada. Espera la aprobación.");

            // Limpiar los campos del formulario
            setNombre("");
            setApellidos("");
            setCorreo("");
            setContrasena("");
            setRol("");

            navigate("/login");
        } catch (error) {
            console.error("Error al crear el usuario:", error);
            toast.error("Error al registrar la cuenta. Inténtalo de nuevo.");
        }
    }

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
                                value={nombre}
                                onChange={handleNombreChange}
                            />
                            <TextField
                                required
                                variant='filled'
                                label="Apellidos"
                                placeholder="Apellidos"
                                fullWidth
                                margin="normal"
                                value={apellidos}
                                onChange={handleApellidosChange}
                            />
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
                                value={contrasena}
                                onChange={handleContrasenaChange}
                            />
                            <TextField
                                select
                                required
                                fullWidth
                                label="Rol"
                                variant="filled"
                                margin="normal"
                                value={rol}
                                onChange={(e) => setRol(e.target.value)}
                                autoFocus
                            >                        
                                <MenuItem value="" disabled>Selecciona un rol</MenuItem>
                                <MenuItem value="ROLE_ADMIN_ACCESS">Administrador</MenuItem>
                                <MenuItem value="ROLE_PERSONAL_ACCESS">Personal</MenuItem>
                            </TextField>
                        </Box>
                        <Box sx={{ flexShrink: 0, px: 3, pb: 5, mt: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center'}}>
                                <Button variant="contained" onClick={handleSubmit}
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
                                <Link onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/login");
                                }} underline='hover'>
                                    Inicia sesión
                                </Link>
                                </Typography>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
            <ToastContainer/>
        </Box>
    );
};

export default Registro;
