import React, { useState } from 'react';
import {
  Box, Typography, Stepper, Step, StepButton, TextField,
  Button, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, MenuItem, Dialog, DialogTitle, DialogContent, ImageList, ImageListItem
} from '@mui/material';
import "../styles/Site.css";
import FileInput from "../components/FileInput.jsx";
import ModalAvisoPrivacidad from '../components/ModalAvisoPrivacidad.jsx';

const steps = ['Información personal', 'Documentación', 'Horario'];

const RepartidorForm = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState({});
  const [openModal, setOpenModal] = useState(false);

  // ejemplo de datos del formulario
  const [formData, setFormData] = useState({
  nombre: '',
  apellidos: '',
  edad: '',
  residencia: '',
  moto: '',
  mochilaReparto: '', 
  trabajoActual: '',
  horarioTrabajo: '', 
  ine: null,
  domicilio: null,
  licencia: null,
  cuenta: null,
  motoPropia: '',
  efectivoRevolvente: '',
  horarioPreferido: ''
});

  const handleStep = (step) => () => setActiveStep(step);

  const [errors, setErrors] = useState({});
  // Función para validar el paso 1 del formulario
  const validateStepOne = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = true;
    if (!formData.apellidos.trim()) newErrors.apellidos = true;
    if (!formData.edad) newErrors.edad = true;
    if (!formData.residencia.trim()) newErrors.residencia = true;
    if (!formData.moto) newErrors.moto = true;
    if (!formData.mochilaReparto) newErrors.mochilaReparto = true;
    if (!formData.trabajoActual) newErrors.trabajoActual = true;
    if (formData.trabajoActual === 'sí' && !formData.horarioTrabajo) {
      newErrors.horarioTrabajo = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para validar el paso 2 del formulario
  const validateStepTwo = () => {
    const newErrors = {};
    if (!formData.ine) newErrors.ine = true;
    if (!formData.domicilio) newErrors.domicilio = true;
    if (!formData.licencia) newErrors.licencia = true;
    if (!formData.cuenta) newErrors.cuenta = true;
    if (!formData.efectivoRevolvente) newErrors.efectivoRevolvente = true;
    if (!formData.motoPropia) newErrors.motoPropia = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    // Función para validar el paso 2 del formulario
  const validateStepThree = () => {
    const newErrors = {};
    if (!formData.horarioPreferido) newErrors.horarioPreferido = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // Validar el paso actual antes de avanzar
    let valid = true;

    if (activeStep === 0) valid = validateStepOne();
    if (activeStep === 1) valid = validateStepTwo();
    if (activeStep === 2) valid = validateStepThree();

    if (!valid) return;

    const newCompleted = { ...completed, [activeStep]: true };
    setCompleted(newCompleted);

    if (activeStep < steps.length - 1) {
      setActiveStep((prev) => prev + 1);
    } else {
      setOpenModal(true);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleCloseModal = () => setOpenModal(false);

  const isStepComplete = (step) => completed[step];

  const handleChange = (e) => {
  const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, name) => {
    setFormData({ ...formData, [name]: e.target.files[0] });
  };

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
        // Paso 1: Información personal
        <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap'}}>
          {/* Columna Izquierda */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <div className="form-input">
              <TextField
                fullWidth
                required
                name="nombre"
                label="Nombre"
                variant="filled"
                size="small"
                value={formData.nombre}
                onChange={handleChange}
                error={errors.nombre}
              />
            </div>
            <div className="form-input">
              <TextField
                fullWidth
                required
                name="apellidos"
                label="Apellidos"
                variant="filled"
                size="small"
                value={formData.apellidos}
                onChange={handleChange}
                error={errors.apellidos}
              />
            </div>
            <div className="form-input">
              <TextField
                select
                fullWidth
                required
                name="edad"
                label="Edad"
                variant="filled"
                size="small"
                value={formData.edad}
                onChange={handleChange}
                error={errors.edad}
              >
              <MenuItem value="" disabled></MenuItem>
              {Array.from({ length: 23 }, (_, i) => {
                const age = i + 18;
                return (
                  <MenuItem key={age} value={age}>
                    {age}
                  </MenuItem>
                );
              })}
              </TextField>
            </div>
            <div className="form-input">
              <TextField
                fullWidth
                required
                name="residencia"
                label="Lugar de residencia"
                variant="filled"
                size="small"
                value={formData.residencia}
                onChange={handleChange}
                error={errors.residencia}
              />
            </div>
          </Box>

          {/* Columna Derecha */}
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <div className="form-input">
              <FormControl component="fieldset" error={errors.moto}>
                <FormLabel>¿Cuentas con motocicleta?</FormLabel>
                <RadioGroup
                  row
                  name="moto"
                  value={formData.moto}
                  onChange={handleChange}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="form-input">
              <FormControl component="fieldset" error={errors.mochilaReparto}>
                <FormLabel>¿Cuentas con mochila de reparto?</FormLabel>
                <RadioGroup
                  row
                  name="mochilaReparto"
                  value={formData.mochilaReparto}
                  onChange={handleChange}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>

            <div className="form-input">
              <FormControl component="fieldset" error={errors.trabajoActual}>
                <FormLabel>¿Cuentas con algún trabajo actualmente?</FormLabel>
                <RadioGroup
                  row
                  name="trabajoActual"
                  value={formData.trabajoActual}
                  onChange={handleChange}
                >
                  <FormControlLabel value="si" control={<Radio />} label="Sí" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </div>
            {/* Condición de la pregunta: ¿Cuentas con algún trabajo actualmente? */}
            {formData.trabajoActual === "si" && (
            <div className="form-input">
              <TextField
                select
                fullWidth
                name="horarioTrabajo"
                label="¿En qué horario trabajas?"
                variant="filled"
                size="small"
                value={formData.horarioTrabajo}
                onChange={handleChange}
                error={errors.horarioTrabajo}
              >
                <MenuItem value="" disabled></MenuItem>
                {['Mañana', 'Tarde', 'Noche'].map((h) => (
                  <MenuItem key={h} value={h.toLowerCase()}>{h}</MenuItem>
                ))}
              </TextField>
            </div>
            )}
          </Box>
        </Box>
        )}

        {/* Paso 2: Documentación */}
        {activeStep === 1 && (
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap'}}>
            {/* Columna Izquierda */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <div className="form-input">
                <FileInput
                  name="ine"
                  label="INE"
                  error={errors.ine}
                  file={formData.ine}
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-input">
                <FileInput
                  name="domicilio"
                  label="Comprobante de domicilio"
                  error={errors.domicilio}
                  file={formData.domicilio}
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-input">
                <FileInput
                  name="licencia"
                  label="Licencia vigente"
                  error={errors.licencia}
                  file={formData.licencia}
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-input">
                <FileInput
                  name="cuenta"
                  label="Comprobante de cuenta bancaria"
                  error={errors.cuenta}
                  file={formData.cuenta}
                  onChange={handleFileChange}
                />
              </div>
            </Box>
            {/* Columna Derecha */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <div className="form-input">
                <FormControl component="fieldset" error={errors.motoPropia}>
                  <FormLabel>¿Cuentas con motocicleta propia?</FormLabel>
                  <RadioGroup
                    row
                    name="motoPropia"
                    value={formData.motoPropia}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="si" control={<Radio />} label="Sí" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </div>
              <div className="form-input">
                <FormControl component="fieldset" error={errors.efectivoRevolvente}>
                  <FormLabel>¿Cuentas con efectivo revolvente?</FormLabel>
                  <RadioGroup
                    row
                    name="efectivoRevolvente"
                    value={formData.efectivoRevolvente}
                    onChange={handleChange}
                  >
                    <FormControlLabel value="si" control={<Radio />} label="Sí" />
                    <FormControlLabel value="no" control={<Radio />} label="No" />
                  </RadioGroup>
                </FormControl>
              </div>
            </Box>
          </Box>
          )}

        {/* Paso 3: Horario */}
        {activeStep === 2 && (
          <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap'}}>
            {/* Columna Izquierda */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <div className="form-input">
                <Typography variant="body1" sx={{ mb: 2 }}>Selecciona tu horario disponible:</Typography>
                <TextField
                  select
                  fullWidth
                  name="horarioPreferido"
                  label="Horario"
                  variant="filled"
                  size="small"
                  value={formData.horarioPreferido}
                  onChange={handleChange}
                  error={errors.horarioPreferido}
                >
                  <MenuItem value="" disabled></MenuItem>
                  {['Mañana (08:00am - 12:00pm)', 'Mediodía (13:00pm - 15:00pm)', ' Tarde (15:00pm - 18:00pm)'].map((i) => (
                    <MenuItem key={i} value={i.toLowerCase()}>{i}</MenuItem>
                  ))}
                </TextField>
              </div>
            </Box>
            <Box sx={{ flex: 1, minWidth: 300 }}>
            </Box>
          </Box>
        )}

        {/* Botón siguiente o enviar */}
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          {activeStep > 0 ? (
            <Button variant="contained" onClick={handleBack} sx={{
            backgroundColor: '#FF9149', borderRadius: '20px',
            padding: '6px 16px',
            transition: 'background-color 0.3s ease', 
            textTransform: 'none'}}>
              Atrás
            </Button>
          ) : <span />}  {/* Espaciador vacío si no hay botón */}

          <Button variant="contained" onClick={handleNext} sx={{
            backgroundColor: '#FF9149', borderRadius: '20px',
            padding: '6px 16px',
            transition: 'background-color 0.3s ease', 
            textTransform: 'none'}}>
            {activeStep === steps.length - 1 ? 'Enviar' : 'Siguiente'}
          </Button>
        </Box>
      </Box>

      {/* Modal con aviso de privacidad*/} 
      <ModalAvisoPrivacidad
        open={openModal}
        onClose={handleCloseModal}
        onAccept= { () => {
          console.log('Enviado');
          handleCloseModal();
        }}
      />
    </Box>
  );
};

export default RepartidorForm;
