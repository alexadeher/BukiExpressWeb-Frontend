import React from "react";
import { Box, Typography } from "@mui/material";
import "../../styles/Site.css"
import RepartidorSection from "../../assets/RepartidorSection.png";

const Repartidores = () => {
  return (
    <Box className="home">
      {/* Sección Hero */}
      <Box className="hero-section-repartidores">
        <Typography className="hero-text">
          ¡Afiliate con Buki Express!
        </Typography>
      </Box>

      {/* Sección de repartidor */}
      <Box className="about-section">
        <Box className="about-content">
          <Box className="about-image">
            <img src={ RepartidorSection } alt="Buki Express" style={{ maxWidth: '400px', width: '100%' }} />
          </Box>
          <Box className="about-text">
            <Typography className="subtitle">Sé un repartidor</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '1.5rem' }}>
              ¿Buscas un <span className="highlight">ingreso extra</span>?<br/>¡Aquí está!
            </Typography>
            <Typography sx={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'justify'}}>
              Forma parte de nuestra red de repartidores y empieza a generar ingresos con total libertad. 
              En Buki Express puedes trabajar a tu ritmo, sin horarios fijos ni complicaciones. 
              Si eres estudiante o quieres un ingreso extra, esta es tu oportunidad.
          </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Repartidores;
