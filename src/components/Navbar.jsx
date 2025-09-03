import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    Box,
    Button,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    ListItemIcon
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../assets/logoHorizontal.png";
import { useResponsive } from "../hooks/useResponsive";
import "../styles/Navbar.css";
import { DeliveryDining, Home, People, Login } from "@mui/icons-material";

const navLinks = [
    { title: "Inicio", path: "/" },
    { title: "Socios", path: "/page-socios" },
    { title: "Repartidores", path: "/page-repartidores" },
];

const drawerLinks = [
    { title: "Inicio", path: "/", icon: <Home /> },
    { title: "Socios", path: "/page-socios", icon: <People /> },
    { title: "Repartidores", path: "/page-repartidores", icon: <DeliveryDining /> },
];

const Navbar = () => {
    const {isMobile} = useResponsive();
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
        <AppBar position="static" sx={{ backgroundColor: "#39405C" }}>
            <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
                {/* Logo */}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img src={logo} alt="Logo" style={{ height: 40 }} />
                </Box>

                {/* Navlinks (centro) */}
                {!isMobile && (
                    <Box sx={{ display: "flex", gap: "32px", flex: 1, justifyContent: "center" }}>
                        {navLinks.map((link) => (
                            <Button
                            key={link.title}
                            component={RouterLink}
                            to={link.path}
                            sx={{
                                color: "white",
                                textTransform: "none",
                                fontWeight: 500,
                                fontSize: "16px",
                            }}
                            >
                            {link.title}
                            </Button>
                        ))}
                    </Box>
                )}
                {/* Menú hamburguesa */}
                {isMobile ? (
                    <IconButton
                    color="inherit"
                    onClick={() => setDrawerOpen(true)}
                    edge="end"
                    >
                    <MenuIcon />
                    </IconButton>
                ) : (
                    <Button
                    //component={RouterLink}
                    //to="/page-repartidores"
                    href="https://forms.gle/cGyzZR8XwTxJDE4R6"
                    sx={{
                        backgroundColor: "#71C3F3",
                        color: "white",
                        borderRadius: "20px",
                        textTransform: "none",
                        width: "190px",
                        height: "40px",
                        fontSize: "13px",
                        textAlign: "center",
                        "&:hover": {
                        backgroundColor: "#5BAED1",
                        },
                    }}
                    >
                    {/*Iniciar sesión*/}
                    Registrarse como repartidor
                    </Button>
                )}
            </Toolbar>
        </AppBar>

        {/* Drawer para móviles */}
        <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
            sx: {
            width: 250, // ancho
            height: 165, // altura
            top: 'auto', // evita que quede pegado arriba
            borderRadius: "12px 0 0 12px" 
            }
        }}
        >
            <Box sx={{ width: 250 }} role="presentation">
                <List>
                {drawerLinks.map((link) => (
                    <ListItem key={link.title} disablePadding>
                    <ListItemButton
                        component={RouterLink}
                        to={link.path}
                        onClick={() => setDrawerOpen(false)}
                    >
                        <ListItemIcon sx={{ color: "#FF9149" }}>{link.icon}</ListItemIcon>
                        <ListItemText
                        primary={link.title}
                        primaryTypographyProps={{ fontWeight: 500 }}
                        />
                    </ListItemButton>
                    </ListItem>
                ))}
                {/*<ListItem disablePadding>
                    <ListItemButton
                    component={RouterLink}
                    to="/login"
                    onClick={() => setDrawerOpen(false)}
                    >
                    <ListItemIcon sx={{ color: "#FF9149" }}>
                        <Login />
                    </ListItemIcon>
                    <ListItemText
                        primary="Iniciar sesión"
                        primaryTypographyProps={{ fontWeight: 500 }}
                    />
                    </ListItemButton>
                </ListItem>*/}
                </List>
            </Box>
        </Drawer>
    </>
    );
};

export default Navbar;
