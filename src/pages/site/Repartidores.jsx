import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, Button } from "@mui/material";
import "../../styles/Site.css"
import RepartidorSection from "../../assets/RepartidorSection.png";
import RepartidorBenefits from "../../assets/RepartidorBenefits.png";
import { EighteenUpRating, PinDrop, Backpack, Moped } from "@mui/icons-material";

const requirements = [
  { label: "Edad", body: "Tener entre 18 y 25 años. Buscamos jóvenes con energía y muchas ganas de trabajar.", icon: <EighteenUpRating sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Ubicación", body: "Residir en el municipio de Emiliano Zapata. Es indispensable para operar dentro de la zona de servicio.",  icon: <PinDrop sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Mochila de reparto", body: "Tener mochila térmica para asegurar que los pedidos lleguen en buen estado.", icon: <Backpack sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Motocicleta propia", body: "Contar con motocicleta en buen estado para realizar entregas de forma eficiente.", icon: <Moped sx={{ color: 'white', fontSize: 45 }} /> },
];
const Repartidores = () => {
  return (
    <Box className="home">
      {/* Sección Hero */}
      <Box className="hero-section-repartidores">
        <Typography className="hero-text">
          ¡Afiliate como repartidor!
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

      {/* Requisitos */}
      <Box className="requirements-section">
        <Box className="requirements-content">
          <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'left'}}>
            ¿<span className="highlight">Qué necesitas </span>para ser repartidor?
          </Typography>
          <Typography sx={{ fontSize: '1.2rem', textAlign: "justify", mb: 3, marginRight: '4.2rem' }}>
            Para unirte a nuestro equipo de repartidores, solo necesitas cumplir con los siguientes requisitos básicos:
          </Typography>
        </Box>
        <Box className="requerements-body">
          <Grid container spacing={4} justifyContent="center" sx={{ display: 'flex', justifyContent: 'center' }}>
            {requirements.map((requirement, index) => (
              <Grid key={index}>
                <Card className="requerements-card">
                  <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Box className="icon2-section" mb={1}>
                        {requirement.icon}
                      </Box>
                      <Typography variant="subtitle1" sx={{color: '#25316D', fontWeight: 'bold', fontSize: '25px'}}>{requirement.label}</Typography>
                      <Typography sx={{ textAlign: 'center', fontSize: '1rem', marginTop: '0.5rem' }}>
                        {requirement.body}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Typography sx={{ fontStyle: 'italic', textAlign: 'center', margin: '3rem 0 2rem' }}>
            Postúlate hoy y empieza a rodar con nosotros
          </Typography>
          <Button
            component={RouterLink}
            to="/afiliacion-repartidor"
            sx={{
            backgroundColor: '#71C3F3',
            color: 'white',
            borderRadius: '20px',
            textTransform: 'none',
            width: '150px',
            fontSize: '16px',
            '&:hover': {
                backgroundColor: '#5BAED1',
            },}}>
            Registrarse
          </Button>
        </Box>
      </Box>
      <Box className="benefits-section">
        <Box className="benefits-content">
          <Box className="benefits-image">
            <img src={ RepartidorBenefits } alt="Repartidor mostrando producto" style={{ maxWidth: '400px', width: '100%' }} />
          </Box>
          <Box className="benefits-body">
            <Typography className="subtitle">Más que un empleo</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '0.2rem' }}>
              ¿<span className="highlight">Qué beneficios</span> obtienes?
            </Typography>
            <Box sx={{backgroundColor: '#EFF8FF', padding: '1rem', marginTop: '1.5rem'}}>
              <Typography sx={{ fontSize: '1.2rem', color: '#25316D', fontWeight: 'bold', textAlign: 'left'}}>Flexibilidad  con los horarios</Typography>
              <Typography sx={{ fontSize: '1rem', textAlign: 'justify', marginRight: '4.2rem' }}>Elige tus propios horarios. Trabaja cuando puedas: entre 
                clases, por las tardes o solo los fines de semana.
              </Typography>
            </Box>
              <Box sx={{backgroundColor: '#EFF8FF', padding: '1.5rem', marginTop: '1.5rem'}}>
              <Typography sx={{ fontSize: '1.2rem', color: '#25316D', fontWeight: 'bold', textAlign: 'left'}}>Gana hasta $2,000 por semana</Typography>
              <Typography sx={{ fontSize: '1rem', textAlign: 'justify', marginRight: '4.2rem' }}>Con solo unas horas al día puedes generar ingresos reales. 
                ¡Ideal como ingreso extra sin descuidar tus actividades!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Repartidores;
