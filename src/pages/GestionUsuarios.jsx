import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Box, Paper, Table, TableContainer, TableHead, TableCell, TableRow, Typography, TableBody, Chip, IconButton, Button, TablePagination, Dialog, DialogTitle, DialogContent, TextField, MenuItem, CircularProgress, Drawer } from "@mui/material";
import { Search, Add, Edit, Close } from "@mui/icons-material";
import { getUsuarios, crearUsuario, changeStatus } from "../api/usuarios";
import Logo from "../assets/logoHorizontal.png";

const GestionUsuarios = () => {
    // Estados para la tabla y búsqueda
    const [usuarios, setUsuarios] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("active");

    // Estados para agregar usuario
    const [openAddModal, setOpenAddModal] = useState(false);
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [correo, setCorreo] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [rol, setRol]= useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [showtoas, setShowtoas] = useState(false);

    // Estados de modal de detalles
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedOne, setSelectedOne] = useState(null);

    useEffect(() => {
        const fetchUsuarios = async () => {
        try {
            const response = await getUsuarios(); // Use the imported API function
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

      // Manejar modal de agregar usuario
    const handleAddUsuario = () => {
        setOpenAddModal(true);
    };

    const handleCloseAddModal = () => {
        setOpenAddModal(false);
        resetForm();
    };

      // Resetear formulario
    const resetForm = () => {
        setNombre("");
        setApellidos("");
        setCorreo("");
        setContrasena("");
        setRol("");
    };

    // Enviar formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
        var response = await crearUsuario(nombre, apellidos, correo, contrasena, rol);
        console.log("Respuesta de la API:", response);

        if (response.type === "ERROR") {
            toast.error(response.text);
        } else if (response.type === "SUCCESS") {
            toast.success(response.text);
        } else if (response.type === "WARNING") {
            toast.warning(response.text);
        }

        setOpenAddModal(false);
        setNombre("");
        setApellidos("");
        setCorreo("");
        setContrasena("");
        setRol("");

        } catch (error) {
            toast.error(error.response?.data?.message || "Error al crear usuario");
            console.error("Error al crear usuario:", error);
        } finally {
            setIsLoading(false);
        }
    };

          // Manejar modal de detalles del usuario
    const handleOpenModal = (socio) => {
        setSelectedOne(socio);
        setOpenDetailsModal(true);
    };

    const handleCloseModal = () => {
        setOpenDetailsModal(false)
        setSelectedOne(null);
    };

      // Estados para el modal de confirmación de cambio de status
    const [openStatusModal, setOpenStatusModal] = useState(false);
    const [selectedUsuario, setSelectedUsuario] = useState(null);

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
                toast.success(response.text);
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
                <Box sx={{borderRadius: '20px', border: '1px solid #ccc', padding: '5px 10px', backgroundColor: '#EAEAEA'}}>
                    <select 
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{border: 'none', outline: 'none', fontSize: '14px', padding: '5px', borderRadius: '10px', backgroundColor: '#EAEAEA'}}
                    >
                        <option value="all">Todos</option>
                        <option value="active">Activos</option>
                        <option value="inactive">Inactivos</option>
                    </select>
                </Box>
            </Box>
            {/* Título y botón de Agregar */}
            <Box sx={{marginBottom: '10px', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{align:'left', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 30, color: '#25316D'}}>Usuarios</Typography>
                <Button
                    variant="contained"
                    onClick={handleAddUsuario}
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
                Nuevo usuario
                </Button>
            </Box>
            {/* Tabla de gestón de responsbales */}
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
                                {["ID", "Nombre", "Correo", "Tipo de usuario", "Estado", "Editar", "Detalles"].map((header) => (
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
                                            <IconButton
                                                sx={{
                                                backgroundColor: '#25316D',
                                                color: 'white',
                                                borderRadius: '50%',
                                                padding: '6px',
                                                }}
                                            >
                                                <Edit />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>
                                            <Button sx={{
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
                onClose={handleCloseAddModal}
                maxWidth='sm'
                fullWidth  
                sx={{
                    '& .MuiPaper-root': {
                    border: '2px solid #25316D',
                    borderRadius: '12px',
                    }
                }}         
            >
                <DialogTitle sx={{backgroundColor: '#25316D', color: 'white'}}>
                    Agregar Usuario
                    <IconButton
                        aria-label='close'
                        onClick={handleCloseAddModal}
                        sx={{position: 'absolute', right: 8, top: 8, color: (theme) => theme.palette.grey[500]}}
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

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 3, mb: 2 }}
                            disabled={isLoading}
                        >
                            {isLoading ? <CircularProgress size={24} /> : "Guardar"}
                        </Button>
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
                p: 3,
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
                <Typography variant="h6" sx={{color: '#7E7E7E', fontWeight: 'bold', margin: 0.5}}>DETALLES</Typography>

                <Box bgcolor="white" p={2} borderRadius={2} sx={{width: '22rem'}}>
                    <Typography variant="h6" fontWeight="bold" color='#FF9149'>Información</Typography>
                    <ul style={{paddingLeft: 22}}>
                        <li>Nombre completo: {selectedOne.nombre} {selectedOne.apellidos}</li>
                        <li>Correo: {selectedOne.correo}</li>
                        <li>Rol: {selectedOne.rol} </li>
                        <li>Estado: {selectedOne.estado}</li>
                    </ul>
                </Box>
                </>
            )}
            </Drawer>

            {/* Modal para cambiar el estado */}
            <Dialog open={openStatusModal} onClose={handleCloseStatusModal}>
                <DialogTitle>
                    Confirmar cambio de estado
                    <IconButton
                    aria-label="close"
                    onClick={handleCloseStatusModal}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                    >
                    <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2 }}>
                    <Typography variant="body1" gutterBottom>
                        ¿Estás seguro que deseas cambiar el estado del usuario: "
                        {selectedUsuario?.nombre}"?
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                        <Button
                        onClick={handleCloseStatusModal}
                        color="primary"
                        sx={{ mr: 2 }}
                        >
                        Cancelar
                        </Button>
                        <Button
                        onClick={handleChangeStatus}
                        color="primary"
                        variant="contained"
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