import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Grid, Button, Card, CardMedia, CardContent, Link, Collapse } from "@mui/material";
import "../styles/Site.css"
import { Looks5, Send, ThumbUpAlt, LocalShipping, Fastfood, LocalLaundryService, Description, ShoppingCart, Payment,
  EmojiEvents, Handshake, Security, SentimentSatisfied, Lightbulb, AssignmentTurnedIn, VerifiedUser, Gavel
  } from "@mui/icons-material";
import AcercaDe from "../assets/AboutSection.png";
import RepartidorCard from "../assets/RepartidorCard.png";
import SocioCard from "../assets/SocioCard.png";

const services = [
  { label: "Alimentos", icon: <Fastfood sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Paquetería", icon: <LocalShipping sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Lavandería", icon: <LocalLaundryService sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Documentos", icon: <Description sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Compras", icon: <ShoppingCart sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Pago de servicios", icon: <Payment sx={{ color: 'white', fontSize: 45 }} /> },
];

const valores = [
  { 
    icon: <EmojiEvents sx={{ fontSize: 50, color: "#71C3F3", transition: "transform 0.3s" }} />, 
    titulo: "Compromiso",
    texto: "Damos nuestro máximo esfuerzo para superar las expectativas de nuestros clientes."
  },
  { 
    icon: <Handshake sx={{ fontSize: 50, color: "#71C3F3", transition: "transform 0.3s" }} />, 
    titulo: "Respeto",
    texto: "Valoramos a cada persona y tratamos a todos con dignidad y consideración."
  },
  { 
    icon: <Security sx={{ fontSize: 50, color: "#71C3F3", transition: "transform 0.3s" }} />, 
    titulo: "Confianza",
    texto: "Construimos relaciones sólidas basadas en la transparencia y la honestidad."
  },
  { 
    icon: <SentimentSatisfied sx={{ fontSize: 50, color: "#71C3F3", transition: "transform 0.3s" }} />, 
    titulo: "Amabilidad",
    texto: "Atendemos con una sonrisa y actitud positiva en cada entrega."
  },
  { 
    icon: <Lightbulb sx={{ fontSize: 50, color: "#71C3F3", transition: "transform 0.3s" }} />, 
    titulo: "Innovación",
    texto: "Buscamos constantemente nuevas formas de mejorar nuestro servicio."
  },
  { 
    icon: <AssignmentTurnedIn sx={{ fontSize: 50, color: "#71C3F3", transition: "transform 0.3s" }} />, 
    titulo: "Responsabilidad",
    texto: "Cumplimos con nuestros compromisos y asumimos las consecuencias de nuestros actos."
  },
  { 
    icon: <VerifiedUser sx={{ fontSize: 50, color: "#71C3F3", transition: "transform 0.3s" }} />, 
    titulo: "Honestidad",
    texto: "Actuamos con integridad y coherencia en cada acción."
  },
  { 
    icon: <Gavel sx={{ fontSize: 50, color: "#71C3F3", transition: "transform 0.3s" }} />, 
    titulo: "Integridad",
    texto: "Mantenemos nuestros principios en cada decisión que tomamos."
  },
];

const Home = () => {
  const [valorActivo, setValorActivo] = useState(null);

  const handleToggle = (index) => {
    setValorActivo(valorActivo === index ? null : index);
  };

  return (
    <Box className="home">
      {/* Sección Hero */}
      <Box className="hero-section">
        <Typography className="hero-text">
          ¡Tu necesidad en tu destino!
        </Typography>
      </Box>

      {/* Experiencia/envíos/eficiencia */}
      <Box className="feature-box" sx={{borderRadius: 3,
                transition: "all 0.3s ease",
                cursor: "pointer",
                transform: "translateY(-8px)",
                boxShadow: "0 8px 20px rgba(209, 215, 239, 1)",
                }}>
        <Grid container spacing={{ xs: 2, sm: 4, md: 8, lg: 10}} justifyContent='space-around'>
          <Grid item xs={12} sm={4}>
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
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box className="icon-section" mb={1}>
                <Send fontSize="large" sx={{ color: 'white', fontSize: '30px' }} />
              </Box>
              <Box className="text-section" textAlign="center">
                <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold'}}>Envíos</Typography>
                <Typography sx={{color: '#7E7E7E'}}>Compras y envíos a todo<br/>Emiliano Zapata.</Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Box className="icon-section" mb={1}>
                <ThumbUpAlt fontSize="large" sx={{ color: 'white', fontSize: '30px' }} />
              </Box>
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
              <Card key={index} className="services-card" sx={{borderRadius: 3,
                boxShadow: 3,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 20px rgba(255,145,73,0.4)",
                }}}>
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
            ))}
          </Grid>
        </Box>
      </Box>
      
      {/* Valores */}
      <Box className="about-section" sx={{margin: '2rem auto'}}>
        <Box className="services-header">
            <Typography className="subtitle">Valores de Buki Express</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold'}}>
              Las <span className="highlight">bases</span> que impulsan<span className="highlight"> nuestros servicios</span> 
            </Typography>
          </Box>
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 3 }}>
            {valores.map((valor, index) => (
            <Card
              key={index}
              sx={{
                width: "260px",
                textAlign: "center",
                py: 3,
                px: 2,
                borderRadius: 3,
                boxShadow: 3,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 20px rgba(255,145,73,0.4)",
                },
                "&:hover svg": {
                  transform: "scale(1.2)"
                }
              }}
              onClick={() => handleToggle(index)}
            >
              <CardContent>
                {valor.icon}
                <Typography variant="h6" sx={{ mt: 1, fontWeight: "bold", color: "#25316D" }}>
                  {valor.titulo}
                </Typography>
                <Collapse in={valorActivo === index}>
                  <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
                    {valor.texto}
                  </Typography>
                </Collapse>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Únete a la familia */}
      <Box className="join-section" sx={{backgroundColor: '#f6f6f6'}}>
        <Box className="join-header">
          <Typography className="subtitle">Únete a la familia</Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '1.5rem' }}>
              <span className="highlight">Conecta</span>, <span className="highlight">colabora</span> y <span className="highlight">crece</span>,<br/>
              ¡Tú eres la pieza que falta!
          </Typography>
        </Box>
        <Box className="join-body">
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {/* Card: Repartidor */}
            <Box sx={{ flex: "1 1 300px", display: "flex" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  width: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={RepartidorCard}
                  alt="Repartidor entregando pedido"
                />
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ textAlign: "left" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#39405C",
                        fontWeight: "bold",
                        justifyItems: "center",
                      }}
                    >
                      Haz de tu moto una fuente de<br />ingresos
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#7E7E7E" }}>
                      Únete como repartidor y empieza a generar ganancias con cada
                      entrega.
                    </Typography>
                  </Box>
                  <Button
                    component={RouterLink}
                    to="/page-repartidores"
                    sx={{
                      backgroundColor: "#71C3F3",
                      color: "white",
                      borderRadius: "20px",
                      textTransform: "none",
                      width: "150px",
                      fontSize: "16px",
                      "&:hover": {
                        backgroundColor: "#5BAED1",
                      },
                    }}
                  >
                    Conocer más
                  </Button>
                </CardContent>
              </Card>
            </Box>

            {/* Card: Socio */}
            <Box sx={{ flex: "1 1 300px", display: "flex" }}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                  width: "100%",
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={SocioCard}
                  alt="Negocio preparando pedido"
                />
                <CardContent
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ textAlign: "left" }}>
                    <Typography
                      variant="h6"
                      sx={{
                        color: "#39405C",
                        fontWeight: "bold",
                        textAlign: "left",
                      }}
                    >
                      Potencia tu negocio con entregas<br />rápidas
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#7E7E7E" }}>
                      Ofrece envíos rápidos a tus clientes y mejora tu presencia local, fortalece tu reputación.
                    </Typography>
                  </Box>
                  <Button
                    component={RouterLink}
                    to="/page-socios"
                    sx={{
                      backgroundColor: "#71C3F3",
                      color: "white",
                      borderRadius: "20px",
                      textTransform: "none",
                      width: "150px",
                      fontSize: "16px",
                      "&:hover": {
                        backgroundColor: "#5BAED1",
                      },
                    }}
                  >
                    Conocer más
                  </Button>
                </CardContent>
              </Card>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
