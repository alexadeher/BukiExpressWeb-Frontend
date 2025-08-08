import React, { useState, useEffect } from 'react';
import {
  Box, Typography, Stepper, Step, StepButton, TextField,
  Button, RadioGroup, Radio, FormControlLabel, FormControl, FormLabel, MenuItem, Dialog, DialogTitle, DialogContent, ImageList, ImageListItem, 
  Checkbox, Table, TableHead, TableRow, TableCell, TableBody
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
  domicilio: '',
  telefono: '',
  telefonoSecundario: '',
  moto: '',
  mochilaReparto: '', 
  trabajoActual: '',
  horarioTrabajo: '', 
  ine: null,
  comprobanteDomicilio: null,
  licencia: null,
  cuenta: '',
  efectivoRevolvente: '',
  horarioPreferido: ''
});

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState(''); 
  const [edad, setEdad] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [telefono, setTelefono] = useState('');
  const [telefonoSecundario, setTelefonoSecundario] = useState('');
  const [moto, setMoto] = useState('');
  const [mochilaReparto, setMochilaReparto] = useState('');
  const [trabajoActual, setTrabajoActual] = useState('');
  const [horarioTrabajo, setHorarioTrabajo] = useState('');
  const [ine, setIne] = useState(null);
  const [comprobanteDomicilio, setComprobanteDomicilio] = useState(null);
  const [licencia, setLicencia] = useState(null);
  const [cuenta, setCuenta] = useState('');
  const [efectivoRevolvente, setEfectivoRevolvente] = useState('');
  const [horarioPreferido, setHorarioPreferido] = useState('');

  const handleStep = (step) => () => setActiveStep(step);

  const [errors, setErrors] = useState({});
  // Función para validar el paso 1 del formulario
  const validateStepOne = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = true;
    if (!formData.apellidos.trim()) newErrors.apellidos = true;
    if (!formData.edad) newErrors.edad = true;
    if (!formData.domicilio.trim()) newErrors.domicilio = true;
    if (!formData.telefono.trim()) newErrors.telefono = true;
    if (!formData.telefonoSecundario.trim()) newErrors.telefonoSecundario = true;
    if (!formData.moto) newErrors.moto = true;
    if (!formData.mochilaReparto) newErrors.mochilaReparto = true;
    if (!formData.trabajoActual) newErrors.trabajoActual = true;
    if (trabajoActual === 'sí' && !horarioTrabajo) {
      newErrors.horarioTrabajo = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para validar el paso 2 del formulario
  const validateStepTwo = () => {
    const newErrors = {};
    if (!formData.ine) newErrors.ine = true;
    if (!formData.comprobanteDomicilio) newErrors.comprobanteDomicilio = true;
    if (!formData.licencia) newErrors.licencia = true;
    if (!formData.cuenta) newErrors.cuenta = true;
    if (!formData.efectivoRevolvente) newErrors.efectivoRevolvente = true;

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    // Función para validar el paso 2 del formulario
  const validateStepThree = () => {
    const newErrors = {};
    //if (!horarioPreferido) newErrors.horarioPreferido = true;

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


  // Paso 3: Formulario de horario
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const [horarios, setHorarios] = useState([]);
  const [horarioError, setHorarioError] = useState(null);

  const horas = Array.from({ length: 13 }, (_, i) => {
    const start = 9 + i;
    return {
      inicio: `${start.toString().padStart(2, '0')}:00`,
      fin: `${(start + 1).toString().padStart(2, '0')}:00`,
    };
  });

  const [seleccionados, setSeleccionados] = useState({});

  const toggleHorario = (dia, hora) => {
    const key = `${dia}_${hora.inicio}_${hora.fin}`;
    const nuevoEstado = { ...seleccionados, [key]: !seleccionados[key] };
    setSeleccionados(nuevoEstado);
  };

  // Validar mínimo 3 horas por día seleccionado
  useEffect(() => {
    const horariosSeleccionados = Object.entries(seleccionados)
      .filter(([_, activo]) => activo)
      .map(([key]) => {
        const [dia, inicio, fin] = key.split("_");
        return { dia, horaInicio: inicio, horaFin: fin };
      });

    const agrupadosPorDia = horariosSeleccionados.reduce((acc, horario) => {
      acc[horario.dia] = acc[horario.dia] || [];
      acc[horario.dia].push(horario);
      return acc;
    }, {});

    const diasConError = Object.entries(agrupadosPorDia)
      .filter(([_, horarios]) => horarios.length < 3)
      .map(([dia]) => dia);

    if (diasConError.length > 0) {
      setHorarioError(`Selecciona al menos 3 horas para: ${diasConError.join(", ")}`);
    } else {
      setHorarioError(null); // no hay errores
    }

    setHorarios(horariosSeleccionados);
  }, [seleccionados]);

  return (
    <Box sx={{ padding: '4rem', backgroundColor: '#f6f6f6' }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#25316D', textAlign: 'left', mb: 1 }}>
        ¡Afíliate hoy y haz crecer tu negocio!
      </Typography>
      <Typography variant="body2" sx={{ fontSize: '1rem', textAlign: 'left', mb: 3 }}>
        Completa el formulario y únete a nuestra red de repartidores.
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
              {Array.from({ length: 15 }, (_, i) => {
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
                name="domicilio"
                label="Lugar de residencia"
                variant="filled"
                size="small"
                value={formData.domicilio}
                onChange={handleChange}
                error={errors.domicilio}
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
              value={formData.telefono}
              name="telefono"
              onChange={handleChange}
              inputProps={{
                maxLength: 10,
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              error={errors.telefono}
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
              value={formData.telefonoSecundario}
              name='telefonoSecundario'
              onChange={handleChange}
              inputProps={{
                maxLength: 10,
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
              error={errors.telefonoSecundario}
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
                  fullWidth 
                  required 
                  variant="filled" 
                  size="small" 
                  value={formData.ine}
                />
              </div>
              <div className="form-input">
                <FileInput
                  name="comprobanteDomicilio"
                  label="Comprobante de domicilio"
                  error={errors.comprobanteDomicilio}
                  file={formData.comprobanteDomicilio}
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
            </Box>
            {/* Columna Derecha */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <div className="form-input" style={{ marginTop: '1.8rem' }}>
                <TextField 
                fullWidth 
                required 
                label="Número de cuenta bancaria" 
                variant="filled" 
                size="small"
                value={formData.cuenta}
                name="cuenta"
                onChange={handleChange}
                inputProps={{
                maxLength: 16,
                inputMode: 'numeric',
                pattern: '[0-9]*'
              }}
                />
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
            <Box sx={{ flex: 4, minWidth: 300 }}>
              <div className="form-input">
                <Typography variant="body1" sx={{ mb: 2 }}>Selecciona minimo 3 horas por día</Typography>
                <Box sx={{ overflowX: 'auto', mt: 2 }}>
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>Hora</TableCell>
                          {dias.map((dia) => (
                            <TableCell key={dia}>{dia}</TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {horas.map((hora) => (
                          <TableRow key={hora.inicio}>
                            <TableCell>{`${hora.inicio} - ${hora.fin}`}</TableCell>
                            {dias.map((dia) => {
                              const key = `${dia}_${hora.inicio}_${hora.fin}`;
                              return (
                                <TableCell key={key}>
                                  <Checkbox
                                    checked={!!seleccionados[key]}
                                    onChange={() => toggleHorario(dia, hora)}
                                  />
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
              </div>
            </Box>
            {/* Columna Derecha */}
            <Box sx={{ flex: 1, minWidth: 300 }}>
              <div className="form-input">
                {horarioError && (
                  <Typography color="error" mt={1}>
                    {horarioError}
                  </Typography>
                )}
              </div>
            </Box>
          </Box>
        )}

        <Typography variant="body2" sx={{ fontSize: '0.9rem', textAlign: 'left', mb: 2 }}>
          * Los campos marcados con asterisco son obligatorios. 
        </Typography>
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
