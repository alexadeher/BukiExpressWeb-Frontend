import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Box, Select, Paper, Table, TableContainer, TableHead, TableCell, TableRow, Typography, TableBody, Chip, IconButton, Button, TablePagination, Dialog, DialogTitle, DialogContent, TextField, MenuItem, CircularProgress, Drawer } from "@mui/material";
import { Search, Add, Edit, Close, ArrowBack, Delete } from "@mui/icons-material";
import { getUsuarios, crearUsuario, changeStatus, editUsuario, eliminarUsuario } from "../api/usuarios";
import Logo from "../assets/logoHorizontal.png";

const GestionUsuarios = () => {
    // Estados para la tabla y búsqueda
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Estados para agregar/editar usuario
    const [openAddModal, setOpenAddModal] = useState(false);
    const [currentUsuario, setCurrentUsuario] = useState(null)

    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol]= useState("");
    const [estado, setEstado] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [showtoas, setShowtoas] = useState(false);

    // Estados de modal de detalles
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedOne, setSelectedOne] = useState(null);


    // Drawer - traducir rol
    const traducirRol = (rol) => {
        switch (rol) {
            case 'ROLE_ADMIN_ACCESS':
            return 'Administrador';
            case 'ROLE_PERSONAL_ACCESS':
            return 'Personal';
            default:
            return rol;
        }
    };

    useEffect(() => {
        const fetchUsuarios = async () => {
        try {
            const response = await getUsuarios();
            const newData = response.data.result;

            if (JSON.stringify(newData) !== JSON.stringify(usuarios)) {
                setUsuarios(newData);
                setFilteredUsuarios(newData);

                if (!showtoas && !localStorage.getItem('toastShown')) {
                    toast.success("Nuevos datos cargados");
                    setShowtoas(true);
                    localStorage.setItem('toastShown', 'true');  // Marcar que ya se mostró el toast
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            if (!showtoas && !localStorage.getItem('toastShown')) {
                toast.error("Error al cargar los usuarios");
                setShowtoas(true);
                localStorage.setItem('toastShown', 'true');  // Marcar que ya se mostró el toast
            }
        }
    };

    fetchUsuarios();
        const interval = setInterval(fetchUsuarios, 5000);
        return () => clearInterval(interval);
    }, [usuarios]);


    // Filtrar usuarios
    useEffect(() => {
        let filtered = usuarios.filter((usuario) =>
            usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase())
            || usuario.apellidos.toLowerCase().includes(searchQuery.toLowerCase())
            || usuario.correo.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (statusFilter !== "all") {
            filtered = filtered.filter(
            (usuario) => usuario.estado === (statusFilter === "active")
            );
        }

        setFilteredUsuarios(filtered);
    }, [searchQuery, statusFilter, usuarios]);

    // Manejadores de paginación
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const resetForm = () => {
        setNombre("");
        setApellidos("");
        setCorreo("");
        setRol("");
        setContrasena("");
    };

      // Manejar modal de agregar/editar usuario
    const handleOpenModalUsuario = (usuario = null) => {
        setCurrentUsuario(usuario);
        if (usuario) {
            // Editar
            setNombre(usuario.nombre);
            setApellidos(usuario.apellidos);
            setCorreo(usuario.correo);
            setRol("");
            setContrasena(""); // Deshabilitado, pero limpiamos igual
        } else {
            // Agregar nuevo
            resetForm();
        }
        setOpenAddModal(true);
    };

    const handleCloseModalUsuario = () => {
        setOpenAddModal(false);
        setCurrentUsuario(null);
        resetForm();
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            let response;

            if (currentUsuario) {
                 // Modo editar
                response = await editUsuario({
                    id: currentUsuario.id,
                    nombre,
                    apellidos,
                    correo,
                    rol
                });
                //console.log("Respuesta de editar usuario:", response);

            } else {
                // Modo agregar
                response = await crearUsuario(nombre, apellidos, correo, contrasena, rol);
            }
            
            //console.log("Respuesta de la API:", response);
            if (response.type === "ERROR") {
                toast.error(response.text);
            } else if (response.type === "SUCCESS") {
                toast.success(response.text);
                handleCloseModalUsuario();
            } else if (response.type === "WARNING") {
                toast.warning(response.text);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear usuario");
            console.error("Error al crear usuario:", error);
        } finally {
            setIsLoading(false);
        }
    };
    //console.log("selectedOne", selectedOne);

    // Manejar modal de detalles del usuario
    const handleOpenModal = (usuario) => {
        setSelectedOne(usuario);
        setOpenDetailsModal(true);
    };

    const handleCloseModal = () => {
        setOpenDetailsModal(false)
        setSelectedOne(null);
    };

    // Manejar modal de eliminar usuario
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

    const handleOpenDeleteModal = (usuario) => {
        setSelectedUsuario(usuario);
        setOpenDeleteModal(true);
    };  

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setSelectedUsuario(null);
    };

    const handleDelete = async () => {
        try {
            const response = await eliminarUsuario(selectedUsuario);
            if (response.type === "SUCCESS") {  
                toast.success(response.text);
                // Actualizar el estado local
                setUsuarios(usuarios.filter((cat) => cat.id !== selectedUsuario.id));   
            } else {
                toast.error(response.text || "Error al eliminar el usuario");   
            }
            handleCloseDeleteModal();
        } catch (error) {
            console.error("Error al eliminar el usuario:", error);
            toast.error(
                error.response?.data?.message || "Error al eliminar el usuario"
            );
            handleCloseDeleteModal();
        }
    }

      // Estados para el modal de confirmación de cambio de status
    const [openStatusModal, setOpenStatusModal] = useState(false);

      // Función para abrir el modal de confirmación
    const handleOpenStatusModal = (usuario) => {
        setSelectedUsuario(usuario);
        setOpenStatusModal(true);
    };

    // Función para cerrar el modal de confirmación
    const handleCloseStatusModal = () => {
        setOpenStatusModal(false);
        setSelectedUsuario(null);
    };

    // Función para cambiar el estado
    const handleChangeStatus = async () => {
        try {
            if(!selectedUsuario) return;

            const response = await changeStatus(selectedUsuario.id);

            if (response.type === "SUCCESS") {
                toast.success("Estado cambiado exitosamente");
                // Actualizar el estado local
                setUsuarios(
                    usuarios.map((cat) =>
                    cat.id === selectedUsuario.id
                    ? {...cat, status: !cat.status }
                    : cat
                )
                );
            } else {
                toast.error(response.text || "Error al cambiar el estado");
            }
                handleCloseStatusModal();
            } catch (error) {
                console.error("Error al cambiar el estado:", error);
                toast.error(
                    error.response?.data?.message || "Error al cambiar el estado"
                );
                handleCloseStatusModal();
            }
    };

    return (
        <Box>
            <Box sx={{display: 'flex', justifyContent: 'start', marginBottom: '10px', alignItems: 'center', position: 'sticky', 
            top: 0, backgroundColor: 'white', zIndex: 1, padding: '10px 20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                {/* Barra de busqueda y filtro */}
                <Box sx={{display: 'flex', alignItems: 'center', borderRadius: '20px',
                    border: '1px solid #ccc', padding: '5px 10px', marginRight: '20px', backgroundColor: '#EAEAEA'}}>
                    <Search sx={{margin: '5px', color: '#7E7E7E'}} />
                    <input 
                        type="text"
                        placeholder="Buscar"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ border: 'none', outline: 'none', width: '300px', padding: '5px', backgroundColor: '#EAEAEA'}}
                    />
                </Box>
                <Box sx={{'& .MuiOutlinedInput-notchedOutline': {
                            border: 'none',},
                            '& .MuiSelect-select': {
                                padding: '6px 12px',},
                            '& .MuiInputBase-root': {
                                borderRadius: '12px',
                            }, borderRadius: '20px', border: '1px solid #ccc', padding: '5px 10px', backgroundColor: '#EAEAEA'}}>
                    <Select  
                        value={statusFilter}
                        displayEmpty
                        onChange={(e) => setStatusFilter(e.target.value)}
                        sx={{border: 'none', outline: 'none', fontSize: '14px', borderRadius: '10px', backgroundColor: '#EAEAEA'}}
                    >
                        <MenuItem value="all">Todos</MenuItem>
                        <MenuItem value="active">Activos</MenuItem>
                        <MenuItem value="inactive">Inactivos</MenuItem>
                    </Select>
                </Box>
            </Box>
            {/* Título y botón de Agregar */}
            <Box sx={{marginBottom: '10px', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{align:'left', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 30, color: '#25316D'}}>Usuarios</Typography>
                <Button
                    variant="contained"
                    onClick={() => handleOpenModalUsuario(null)}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "#25316D",
                        color: "white",
                        borderRadius: "20px",
                        padding: "8px 20px",
                        textTransform: 'none'
                    }}
                >
                <Add sx={{ marginRight: "8px" }} />
                {currentUsuario ? "Editar usuario" : "Nuevo usuario"}
                </Button>
            </Box>
            {/* Tabla de gestión de usuarios */}
            <Box sx={{maxWidth: '1350px', margin: 'auto', textAlign: 'center', padding: '0 20px'}}>
                <TableContainer 
                    component={Paper}
                    sx={{
                        borderRadius: 2,
                        boxShadow: 3,
                        overflowX: "auto",
                        width: "100%",
                    }}
                >
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{backgroundColor: '#25316D'}}>
                                {["ID", "Nombre", "Correo", "Tipo de usuario", "Estado", "Acciones", "Detalles"].map((header) => (
                                <TableCell
                                    key={header}
                                    sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    textAlign: 'center',
                                    padding: '12px 16px',
                                    }}
                                >
                                    {header}
                                </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredUsuarios
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((usuario) => (
                                    <TableRow key={usuario.id} sx={{'&:hover': { backgroundColor: '#f5f5f5' },transition: 'background-color 0.3s'}}>
                                        <TableCell sx={{textAlign: 'center'}}>{usuario.id}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{usuario.nombre} {usuario.apellidos}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{usuario.correo}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{usuario.rol === "ROLE_ADMIN_ACCESS" ? "Administrador" : "Personal"}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>
                                            <Chip 
                                                label={usuario.estado ? 'Activo' : 'Inactivo'}
                                                color={usuario.estado ? 'success' : 'default'}
                                                size="small"
                                                onClick={() => handleOpenStatusModal(usuario)}
                                                sx={{cursor: 'pointer'}}
                                            />
                                        </TableCell>
                                        <TableCell sx={{ textAlign: 'center' }}>
                                            <Box
                                                sx={{
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                gap: '10px',
                                                }}
                                            >
                                                <IconButton
                                                onClick={() => handleOpenModalUsuario(usuario)}
                                                sx={{
                                                    backgroundColor: '#25316D',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    padding: '6px',
                                                }}
                                                >
                                                <Edit />
                                                </IconButton>
                                                <IconButton
                                                onClick={() => handleOpenDeleteModal(usuario)}
                                                sx={{
                                                    backgroundColor: '#25316D',
                                                    color: 'white',
                                                    borderRadius: '50%',
                                                    padding: '6px',
                                                }}
                                                >
                                                <Delete />
                                                </IconButton>
                                            </Box>
                                        </TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>
                                            <Button  variant="contained" onClick={() => handleOpenModal(usuario)} sx={{
                                                backgroundColor: '#25316D',
                                                color: 'white',
                                                borderRadius: '20px',
                                                textTransform: 'none',
                                                width: '150px',
                                                fontSize: '16px',
                                                '&:hover': {
                                                    backgroundColor: '#5BAED1',
                                                },}}>
                                                Ver detalles
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50]}
                        component="div"
                        count={filteredUsuarios.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        labelRowsPerPage="Filas por página"
                        labelDisplayedRows={({ from, to, count }) =>
                            `${from}–${to} de ${count !== -1 ? count : `más de ${to}`}`
                        }
                    />
                </TableContainer>
            </Box>

            {/* Modal para agregar nuevo usuario */}
            <Dialog
                open={openAddModal}
                onClose={handleCloseModalUsuario}
                maxWidth='sm'
                fullWidth  
                sx={{
                    '& .MuiPaper-root': {
                    border: '2px solid #25316D',
                    borderRadius: '12px',
                    }
                }}         
            >
                <DialogTitle sx={{backgroundColor: '#25316D', color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                    {currentUsuario ? "Editar usuario" : "Nuevo usuario"}
                    <IconButton
                        aria-label='close'
                        onClick={handleCloseModalUsuario}
                        sx={{position: "absolute",
                            right: 8,
                            top: 8,
                            color: 'white'}}
                    >
                        <Close/>
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ maxHeight: '70vh', overflowY: 'auto' }}>
                    <Box component='form' onSubmit={handleSubmit} sx={{mt: 2}}>
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='nombre'
                            label='Nombre(s)'
                            name='nombre'
                            value={nombre}
                            onChange={(e) => setNombre(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='apellidos'
                            label='Apellidos'
                            name='apellidos'
                            value={apellidos}
                            onChange={(e) => setApellidos(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='correo'
                            label="Correo electrónico"
                            name='correo'
                            value={correo}
                            onChange={(e) => setCorreo(e.target.value)}
                            autoFocus
                        />
                        {!currentUsuario && (
                            <TextField
                            margin='normal'
                            required
                            fullWidth
                            id='contrasena'
                            label="Contraseña"
                            placeholder="••••••••"
                            type="password"
                            value={contrasena}
                            onChange={(e) => setContrasena(e.target.value)}
                            autoFocus
                            />
                        )}
                        {!currentUsuario && (
                        <TextField
                            margin='normal'
                            select
                            required
                            fullWidth
                            id='rol'
                            label='Rol'
                            name='rol'
                            value={rol}
                            onChange={(e) => setRol(e.target.value)}
                            autoFocus
                            >
                            <MenuItem value="" disabled>Selecciona un rol</MenuItem>
                            <MenuItem value="ROLE_ADMIN_ACCESS">Administrador</MenuItem>
                            <MenuItem value="ROLE_PERSONAL_ACCESS">Personal</MenuItem>
                        </TextField>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2, backgroundColor: '#25316D', borderRadius: 5, width: '100%', textTransform: 'none', fontSize: '18px'}}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Guardar"}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Modal para eliminar un usuario */}
            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal}>
                <DialogTitle sx={{backgroundColor: '#25316D', color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                    Confirmación
                    <IconButton
                    aria-label="close"
                    onClick={handleCloseDeleteModal}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: 'white'
                    }}
                    >
                    <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2.5, alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant="h6" sx={{color:'#25316D', fontWeight:'bold', paddingBottom: 1, textAlign: 'center'}}>
                        ¿Deseas eliminar al usuario: "
                        {selectedUsuario?.nombre}"?
                    </Typography>
                    <Typography variant="body1" sx={{color: 'black', fontStyle: 'italic', paddingBottom: 2, textAlign: 'center'}}>
                        No podrás recuperar el registro de usuario después de eliminarlo
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, paddingTop: 1.5}}>
                        <Button
                        onClick={handleCloseDeleteModal}
                        sx={{backgroundColor: '#7E7E7E', color: 'white', borderRadius: 5, width: '8rem', textTransform: 'none', fontSize: '18px'}}
                        >
                        Cancelar
                        </Button>
                        <Button
                        onClick={handleDelete}
                        variant="contained"
                        sx={{backgroundColor: '#25316D', borderRadius: 5, width: '8rem', textTransform: 'none', fontSize: '18px'}}
                        >
                        Confirmar
                        </Button>
                    </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Modal para ver detalles */}
            <Drawer
            anchor="right"
            open={openDetailsModal}
            onClose={handleCloseModal}
            PaperProps={{
                sx: {
                width: '100%',
                maxWidth: 400,
                height: '100%', 
                boxSizing: 'border-box',
                backgroundColor: '#F5F5F5',
                borderTopLeftRadius: 16,
                borderBottomLeftRadius: 16,
                }
            }}
            >
            {selectedOne && (
                <>
                <Box      
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    px: 2,
                    py: 2,
                    backgroundColor: '#25316D',
                    boxSizing: 'border-box'
                }}>
                    <img src={ Logo } alt="Logo de Buki Express" style={{ width: '50%' }} />
                </Box>
                <Box sx={{ margin: 1.8,  display: 'flex', alignItems: 'center'}}>
                    <IconButton onClick={handleCloseModal} sx={{color: '#25316D'}}>
                        <ArrowBack />
                    </IconButton>
                    <Typography sx={{color: '#25316D'}}>Atrás</Typography>
                </Box>
                <Box sx={{backgroundColor: '#EAEAEA', height: '100%'}}>
                <Typography variant="h6" sx={{color: '#7E7E7E', fontWeight: 'bold', margin: 0.5, paddingLeft: 1}}>DETALLES</Typography>
                <Box bgcolor="white" p={2} borderRadius={2} sx={{width: '24rem', margin: 1}}>
                    <Typography variant="h6" fontWeight="bold" color='#FF9149'>Información</Typography>
                    <ul style={{paddingLeft: 22}}>
                        <li>Nombre completo: {selectedOne.nombre} {selectedOne.apellidos}</li>
                        <li>Correo: {selectedOne.correo}</li>
                        <li>Rol: {traducirRol(selectedOne.rol)} </li>
                        <li>Estado: {selectedOne.estado === true ? 'Activo' : selectedOne.estado === false ? 'Inactivo' : 'No definido'}</li>
                    </ul>
                </Box>
                </Box>
                </>
            )}
            </Drawer>

            {/* Modal para cambiar el estado */}
            <Dialog open={openStatusModal} onClose={handleCloseStatusModal}>
                <DialogTitle sx={{backgroundColor: '#25316D', color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                    Confirmación
                    <IconButton
                    aria-label="close"
                    onClick={handleCloseStatusModal}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: 'white',
                    }}
                    >
                    <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2.5, alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant="h6" sx={{color:'#25316D', fontWeight:'bold', paddingBottom: 1, textAlign: 'center'}}>
                        ¿Deseas cambiar el estado del usuario: "
                        {selectedUsuario?.nombre}"?
                    </Typography>
                    <Typography variant="body1" sx={{color: 'black', fontStyle: 'italic', paddingBottom: 2, textAlign: 'center'}}>
                        El cambio de estado será aplicado automaticamente
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, paddingTop: 1.5}}>
                        <Button
                        onClick={handleCloseStatusModal}
                        sx={{backgroundColor: '#7E7E7E', color: 'white', borderRadius: 5, width: '8rem', textTransform: 'none', fontSize: '18px'}}
                        >
                        Cancelar
                        </Button>
                        <Button
                        onClick={handleChangeStatus}
                        variant="contained"
                        sx={{backgroundColor: '#25316D', borderRadius: 5, width: '8rem', textTransform: 'none', fontSize: '18px'}}
                        >
                        Confirmar
                        </Button>
                    </Box>
                    </Box>
                </DialogContent>
            </Dialog>
        <ToastContainer />
        </Box>
    );
}

export default GestionUsuarios;