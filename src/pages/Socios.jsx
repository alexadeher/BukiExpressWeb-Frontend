import React, {useState} from "react";
import { Box, Typography, Grid, Button, TextField, Card, CardContent } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "../styles/Site.css"
import { BarChart, MoneyOff, Campaign, Info, DeliveryDining, ArrowForward, Grade} from "@mui/icons-material";
import { keyframes } from "@mui/system";
import SocioSection from "../assets/SocioSection.png";
import { saveSocio } from "../api/socios";

const Socios = () => {
  const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

  const [nombreEstablecimiento, setNombreEstablecimiento] = useState("");
  const [telefono, setTelefono] = useState("");
  const [telefonoSecundario, setTelefonoSecundario] = useState("");
  const [nombreRepresentante, setNombreRepresentante] = useState("");
  const [apellidosRepresentante, setApellidosRepresentante] = useState("");
  const [producto, setProducto] = useState("");
  const [ubicacion, setUbicacion] = useState("");

  const handleNombreEstablecimientoChange = (e) => {
    setNombreEstablecimiento(e.target.value);
  }

  const handleTelefonoChange = (e) => {
    setTelefono(e.target.value);
  }

  const handleTelefonoSecundarioChange = (e) => {
    setTelefonoSecundario(e.target.value);  
  }

  const handleNombreRepresentanteChange = (e) => {
    setNombreRepresentante(e.target.value);
  }

  const handleApellidosRepresentanteChange = (e) => {
    setApellidosRepresentante (e.target.value);
  }

  const handleProductoChange = (e) => {
    setProducto(e.target.value);
  }

  const handleUbicacionChange = (e) => {
    setUbicacion(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nuevoSocio = {
      nombreEstablecimiento,
      telefono,
      telefonoSecundario,
      nombreRepresentante,
      apellidosRepresentante,
      producto, 
      ubicacion
    };

    try { 
        // Validar campos antes de enviar
        if (
          !nombreEstablecimiento.trim() ||
          !telefono.trim() ||
          !nombreRepresentante.trim() ||
          !apellidosRepresentante.trim() ||
          !producto.trim() ||
          !ubicacion.trim()
        ) {
          toast.error("Por favor completa todos los campos obligatorios");
          return;
        }

        const response = await saveSocio(nuevoSocio);
        if (response.status === 200) {
            toast.success("Datos enviados exitosamente");
            // Limpiar campos
            setNombreEstablecimiento("");
            setTelefono("");
            setTelefonoSecundario("");
            setNombreRepresentante("");
            setApellidosRepresentante("");
            setProducto("");
            setUbicacion("");
        } else {
            toast.error("Error al enviar los datos");
        }
    } catch (error) {
        console.error(error);
        toast.error("Error de conexión");
    }
  };

  return (
    <Box className="home">
      {/* Sección Hero */}
      <Box className="hero-section-socios">
        <Typography className="hero-text">
          ¡Afiliate como socio!
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

      {/* Beneficios */}
      <Box className="form-section">
        <Box className="form-content">
          <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
              <Box sx={{ display: "flex", flexDirection: "column", flexWrap: "wrap", justifyContent: "center", textAlign: "center" }}>
                <Typography className="subtitle" >
                  Beneficios para los socios
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 'bold', paddingBottom: '1rem' }}>
                  ¿Por qué <span className="highlight">elegirnos</span>?
                </Typography>
              </Box>
              <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1.5fr 1fr 1fr" },
                gridTemplateRows: { xs: "auto", md: "repeat(2, 200px)" },
                gap: 2,
                p: 5
              }}
            >
              {/* Card grande */}
              <Card
                sx={{
                  gridRow: { md: "1 / span 2" },
                  bgcolor: "linear-gradient(to bottom right, #b37100ff, #d07900ff)",
                  borderRadius: 3,
                  color: "white",
                  p: 2,
                  background: "linear-gradient(135deg, #71C3F3, #25316D)",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  "&:hover": {
                    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h5" fontWeight="bold" sx={{ mt: 2, fontSize: '1.9rem', textAlign: 'center' }}>
                    En Buki Express llevamos oportunidades. Afiliar tu negocio con nosotros 
                    es la forma más fácil de vender más, 
                    sin complicaciones ni dolores de cabeza. Tú lo preparas, nosotros nos encargamos del resto.
                  </Typography>
                </CardContent>
              </Card>

              {/* Card chica */}
              <Card
                sx={{
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                  backgroundColor: '#AFDDFF',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  "&:hover": {
                    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold'}}>
                    Genera ventas adicionales
                  </Typography>
                  <Box variant="outlined" size="small" sx={{ mt: 1 }}>
                    Tus platillos llegan a más personas y tus ingresos suben sin gastar de más.
                  </Box>
                </CardContent>
                <BarChart sx={{ alignSelf: "flex-end", fontSize: 40, color: 'white'}}/>
              </Card>

              {/* Card chica */}
              <Card
                sx={{
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  "&:hover": {
                    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold'}}>
                    Evita gastos de repartidores
                  </Typography>
                  <Box variant="outlined" size="small" sx={{ mt: 1 }}>
                    Nosotros entregamos por ti. Ahorra en personal y enfócate en lo que mejor haces.
                  </Box>
                </CardContent>
                <MoneyOff sx={{ alignSelf: "flex-end", fontSize: 40, color: '#AFDDFF'}}/>
              </Card>

              {/* Card chica */}
              <Card
                sx={{
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  "&:hover": {
                    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold'}}>
                    Promoción de tu negocio
                  </Typography>
                  <Box variant="outlined" size="small" sx={{ mt: 1 }}>
                    Te damos visibilidad con publicaciones y campañas en nuestras redes.
                  </Box>
                </CardContent>
                <Campaign sx={{ alignSelf: "flex-end", fontSize: 40, color: '#AFDDFF'}}/>
              </Card>

              {/* Card chica */}
              <Card
                sx={{
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  p: 2,
                  backgroundColor: '#AFDDFF',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  "&:hover": {
                    boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.15)',
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" sx={{color: '#39405C', fontWeight: 'bold'}}>
                    Ofrece servicio a domicilio
                  </Typography>
                  <Box variant="outlined" size="small" sx={{ mt: 1 }}>
                    Tu negocio da el primer paso, nosotros cerramos la experiencia con entregas profesionales.
                  </Box>
                </CardContent>
                <DeliveryDining sx={{ alignSelf: "flex-end", fontSize: 40, color: 'white'}}/>
              </Card>
            </Box>
            </Box>
                {/* <Box component='form' onSubmit={handleSubmit} sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2, width: '38rem' }}>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#25316D', textAlign: 'left',  mb: 1 }}>
                    ¡Afíliate hoy y haz crecer tu negocio!
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: '1rem', textAlign: 'left', mb: 3 }}>
                    Completa el formulario y únete a nuestra red de socios.
                  </Typography>
                  <div className="divider">
                    <div className="left-line"></div>
                    <div className="right-line"></div>
                  </div>
                  <div className="form-input">
                    <TextField 
                      fullWidth 
                      required 
                      label="Nombre del establecimiento" 
                      variant="filled" 
                      size="small" 
                      value={nombreEstablecimiento}
                      onChange={(e) => setNombreEstablecimiento(e.target.value)}
                    />
                  </div>
                  <div className="form-input">
                    <TextField 
                    fullWidth 
                    required
                    type="tel"
                    label="Teléfono" 
                    variant="filled" 
                    size="small" 
                    value={telefono}
                    onChange={(e) => {
                      const valor = e.target.value;
                      if (/^\d{0,10}$/.test(valor)) {
                        setTelefono(valor);
                      }
                    }}
                    inputProps={{
                      maxLength: 10,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    />
                  </div>
                  <div className="form-input">
                    <TextField 
                    fullWidth 
                    required 
                    type="tel"
                    label="Teléfono Secundario" 
                    variant="filled" 
                    size="small" 
                    value={telefonoSecundario}
                    onChange={(e) => {
                      const valor = e.target.value;
                      if (/^\d{0,10}$/.test(valor)) {
                        setTelefonoSecundario(valor);
                      }
                    }}
                    inputProps={{
                      maxLength: 10,
                      inputMode: 'numeric',
                      pattern: '[0-9]*'
                    }}
                    />
                  </div>
                  <div className="form-input">
                    <TextField 
                    fullWidth 
                    required 
                    label="Nombre del responsable" 
                    variant="filled" 
                    size="small" 
                    value={nombreRepresentante}
                    onChange={(e) => setNombreRepresentante(e.target.value)}
                    />
                  </div>
                  <div className="form-input">
                    <TextField fullWidth required label="Apellidos del responsable" variant="filled" size="small"
                    value={apellidosRepresentante}
                    onChange={(e) => setApellidosRepresentante(e.target.value)}
                    />
                  </div>
                  <div className="form-input">
                    <TextField fullWidth required label="Producto o servicio" variant="filled" size="small" 
                    value={producto}
                    onChange={(e) => setProducto(e.target.value)}
                    />
                  </div>
                  <div className="form-input">
                    <TextField fullWidth required label="Ubicación" variant="filled" size="small" 
                    value={ubicacion}
                    onChange={(e) => setUbicacion(e.target.value)}
                    />
                  </div>
                  <Typography variant="body2" sx={{ fontSize: '0.9rem', textAlign: 'left', mb: 2 }}>
                    * Los campos marcados con asterisco son obligatorios. 
                  </Typography>

                  <Grid sx={{alignContent: 'center', display: 'flex', justifyContent: 'center', marginBottom: "16px"}}>
                    <Button 
                      variant="contained" 
                      onClick={handleSubmit} 
                      sx={{
                          backgroundColor: '#FF9149',
                          color: 'white',
                          borderRadius: '20px',
                          textTransform: 'none',
                          width: '150px',
                          fontSize: '16px',
                          '&:hover': {
                              backgroundColor: '#fb7f2cff',
                          },}}>
                      Enviar
                    </Button>
                  </Grid>
                  <Grid sx={{ marginTop: '16px', justifyContent: 'center' }}>
                    <Box sx={{ backgroundColor: '#FFE9DB', p: 2, borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                      <Info sx={{ fontSize: 20, mr: 1, color: '#7E7E7E'}} />
                      <Typography variant="caption" sx={{ color: '#7E7E7E', marginLeft:'1rem', textAlign: 'justify', fontSize: '14px'}}>
                        El proceso de afiliación está disponible solo para negocios ubicados en el municipio de Emiliano Zapata.
                      </Typography>
                    </Box>
                  </Grid>
                </Box>*/}
        </Box>
      </Box>
        <Box sx={{ p: 5, width: "100%" }}>
              <Box
                sx={{
                  background: "#FF9149",
                  borderRadius: "20px",
                  p: { xs: 4, md: 6 },
                  textAlign: "center",
                  maxWidth: "900px",
                  mx: "auto",
                  color: "white",
                  boxShadow: "0px 4px 20px rgba(0,0,0,0.2)",
                }}
              >
                {/* Ícono arriba */}
                <Box
                  sx={{
                    display: "inline-flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 50,
                    height: 50,
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: "12px",
                    mb: 2,
                    animation: `${pulse} 1.5s infinite ease-in-out`,
                  }}
                >
                  <Grade sx={{ color: "#71C3F3", fontSize: 28 }} />
                </Box>

                {/* Título */}
                <Typography
                  sx={{
                    fontWeight: "bold",
                    mb: 1,
                    fontSize: { xs: "1.4rem", md: "1.8rem" },
                    color: 'black',
                  }}
                >
                  ¿Quieres formar parte de <span style={{ color: "white" }}>nosotros</span>?
                </Typography>

                {/* Descripción */}
                <Typography
                  variant="body1"
                  sx={{
                    opacity: 0.9,
                    mb: 3,
                    fontSize: { xs: "0.9rem", md: "1rem" },
                    maxWidth: "700px",
                    mx: "auto",
                    color: 'white',
                    textAlign: 'left'
                  }}
                >
                  Regístrate ahora y completa nuestro formulario. Es rápido, sencillo y gratuito.
                  Considera los siguientes requisitos:
                </Typography>

                {/* Lista de requisitos */}
                <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, mb: 0.5, textAlign: 'center' }}>• El establecimiento debe estar en Emiliano Zapata.</Typography>
                <Typography sx={{ fontSize: { xs: "0.9rem", md: "1rem" }, mb: 3,  textAlign: 'center'  }}>• Estar ubicado en zona comercial o de alta afluencia.</Typography>

                {/* Botón */}
                <Button
                  variant="contained"
                  href="https://forms.gle/JZ5mrFEcwMthrdZG7"
                  sx={{
                    backgroundColor: "#71C3F3",
                    color: "white",
                    borderRadius: "20px",
                    px: 3,
                    py: 1,
                    textTransform: "none",
                    fontSize: "16px",
                    "&:hover": {
                      backgroundColor: "#5BAED1",
                    },
                  }}
                  endIcon={<ArrowForward />}
                >
                  Registrarme
                </Button>
              </Box>
            </Box>
      <ToastContainer/>
    </Box>
  );
};

export default Socios;
