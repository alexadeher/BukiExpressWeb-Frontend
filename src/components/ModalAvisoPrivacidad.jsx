import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Box, Typography, Button, IconButton, Checkbox, FormControlLabel } from '@mui/material';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import Socios from "../assets/Socios.png"
import SocioSection from "../assets/SocioSection.png"
import Repartidores from "../assets/Repartidores.png"
import Inicio from "../assets/Inicio.png"

const ModalAvisoPrivacidad = ({ open, onClose, onAccept }) => {
    const images = [Socios, SocioSection, Repartidores, Inicio];
    const [index, setIndex] = useState(0);
    const [accepted, setAccepted] = useState(false);
    const [touched, setTouched] = useState(false);

    const next = () => setIndex((prev) => (prev + 1) % images.length);
    const prev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    const handleSubmit = () => {
        if (!accepted) {
        setTouched(true);
        return;
        }
        onAccept(); // Enviar formulario o cerrar modal
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: '1.5rem' }}>
            Aviso de privacidad
        </DialogTitle>

        <DialogContent>
            <Box sx={{ position: 'relative', textAlign: 'center' }}>
            {/* Flecha Izquierda */}
            <IconButton
                onClick={prev}
                sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
                <ArrowBackIos sx={{ color: '#1b2f6b' }} />
            </IconButton>

            {/* Imagen */}
            <img
                src={images[index]}
                alt={`Aviso ${index + 1}`}
                style={{ width: '250px', height: 'auto', margin: 'auto' }}
            />

            {/* Flecha Derecha */}
            <IconButton
                onClick={next}
                sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)' }}
            >
                <ArrowForwardIos sx={{ color: '#1b2f6b' }} />
            </IconButton>
            </Box>

            {/* Checkbox */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
            <FormControlLabel
                control={
                <Checkbox
                    checked={accepted}
                    onChange={(e) => {
                    setAccepted(e.target.checked);
                    setTouched(false);
                    }}
                    sx={{
                    color: '#1b2f6b',
                    '&.Mui-checked': {
                        color: '#1b2f6b',
                    },
                    }}
                />
                }
                label="He leído y acepto todos los documentos anteriores"
                sx={{ color: '#1b2f6b' }}
            />
            {touched && !accepted && (
                <Typography variant="caption" color="error" sx={{ display: 'block', mt: 1 }}>
                Debes aceptar los documentos antes de continuar.
                </Typography>
            )}
            </Box>

            {/* Botones */}
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
                variant="outlined"
                onClick={onClose}
                sx={{
                borderColor: '#1b2f6b',
                color: '#1b2f6b',
                borderRadius: 999,
                px: 4,
                textTransform: 'none',
                }}
            >
                Cancelar
            </Button>
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                backgroundColor: '#1b2f6b',
                borderRadius: 999,
                px: 4,
                textTransform: 'none',
                '&:hover': {
                    backgroundColor: '#14245a',
                },
                }}
            >
                Aceptar y enviar
            </Button>
            </Box>
        </DialogContent>
        </Dialog>
    );
};

export default ModalAvisoPrivacidad;