import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { AppBar, Toolbar, Box, Button } from "@mui/material";
import logo from "../assets/logoHorizontal.png"; 
import "../styles/Navbar.css";

const Navbar = () => {
    return (
        <AppBar position="static" sx={{ backgroundColor: '#39405C'}}>
        <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            {/* Logo */}
            <Box className="navbar-logo-container">
                <img src={logo}alt="Logo" className="navbar-logo" />
            </Box>

            {/* Enlaces */}
            <Box className="navbar-links"sx={{display: 'flex', gap: '32px'}}>
                <Button component={RouterLink} to="/home" sx={{color: 'white', textTransform: 'none', fontWeight: 500, fontSize: '16px'}}>Inicio</Button>
                <Button component={RouterLink} to="/socios" sx={{color: 'white', textTransform: 'none', fontWeight: 500, fontSize: '16px'}}>Socios</Button>
                <Button component={RouterLink} to="/repartidores" sx={{color: 'white', textTransform: 'none', fontWeight: 500, fontSize: '16px'}}>Repartidores</Button>
            </Box>

            {/* Botón */}
            <Button
                component={RouterLink}
                to="/login"
                className="navbar-button"
                sx={{
                    backgroundColor: '#71C3F3',
                    color: 'white',
                    borderRadius: '20px',
                    textTransform: 'none',
                    width: '150px',
                    fontSize: '16px',
                    '&:hover': {
                        backgroundColor: '#5BAED1',
                    },
                }}
            >
                Iniciar sesión
            </Button>
        </Toolbar>
        </AppBar>
    );
}

export default Navbar;