import React from "react";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import "../../styles/Site.css"
import { BarChart, MoneyOff, Campaign, Info } from "@mui/icons-material";
import SocioSection from "../../assets/SocioSection.png";

const Socios = () => {
  return (
    <Box className="home">
      {/* Sección Hero */}
      <Box className="hero-section-socios">
        <Typography className="hero-text">
          ¡Tu necesidad en tu destino!
        </Typography>
      </Box>

      {/* Sección de socio */}
      <Box className="about-section">
        <Box className="about-content">
          <Box className="about-image">
            <img src={ SocioSection } alt="Buki Express" style={{ maxWidth: '400px', width: '100%' }} />
          </Box>
          <Box className="about-text">
            <Typography className="subtitle">Sé un socio</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '1.5rem' }}>
              Más pedidos, más clientes, <span className="highlight"><br/>más crecimiento</span>
            </Typography>
            <Typography sx={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'justify'}}>
              Forma parte de nuestra red de socios. Te conectamos con 
              cientos de personas listas para ordenar. Al afiliarte a 
              Buki Express, tu negocio podrá recibir pedidos 
              a través de nuestra plataforma y llegar a más clientes 
              sin preocuparte.
          </Typography>
          </Box>
        </Box>
      </Box>

      {/* Afiliación */}
      <Box className="services-section">
<Grid container spacing={4} justifyContent="center">
        {/* Columna izquierda */}
        <Grid item xs={12} md={5}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 2 }}>
            ¿Por qué <span style={{ color: '#f97316' }}>elegirnos</span>?
          </Typography>
          <Typography sx={{ mb: 4 }}>
            En Buki Express llevamos oportunidades. Afiliar tu negocio con nosotros es la forma más fácil de vender más, sin complicarte la vida. Tú lo preparas, nosotros nos encargamos del resto.
          </Typography>

          {/* Beneficio 1 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <BarChart sx={{ fontSize: 40, color: '#38bdf8', mr: 2 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Genera ventas adicionales</Typography>
              <Typography variant="body2">Tus platillos llegan a más personas y tus ingresos suben sin gastar de más.</Typography>
            </Box>
          </Box>

          {/* Beneficio 2 */}
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
            <MoneyOff sx={{ fontSize: 40, color: '#38bdf8', mr: 2 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Evita gastos de repartidores</Typography>
              <Typography variant="body2">Nosotros entregamos por ti. Ahorra en personal y enfócate en lo que mejor haces.</Typography>
            </Box>
          </Box>

          {/* Beneficio 3 */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Campaign sx={{ fontSize: 40, color: '#38bdf8', mr: 2 }} />
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Promoción de tu negocio</Typography>
              <Typography variant="body2">Te damos visibilidad con publicaciones y campañas en nuestras redes.</Typography>
            </Box>
          </Box>
        </Grid>

        {/* Columna derecha - Formulario */}
        <Grid item xs={12} md={6}>
          <Box sx={{ backgroundColor: '#fff', p: 4, borderRadius: 2, boxShadow: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1e40af', mb: 1 }}>
              ¡Afíliate hoy y haz crecer tu negocio!
            </Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              Completa el formulario y únete a nuestra red de socios.
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Nombre del establecimiento" variant="filled" size="small" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Teléfono" variant="filled" size="small" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Nombre del responsable" variant="filled" size="small" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Apellido del responsable" variant="filled" size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Producto" variant="filled" size="small" />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Ubicación" variant="filled" size="small" />
              </Grid>
              <Grid item xs={12}>
                <Button variant="contained" fullWidth sx={{ backgroundColor: '#f97316', mt: 1 }}>
                  Enviar
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ backgroundColor: '#fde9dd', p: 2, borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                  <Info sx={{ fontSize: 20, mr: 1 }} />
                  <Typography variant="caption">
                    El proceso de afiliación está disponible para negocios ubicados en el municipio de Emiliano Zapata.
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      </Box>
    </Box>
  );
};

export default Socios;
