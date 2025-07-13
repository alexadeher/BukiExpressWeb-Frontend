import React from 'react';
import { Box, Typography, FormControl, FormLabel } from '@mui/material';

const FileInput = ({ name, label, error, onChange, file }) => {
    return (
        <FormControl component="fieldset" error={error} sx={{ width: '100%' }}>
        <FormLabel>{label}</FormLabel>

        <Box
            component="label"
            htmlFor={name}
            sx={{
            color: '#606060',
            display: 'inline-block',
            padding: '8px 16px',
            backgroundColor: '#f0f0f0',
            border: '1px solid #ccc',
            borderRadius: '3px',
            cursor: 'pointer',
            mt: 1,
            '&:hover': {
                backgroundColor: '#e0e0e0',
            },
            }}
        >
            Seleccionar archivo
        </Box>

        <input
            id={name}
            name={name}
            type="file"
            onChange={(e) => onChange(e, name)}
            style={{ display: 'none' }}
        />

        {file && (
            <Typography variant="body2" sx={{ mt: 1 }}>
            Archivo seleccionado: {file.name}
            </Typography>
        )}

        {error && (
            <Typography color="error" variant="caption">
            Archivo requerido
            </Typography>
        )}
        </FormControl>
    );
};

export default FileInput;
