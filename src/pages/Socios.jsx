import React, {useState} from "react";
import { Box, Typography, Grid, Button, TextField } from "@mui/material";
import "../styles/Site.css"
import { BarChart, MoneyOff, Campaign, Info } from "@mui/icons-material";
import SocioSection from "../assets/SocioSection.png";
import { saveSocio } from "../api/socios";

const Socios = () => {

  const [nombreEstablecimiento, setNombreEstablecimiento] = useState("");
  const [telefono, setTelefono] = useState("");
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
      nombreRepresentante,
      apellidosRepresentante,
      producto, 
      ubicacion
    };

    try {
      const response = await saveSocio(nuevoSocio);
    if (response.status === 200) {
        alert("Datos guardados exitosamente");
        setNombreEstablecimiento("");
        setTelefono("");
        setNombreRepresentante("");
        setApellidosRepresentante("");
        setProducto("");
        setUbicacion("");
      } else {
        alert("Error al guardar datos");
      }
    } catch (error) {
      console.error(error);
      alert("Error de conexión con el servidor");
    }
  }


  

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

      {/* Afiliación */}
      <Box className="form-section">
        <Box className="form-content">
          <Grid container spacing={4} alignItems="flex-start" sx={{ padding: '1rem' }}>
          {/* Columna izquierda */}
            <div className="left-column">
              <Typography variant="h4" sx={{ fontWeight: 'bold', textAlign: 'left', mb: 3 }}>
                ¿Por qué <span className="highlight">elegirnos</span>?
              </Typography>
              <Typography sx={{ fontSize: '1.2rem', textAlign: "justify", mb: 3, marginRight: '4.2rem' }}>
                En Buki Express llevamos oportunidades.
                Afiliar tu negocio con nosotros es la forma más fácil de vender más, sin complicaciones ni dolores de cabeza. 
                Tú lo preparas, nosotros nos encargamos del resto.
              </Typography>

              {/* Beneficio 1 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 5}}>
                <BarChart className="icon2-section" mb={1} sx={{ color: 'white', fontSize: '50px', alignSelf: 'center'}} />
                <Box>
                  <Typography sx={{ fontSize: '1.2rem', color: '#25316D', fontWeight: 'bold', textAlign: 'left' }}>Genera ventas adicionales</Typography>
                  <Typography sx={{ fontSize: '1rem', textAlign: 'justify', marginRight: '4.2rem' }} >Tus platillos llegan a más personas y tus ingresos suben sin gastar de más.</Typography>
                </Box>
              </Box>

              {/* Beneficio 2 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 5}}>
                <MoneyOff className="icon2-section" mb={1} fontSize="large" sx={{ color: 'white', fontSize: '50px', alignSelf: 'center' }} />
                <Box>
                  <Typography sx={{ fontSize: '1.2rem', color: '#25316D', fontWeight: 'bold', textAlign: 'left'}}>Evita gastos de repartidores</Typography>
                  <Typography sx={{ fontSize: '1rem', textAlign: 'justify', marginRight: '4.2rem' }}>Nosotros entregamos por ti. Ahorra en personal y enfócate en lo que mejor haces.</Typography>
                </Box>
              </Box>

              {/* Beneficio 3 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 5 }}>
                <Campaign className="icon2-section" mb={1} fontSize="large" sx={{ color: 'white', fontSize: '50px', alignSelf: 'center' }} />
                <Box>
                  <Typography sx={{ fontSize: '1.2rem', color: '#25316D', fontWeight: 'bold', textAlign: 'left' }}>Promoción de tu negocio</Typography>
                  <Typography sx={{ fontSize: '1rem', textAlign: 'justify', marginRight: '4.2rem' }}>Te damos visibilidad con publicaciones y campañas en nuestras redes.</Typography>
                </Box>
              </Box>
              
               {/* Beneficio 4 */}
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2.5, mb: 5 }}>
                <Campaign className="icon2-section" mb={1} fontSize="large" sx={{ color: 'white', fontSize: '50px', alignSelf: 'center' }} />
                <Box>
                  <Typography sx={{ fontSize: '1.2rem', color: '#25316D', fontWeight: 'bold', textAlign: 'left'}}>Promoción de tu negocio</Typography>
                  <Typography sx={{ fontSize: '1rem', textAlign: 'justify', marginRight: '4.2rem' }}>Te damos visibilidad con publicaciones y campañas en nuestras redes.</Typography>
                </Box>
              </Box>
            </div>

        <Grid>
          <div className="right-column">
            <Box component='form' onSubmit={handleSubmit} sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2, width: '38rem' }}>
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

              {/* Inputs */}
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
                label="Teléfono" 
                variant="filled" 
                size="small" 
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
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
                <TextField fullWidth required label="Producto" variant="filled" size="small" 
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
            </Box>
          </div>
        </Grid>
        </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Socios;
