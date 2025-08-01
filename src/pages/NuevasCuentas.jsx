import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Box, Paper, Table, TableContainer, TableHead, TableCell, TableRow, Typography, TableBody, Chip, IconButton, Button, TablePagination, Dialog, DialogTitle, DialogContent, TextField, MenuItem, CircularProgress, Drawer } from "@mui/material";
import { Search, CheckCircle, Close, ArrowBack, Cancel, Delete } from "@mui/icons-material";
import { aprobarUsuario, getNotificaciones, rechazarUsuario, eliminarNotificacion } from "../api/notificaciones";
import Logo from "../assets/logoHorizontal.png";

const NuevasCuentas = () => {
    // Estados para la tabla y búsqueda
    const [notificaciones, setNotificaciones] = useState([]);
    const [filteredUsuarios, setFilteredUsuarios] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

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

        const fetchSolicitudes = async () => {
        try {
            const response = await getNotificaciones();
            const newData = response.data.result;

            if (JSON.stringify(newData) !== JSON.stringify(notificaciones)) {
                setNotificaciones(newData);
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
                toast.error("Error al cargar las solicitudes de nuevos usuarios");
                setShowtoas(true);
                localStorage.setItem('toastShown', 'true');  // Marcar que ya se mostró el toast
            }
        }
    };
    useEffect(() => {
    fetchSolicitudes();
        const interval = setInterval(fetchSolicitudes, 5000);
        return () => clearInterval(interval);
    }, []);


    // Filtrar usuarios
    useEffect(() => {
        let filtered = notificaciones.filter((notificacion) => {
            const usuario = notificacion.usuario;
            return (
            notificacion.usuario.nombre.toLowerCase().includes(searchQuery.toLowerCase())
            || notificacion.usuario.apellidos.toLowerCase().includes(searchQuery.toLowerCase())
            || notificacion.usuario.correo.toLowerCase().includes(searchQuery.toLowerCase())
            );
        });

        if (statusFilter !== "all") {
            filtered = filtered.filter(
            (usuario) => usuario.status === statusFilter
            );
        }

        setFilteredUsuarios(filtered);
    }, [searchQuery, statusFilter, notificaciones]);

    // Manejadores de paginación
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Manejo de botón aprobar
    const [openAprobarModal, setOpenAprobarModal] = useState(false);

    const handleOpenAprobarModal = (notificacion) => {
        setSelectedNotificacion(notificacion);
        setOpenAprobarModal(true);
    };
    
    const handleCloseAprobarModal = () => {
        setOpenAprobarModal(false); 
        setSelectedNotificacion(null);
    };

    const handleAprobar = async () => {
        //console.log(currentNotificacion)
        try {
            const response = await aprobarUsuario({
                id: selectedNotificacion.id,                
                comentarios: "Solicitud aprobada por el administrador"
            });
            toast.success(response?.data?.text || "Solicitud aprobada correctamente");
            fetchSolicitudes();
        } catch (error) {
            console.error("Error al aprobar la solicitud:", error);
            toast.error(error.response?.data?.text || "Error al aprobar la solicitud");
        } finally {
            handleCloseAprobarModal();
        }
    };

    // Manejo de botón rechazar
    const [openRechazarModal, setOpenRechazarModal] = useState(false);
    const [selectedNotificacion, setSelectedNotificacion] = useState(null);

    const handleOpenRechazarModal = (notificacion) => {
        setSelectedNotificacion(notificacion);
        setOpenRechazarModal(true);
    };

    const handleCloseRechazarModal = () => {
        setOpenRechazarModal(false);
        setSelectedNotificacion(null);
    };

    const handleRechazar = async () => {
        //console.log(selectedNotificacion)
        try {
            const response = await rechazarUsuario({
                id: selectedNotificacion.id,
                comentarios: "Solicitud rechazada por el administrador"
            });
            toast.success(response?.data?.text || "Solicitud rechazada correctamente");
            fetchSolicitudes();
        } catch (error) {
            console.error("Error al rechazar la solicitud:", error);
            toast.error(error.response?.data?.text || "Error al rechazar la solicitud");
        } finally {
            handleCloseRechazarModal();
        }
    };

    // Manejar modal de eliminar notificación del usuario
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleOpenDeleteModal = (notificacion) => {
        setSelectedNotificacion(notificacion);
        setOpenDeleteModal(true);
    };  

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setSelectedNotificacion(null);
    };

    const handleDelete = async () => {
        try {
            const response = await eliminarNotificacion(selectedNotificacion);
            if (response.type === "SUCCESS") {  
                toast.success(response.text);
                // Actualizar el estado local
                setNotificaciones(notificaciones.filter((cat) => cat.id !== selectedNotificacion.id));   
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


    // Manejar modal de detalles del usuario
    const handleOpenModal = (notificacion) => {
        setSelectedOne(notificacion);
        setOpenDetailsModal(true);
    };

    const handleCloseModal = () => {
        setOpenDetailsModal(false)
        setSelectedOne(null);
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
                        <option value="PENDIENTE">Pendientes</option>
                        <option value="APROBADO">Aprobados</option>
                        <option value="RECHAZADO">Rechazados</option>
                    </select>
                </Box>
            </Box>
            {/* Título */}
            <Box sx={{marginBottom: '10px', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{align:'left', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 30, color: '#25316D'}}>Solicitudes de Nuevos Usuarios</Typography>

            </Box>
            {/* Tabla de gestión de solicitudes */}
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
                                {["ID", "Nombre", "Correo", "Tipo de usuario", "Estado de la solicitud", "Acciones", "Detalles"].map((header) => (
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
                                .map((notificacion) => (
                                    <TableRow key={notificacion.id} sx={{'&:hover': { backgroundColor: '#f5f5f5' },transition: 'background-color 0.3s'}}>
                                        <TableCell sx={{textAlign: 'center'}}>{notificacion.id}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{notificacion.usuario.nombre} {notificacion.usuario.apellidos}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{notificacion.usuario.correo}</TableCell>
                                        <TableCell sx={{ textAlign: "center" }}>{notificacion.usuario.rol === "ROLE_ADMIN_ACCESS" ? "Administrador" : "Personal"}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>
                                            {notificacion.status === "PENDIENTE" ? "Pendiente" : notificacion.status === "RECHAZADO" ? "Rechazado" : "Aprobado"}
                                            </TableCell>
                                        {/*<TableCell sx={{textAlign: 'center'}}>
                                            <Chip 
                                                label={notificacion.usuario.estado ? 'Activo' : 'Inactivo'}
                                                color={notificacion.usuario.estado ? 'success' : 'default'}
                                                size="small"
                                                onClick={() => handleOpenStatusModal(notificacion.usuario)}
                                                sx={{cursor: 'pointer'}}
                                            />
                                        </TableCell>*/}
                                        <TableCell sx={{ textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '10px'}}>
                                            <IconButton
                                                onClick={() => handleOpenAprobarModal(notificacion)}
                                                sx={{
                                                backgroundColor: '#25316D',
                                                color: 'white',
                                                borderRadius: '50%',
                                                padding: '6px',
                                                }}
                                            >
                                                <CheckCircle />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenRechazarModal(notificacion)}
                                                sx={{
                                                backgroundColor: '#25316D',
                                                color: 'white',
                                                borderRadius: '50%',
                                                padding: '6px',
                                                }}
                                            >
                                                <Cancel />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => handleOpenDeleteModal(notificacion)}
                                                sx={{
                                                backgroundColor: '#25316D',
                                                color: 'white',
                                                borderRadius: '50%',
                                                padding: '6px',
                                                }}
                                            >
                                                <Delete />
                                            </IconButton>
                                        </TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>
                                            <Button  variant="contained" onClick={() => handleOpenModal(notificacion.usuario)} sx={{
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

            {/* Modal para aprobar solicitud */}
            <Dialog open={openAprobarModal} onClose={handleCloseAprobarModal}>
                <DialogTitle sx={{backgroundColor: '#25316D', color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                    Confirmación
                    <IconButton
                    aria-label="close"
                    onClick={handleCloseAprobarModal}
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
                        ¿Deseas aprobar la solicitud de cuenta del usuario?
                    </Typography>
                    <Typography variant="body1" sx={{color: 'black', fontStyle: 'italic', paddingBottom: 2, textAlign: 'center'}}>
                        La solicitud será aprobada automaticamente
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, paddingTop: 1.5}}>
                        <Button
                        onClick={handleCloseAprobarModal}
                        sx={{backgroundColor: '#7E7E7E', color: 'white', borderRadius: 5, width: '8rem', textTransform: 'none', fontSize: '18px'}}
                        >
                        Cancelar
                        </Button>
                        <Button
                        onClick={handleAprobar}
                        variant="contained"
                        sx={{backgroundColor: '#25316D', borderRadius: 5, width: '8rem', textTransform: 'none', fontSize: '18px'}}
                        >
                        Confirmar
                        </Button>
                    </Box>
                    </Box>
                </DialogContent>
            </Dialog>

            {/* Modal para rechazar solicitud */}
            <Dialog open={openRechazarModal} onClose={handleCloseRechazarModal}>
                <DialogTitle sx={{backgroundColor: '#25316D', color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                    Confirmación
                    <IconButton
                    aria-label="close"
                    onClick={handleCloseRechazarModal}
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
                        ¿Deseas rechazar la solicitud de cuenta del usuario?
                    </Typography>
                    <Typography variant="body1" sx={{color: 'black', fontStyle: 'italic', paddingBottom: 2, textAlign: 'center'}}>
                        La solicitud será rechazada automaticamente
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, paddingTop: 1.5}}>
                        <Button
                        onClick={handleCloseRechazarModal}
                        sx={{backgroundColor: '#7E7E7E', color: 'white', borderRadius: 5, width: '8rem', textTransform: 'none', fontSize: '18px'}}
                        >
                        Cancelar
                        </Button>
                        <Button
                        onClick={handleRechazar}
                        variant="contained"
                        sx={{backgroundColor: '#25316D', borderRadius: 5, width: '8rem', textTransform: 'none', fontSize: '18px'}}
                        >
                        Confirmar
                        </Button>
                    </Box>
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
                        color: 'white',
                    }}
                    >
                    <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ p: 2.5, alignItems: 'center', justifyContent: 'center'}}>
                    <Typography variant="h6" sx={{color:'#25316D', fontWeight:'bold', paddingBottom: 1, textAlign: 'center'}}>
                        ¿Deseas eliminar la notificación del usuario: "
                        {selectedNotificacion?.usuario.nombre}"?
                    </Typography>
                    <Typography variant="body1" sx={{color: 'black', fontStyle: 'italic', paddingBottom: 2, textAlign: 'center'}}>
                        No podrás recuperar la notificación del usuario después de eliminarlo
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
        <ToastContainer />
        </Box>
    );
}

export default NuevasCuentas;