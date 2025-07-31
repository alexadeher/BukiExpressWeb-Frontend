import React from "react";
import { Box, Typography, Link } from "@mui/material";
import { Email } from "@mui/icons-material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTiktok, faFacebook, faWhatsapp } from "@fortawesome/free-brands-svg-icons";

import "../styles/SiteFooter.css";

const SiteFooter = () => {
    return (
        <Box component="footer" className="site-footer">
            <Box className="footer-content">
                {/* Menú */}
                <Box className="footer-section">
                <Typography variant="h6">MENÚ</Typography>
                <ul>
                    <li><Link href="/" underline="hover">Inicio</Link></li>
                    <li><Link href="/page-socios" underline="hover">Socios</Link></li>
                    <li><Link href="/page-repartidores" underline="hover">Repartidores</Link></li>
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
                    <Link href="https://www.facebook.com/BukiExpress" style={{ color: '#39405C'}} className="icon"><FontAwesomeIcon icon={faFacebook}/></Link>
                    <Link href="https://www.tiktok.com/@buki.express" style={{ color: '#39405C' }} className="icon" target="_blank">
                        <FontAwesomeIcon icon={faTiktok}/>
                    </Link>
                    <Link href="https://api.whatsapp.com/message/IINJDTEPLSM6N1?autoload=1&app_absent=0" style={{ color: '#39405C'}} className="icon"><FontAwesomeIcon icon={faWhatsapp}/></Link>
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
