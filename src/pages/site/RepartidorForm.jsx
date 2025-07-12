import React, { useState } from 'react';
import {
  Box, Typography, Stepper, Step, StepButton, TextField,
  Button, RadioGroup, Radio, FormControlLabel, Dialog, DialogTitle, DialogContent, ImageList, ImageListItem
} from '@mui/material';
import "../../styles/Site.css";

const steps = ['Información personal', 'Documentación', 'Horario'];

const RepartidorForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [openModal, setOpenModal] = useState(false);

  const handleStep = (step) => () => setActiveStep(step);

  const handleNext = () => {
    const newCompleted = { ...completed, [activeStep]: true };
    setCompleted(newCompleted);
    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      setOpenModal(true); // Mostrar modal al final
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const isStepComplete = (step) => completed[step];

  return (
    <Box sx={{ padding: '4rem', backgroundColor: '#f6f6f6' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#25316D', textAlign: 'left', mb: 1 }}>
        ¡Afíliate hoy y haz crecer tu negocio!
      </Typography>
      <Typography variant="body2" sx={{ fontSize: '1rem', textAlign: 'left', mb: 3 }}>
        Completa el formulario y únete a nuestra red de socios.
      </Typography>

      <div className="divider">
        <div className="left-line"></div>
        <div className="right-line"></div>
      </div>

      {/* Formulario */}
      <Box sx={{ backgroundColor: 'white', p: 4, borderRadius: 2, boxShadow: 2, width: '100%' }}>
        
        {/* Stepper */}
        <Stepper nonLinear activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={isStepComplete(index)}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                {label}
              </StepButton>
            </Step>
          ))}
        </Stepper>

        {/* Inputs por paso */}
        {activeStep === 0 && (
          <>
            <div className="form-input">
              <TextField fullWidth required label="Nombre" variant="filled" size="small" />
            </div>
            <div className="form-input">
              <TextField fullWidth required label="Apellidos" variant="filled" size="small" />
            </div>
            <div className="form-input">
              <TextField fullWidth required label="Edad" variant="filled" size="small" />
            </div>
            <div className="form-input">
              <TextField fullWidth required label="Lugar de residencia" variant="filled" size="small" />
            </div>
          </>
        )}

        {activeStep === 1 && (
          <>
            <Typography variant="body1" sx={{ mb: 2}}>INE:</Typography>
            <input type="file" multiple />
            <Typography variant="body1" sx={{ mb: 2, paddingTop: 2 }}>Comprobante de domicilio:</Typography>
            <input type="file" multiple />
            <Typography variant="body1" sx={{ mb: 2, paddingTop: 2  }}>Licencia de conducir:</Typography>
            <input type="file" multiple />
            <Typography variant="body1" sx={{ mb: 2, paddingTop: 2  }}>Comprobante de cuenta bancaria:</Typography>
            <input type="file" multiple />
            <Typography variant="body1" sx={{ mb: 2, paddingTop: 2  }}>¿Cuentas con efectivo revolvente?:</Typography>
            <RadioGroup
              name="efectivoRevolvente"
              row
            >
              <FormControlLabel value="sí" control={<Radio />} label="Sí" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </>
        )}

        {activeStep === 2 && (
          <>
            <Typography variant="body1" sx={{ mb: 2 }}>Selecciona tu horario disponible:</Typography>
            <TextField select fullWidth label="Horario" variant="filled" size="small" SelectProps={{ native: true }}>
              <option value="">Selecciona...</option>
              <option value="mañana">Mañana</option>
              <option value="tarde">Tarde</option>
              <option value="noche">Noche</option>
            </TextField>
          </>
        )}

        {/* Botón siguiente o enviar */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          {activeStep > 0 ? (
            <Button variant="outlined" onClick={handleBack}>
              Regresar
            </Button>
          ) : <span />}  {/* Espaciador vacío si no hay botón */}

          <Button variant="contained" onClick={handleNext}>
            {activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
          </Button>
        </Box>
      </Box>

      {/* Modal con aviso de privacidad 
      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="md" fullWidth>
        <DialogTitle>Aviso de Privacidad</DialogTitle>
        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Consulta los términos en los siguientes documentos:
          </Typography>
          <ImageList cols={3} rowHeight={160}>
            {['/img1.jpg', '/img2.jpg', '/img3.jpg'].map((src, index) => (
              <ImageListItem key={index}>
                <img src={src} alt={`Aviso ${index}`} loading="lazy" />
              </ImageListItem>
            ))}
          </ImageList>
          <Box sx={{ mt: 3, textAlign: 'right' }}>
            <Button variant="outlined" onClick={handleCloseModal}>Cerrar</Button>
          </Box>
        </DialogContent>
      </Dialog>
      */}
    </Box>
  );
};

export default RepartidorForm;
