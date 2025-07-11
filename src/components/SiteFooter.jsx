import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Facebook, Instagram, WhatsApp, Email } from "@mui/icons-material";
import "../styles/SiteFooter.css";

const SiteFooter = () => {
    return (
        <Box component="footer" className="site-footer">
            <Box className="footer-content">
                {/* Menú */}
                <Box className="footer-section">
                <Typography variant="h6">MENÚ</Typography>
                <ul>
                    <li><Link href="/home" underline="hover">Inicio</Link></li>
                    <li><Link href="/socios" underline="hover">Socios</Link></li>
                    <li><Link href="/repartidores" underline="hover">Repartidores</Link></li>
                </ul>
                </Box>

                {/* Ubicación */}
                <Box className="footer-section">
                    <Typography variant="h6">UBICACIÓN</Typography>
                    <Link
                        href="https://www.google.com/maps?q=5+de+Febrero+41,+Colonia+Benito+Juárez,+Emiliano+Zapata,+Morelos,+México"
                        target="_blank"
                        rel="noopener noreferrer"
                        underline="hover"
                        color="inherit"
                    >
                        <Typography variant="body2">
                        Calle 5 de Febrero 41, Colonia Benito Juárez <br />
                        C.P 62765, Emiliano Zapata, Morelos, México
                        </Typography>
                    </Link>
                </Box>

                {/* Contacto */}
                <Box className="footer-section">
                <Typography variant="h6">CONTACTO</Typography>
                <Box className="social-icons">
                    <Link href="https://www.facebook.com/BukiExpress" style={{ color: '#39405C'}} className="icon"><Facebook /></Link>
                    <Link href="https://www.instagram.com/bukiexpress" style={{ color: '#39405C'}} className="icon"><Instagram /></Link>
                    <Link href="https://api.whatsapp.com/message/IINJDTEPLSM6N1?autoload=1&app_absent=0" style={{ color: '#39405C'}} className="icon"><WhatsApp /></Link>
                    <Link href="mailto:bukiexpress2020@gmail.com" style={{ color: '#39405C'}} className="icon"><Email /></Link>
                </Box>
                </Box>
            </Box>

            {/* Pie de página */}
            <Box className="footer-bottom">
                <Typography variant="body2">© Buki Express 2025</Typography>
            </Box>
        </Box>
    );
};

export default SiteFooter;
