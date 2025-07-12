import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Grid, Button, Card, CardMedia, CardContent, Link } from "@mui/material";
import "../../styles/Site.css"
import { Looks5, Send, ThumbUpAlt, LocalShipping, Fastfood, LocalLaundryService, Description, ShoppingCart, Payment } from "@mui/icons-material";
import AcercaDe from "../../assets/AboutSection.png";
import RepartidorCard from "../../assets/RepartidorCard.png";
import SocioCard from "../../assets/SocioCard.png";

const services = [
  { label: "Alimentos", icon: <Fastfood sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Paquetería", icon: <LocalShipping sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Lavandería", icon: <LocalLaundryService sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Documentos", icon: <Description sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Compras", icon: <ShoppingCart sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Pago de servicios", icon: <Payment sx={{ color: 'white', fontSize: 45 }} /> },
];

const Home = () => {
  return (
    <Box className="home">
      {/* Sección Hero */}
      <Box className="hero-section">
        <Typography className="hero-text">
          ¡Tu necesidad en tu destino!
        </Typography>
      </Box>

      {/* Experiencia/envíos */}
      <Box className="feature-box">
        <Grid container spacing={24} justifyContent="center">
          <Grid>
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* Ícono */}
              <Box className="icon-section" mb={1}>
                <Looks5 fontSize="large" sx={{ color: 'white', fontSize: '30px' }} />
              </Box>
              {/* Información */}
              <Box className="text-section" textAlign="center">
                <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold'}}>Experiencia</Typography>
                <Typography sx={{color: '#7E7E7E'}}>Más de 5 años de experiencia<br/>en el sector delivery.</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid>
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* Ícono */}
              <Box className="icon-section" mb={1}>
                <Send fontSize="large" sx={{ color: 'white', fontSize: '30px' }} />
              </Box>
              {/* Información */}
              <Box className="text-section" textAlign="center">
                <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold'}}>Envíos</Typography>
                <Typography sx={{color: '#7E7E7E'}}>Compras y envíos a todo<br/>Emiliano Zapata.</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid>
            <Box display="flex" flexDirection="column" alignItems="center">
              {/* Ícono */}
              <Box className="icon-section" mb={1}>
                <ThumbUpAlt fontSize="large" sx={{ color: 'white', fontSize: '30px' }} />
              </Box>
              {/* Información */}
              <Box className="text-section" textAlign="center">
                <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold'}}>Eficiencia</Typography>
                <Typography sx={{color: '#7E7E7E'}}>Entregas puntuales y<br/>atención de calidad.</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      {/* Acerca de */}
      <Box className="about-section">
        <Box className="about-content">
          <Box className="about-image">
            <img src={ AcercaDe } alt="Buki Express" style={{ maxWidth: '400px', width: '100%' }} />
          </Box>
          <Box className="about-text">
            <Typography className="subtitle">Acerca de Buki Express</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '1.5rem' }}>
              Bienvenido al <span className="highlight">mejor servicio</span><br/>de entrega a domicilio
            </Typography>
            <Typography sx={{ fontSize: '1.2rem', lineHeight: '1.6', textAlign: 'justify'}}>
              Buki Express, es una empresa pequeña 100% morelense 
              de entregas y repartos a domicilio con alrededor de 5 
              años de experiencia creada para conectar a negocios 
              locales con sus clientes de manera rápida, segura y 
              eficiente.
          </Typography>
          </Box>
        </Box>
      </Box>

      {/* Servicios */}
      <Box className="services-section">
        <Box className="services-header">
          <Typography className="subtitle">Nuestros servicios</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              Somos tu <span className="highlight">mejor aliado </span><br/>
          </Typography>
        </Box>
        <Box className="services-body">
          <Grid container spacing={4} justifyContent="center" sx={{ display: 'flex', justifyContent: 'center' }}>
            {services.map((service, index) => (
              <Grid key={index}>
                <Card className="services-card">
                  <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                      <Box className="icon2-section" mb={1}>
                        {service.icon}
                      </Box>
                      <Typography variant="subtitle1" sx={{color: '#25316D', fontWeight: 'bold', fontSize: '25px'}}>{service.label}</Typography>
                      <Link href="https://api.whatsapp.com/message/IINJDTEPLSM6N1?autoload=1&app_absent=0" 
                        sx={{
                          color: '#FF9149',
                          padding: '10px 30px',
                          textDecoration: 'underline',
                          textDecorationColor: '#FF9149',
                          textUnderlineOffset: '4px',
                          transition: '0.3s',
                          '&:hover': {
                            color: '#F76E11',
                            textDecorationColor: '#F76E11'},
                        }}>Solicitar
                      </Link>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>

      {/* Únete a la familia */}
      <Box className="join-section">
        <Box className="join-header">
          <Typography className="subtitle">Únete a la familia</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '1.5rem' }}>
              <span className="highlight">Conecta</span>, <span className="highlight">colabora</span> y <span className="highlight">crece</span>,<br/>
              ¡Tú eres la pieza que falta!
          </Typography>
        </Box>
        <Box className="join-body">
          <Grid container spacing={2}>
            {/* Card: Repartidor */}
            <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
              <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={RepartidorCard}
                  alt="Repartidor entregando pedido"
                />
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold', justifyItems: 'center'}}>
                      Haz de tu moto una fuente de<br/>ingresos
                    </Typography>
                    <Typography variant="body2" sx={{color: '#7E7E7E'}}>
                      Únete como repartidor y empieza a generar ganancias con cada entrega.
                    </Typography>
                  </Box>
                  <Button
                    component={RouterLink}
                    to="/repartidores"
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
                    Conocer más
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            {/* Card: Socio */}
            <Grid>
              <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <CardMedia
                  component="img"
                  height="200"
                  image={SocioCard}
                  alt="Negocio preparando pedido"
                />
                <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box sx={{ textAlign: 'left' }}>
                    <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold', textAlign: 'left'}}>
                      Potencia tu negocio con entregas<br/>rápidas
                    </Typography>
                    <Typography variant="body2" sx={{color: '#7E7E7E'}}>
                      Ofrece envíos rápidos a tus clientes y mejora tu presencia local.
                    </Typography>
                  </Box>
                  <Button
                    component={RouterLink}
                    to="/socios"
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
                    Conocer más
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
