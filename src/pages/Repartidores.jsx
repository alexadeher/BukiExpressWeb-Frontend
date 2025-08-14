import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Typography, Grid, Card, CardContent, Button, Paper, Avatar } from "@mui/material";
import "../styles/Site.css"
import RepartidorSection from "../assets/RepartidorSection.png";
import RepartidorBenefits from "../assets/RepartidorBenefits.png";
import { EighteenUpRating, PinDrop, Backpack, Moped, ArrowForward } from "@mui/icons-material";
import Prohibido from "../assets/Prohibido.png";
import Operacion from "../assets/Casco.jpg"
import Exceso from "../assets/Exceso.png"
import Ubicacion from "../assets/ubicacion.jpg"
import Entrega from "../assets/Entrega.jpg";
import Efectivo from "../assets/Efectivo.jpg"
import Contrato from "../assets/Contrato.jpg"
import Horario from "../assets/Horario.jpg"

const requirements = [
  { label: "Edad", body: "Tener entre 18 y 25 años. Buscamos jóvenes con energía y muchas ganas de trabajar.", icon: <EighteenUpRating sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Ubicación", body: "Residir en el municipio de Emiliano Zapata. Es indispensable para operar dentro de la zona de servicio.",  icon: <PinDrop sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Mochila de reparto", body: "Tener mochila térmica para asegurar que los pedidos lleguen en buen estado.", icon: <Backpack sx={{ color: 'white', fontSize: 45 }} /> },
  { label: "Motocicleta propia", body: "Contar con motocicleta en buen estado para realizar entregas de forma eficiente.", icon: <Moped sx={{ color: 'white', fontSize: 45 }} /> },
];

const reglasIniciales = [
  {
    titulo: "Transportación",
    descripcion: "Se prohibe transportar drogas, armas de fuego, animales, bebidas alcohólicas o cualquier objeto ilegal.",
    imagen: Prohibido
  },
  {
    titulo: "Mochila de Reparto",
    descripcion: "El repartidor debe portar en todo momento su mochila para realizar los pedidos y evitar daños.",
    imagen: RepartidorSection
  },
  {
    titulo: "Obligaciones de Operación",
    descripcion: "Se debe portar en todo momento su licencia de conducir, el permiso de circulación vigente y utilizar casco.",
    imagen: Operacion
  },
  {
    titulo: "Tiempo de Recolección",
    descripcion: "Si el repartidor excede el tiempo de recolección recibirá un mensaje de advertencia.",
    imagen: Exceso
  },
  {
    titulo: "Ubicación en Tiempo Real",
    descripcion: "Se debe compartir la ubicación en  tiempo real durante el horario de trabajo para garantizar la seguridad.",
    imagen: Ubicacion
  }, 
    {
    titulo: "Entrega de Pedidos",
    descripcion: "La entrega de pedidos debe realizarse en un máximo de 30 minutos después de la recolección.",
    imagen: Entrega
  }
];

const reglasExtra = [
  {
    titulo: "Flujo Efectivo",
    descripcion: "El flujo mínimo de efectivo que debe portar el repartidor es de $800.00 para realizar cambios.",
    imagen: Efectivo
  },
  {
    titulo: "Manipulación de Costos",
    descripcion: "Queda prohibido manipular los costos de los pedidos, de hacerlo el repartidor será dado de baja.",
    imagen: Contrato
  },
  {
    titulo: "Modificación de Horarios",
    descripcion: "Solo se pueden modificar los horarios de trabajo una vez a la semana y notificando al administrador.",
    imagen: Horario
  }
];

const Repartidores = () => {
  const [mostrarTodo, setMostrarTodo] = useState(false);

  const reglas = mostrarTodo ? [...reglasIniciales, ...reglasExtra] : reglasIniciales;
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
                <Card className="requerements-card" sx={{borderRadius: 3,
                boxShadow: 3,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 20px rgba(255,145,73,0.4)",
                },
                "&:hover svg": {
                  transform: "scale(1.2)"
                }}}>
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
            //component={RouterLink}
            //to="/afiliacion-repartidor"
            variant="contained"
            href="https://forms.gle/cGyzZR8XwTxJDE4R6"
            sx={{
            backgroundColor: '#71C3F3',
            color: 'white',
            borderRadius: '20px',
            textTransform: 'none',
            width: '150px',
            fontSize: '16px',
            '&:hover': {
                backgroundColor: '#5BAED1',
            },}}
            endIcon={<ArrowForward />}
            >
            Registrarme
          </Button>
        </Box>
      </Box>
      <Box sx={{ py: { xs: 4, md: 8 }, px: 2, bgcolor: "#white" }}>
      {/* CONTENEDOR GRANDE */}
      <Box
        sx={{
          maxWidth: 1100,
          mx: "auto",
          bgcolor: "#f6f6f6",
          borderRadius: 3,
          p: { xs: 3, md: 6 },
          border: "1px solid rgba(37,49,109,0.08)",
          textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "pointer",
                  transform: "translateY(-8px)",
                  boxShadow: "0 8px 20px rgba(209, 215, 239, 1)",
                }}
      >
        {/* Título */}
        <Typography
          variant="h4"
          sx={{
            fontWeight: 'bold',
            color: "black",
            mb: { xs: 3, md: 5 },
            fontSize: { xs: "1.6rem", md: "2rem" },
          }}
        >
          <span className="highlight">Reglas principales</span> para repartidores
        </Typography>

        {/* CONTENEDOR INTERNO DE 6 ITEMS (sin Grid) */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: { xs: 3, md: 4 },
          }}
        >
          {reglas.map((r, i) => (
            <Box
              key={i}
              sx={{
                // 1 col en xs, 2 en sm, 3 en md+ (sin Grid)
                flexBasis: { xs: "100%", sm: "calc(50% - 16px)", md: "calc(33.333% - 24px)" },
                maxWidth: { xs: "100%", sm: "420px", md: "340px" },
                textAlign: "center",
                px: { xs: 1, md: 2 },
              }}
            >
              <Avatar
                src={r.imagen}
                alt={r.titulo}
                sx={{
                  width: 84,
                  height: 84,
                  mx: "auto",
                  mb: 2,
                  boxShadow: "0 10px 24px rgba(37,49,109,0.25)",
                  border: "4px solid #fff",
                }}
              />
              <Typography sx={{ fontWeight: 700, color: "#25316D", mb: 1 }}>
                {r.titulo}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: "#39405C", opacity: 0.8, lineHeight: 1.5 }}
              >
                {r.descripcion}
              </Typography>
            </Box>
          ))}
        </Box>
        {/* Botón para mostrar más */}
        {!mostrarTodo && (
        <Button
          variant="contained"
          onClick={() => setMostrarTodo(true)}
          sx={{
            mt: { xs: 4, md: 6 },
            px: 6,
            py: 1.6,
            borderRadius: 999,
            fontWeight: 700,
            textTransform: "none",
            boxShadow: "0 7px 24px rgba(255,145,73,0.35)",
            background: "linear-gradient(135deg, #FF9149, #ffb36e)",
            "&:hover": { background: "linear-gradient(135deg, #F88335, #ffad62)" },
          }}
        >
          Ver más
        </Button>
        )}
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
            <Box sx={{backgroundColor: '#71C3F3', padding: '1rem', marginTop: '1.5rem'}}>
              <Typography sx={{ fontSize: '1.2rem', color: 'white', fontWeight: 'bold', textAlign: 'left'}}>Flexibilidad  con los horarios</Typography>
              <Typography sx={{ fontSize: '1rem', textAlign: 'justify', marginRight: '4.2rem' }}>Elige tus propios horarios. Trabaja cuando puedas: entre 
                clases, por las tardes o solo los fines de semana.
              </Typography>
            </Box>
              <Box sx={{backgroundColor: '#71C3F3', padding: '1.5rem', marginTop: '1.5rem'}}>
              <Typography sx={{ fontSize: '1.2rem', color: 'white', fontWeight: 'bold', textAlign: 'left'}}>Gana hasta $2,000 por semana</Typography>
              <Typography sx={{ fontSize: '1rem', textAlign: 'justify', marginRight: '4.2rem' }}>Con solo unas horas al día puedes generar ingresos reales. 
                ¡Ideal como ingreso extra sin descuidar tus actividades!
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      {/*<Box sx={{ textAlign: "center", py: 6, backgroundColor: "white" }}>
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 4 }}>
        Principales reglas para repartidores
      </Typography>
    </Box>*/}
    </Box>
  );
};

export default Repartidores;
