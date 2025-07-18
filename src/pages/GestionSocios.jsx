import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Box, Paper, Table, TableContainer, TableHead, TableCell, TableRow, Typography, TableBody, Chip, IconButton, Button, TablePagination, Dialog, DialogTitle, DialogContent, Link, Divider, TextField, MenuItem, CircularProgress, Drawer } from "@mui/material";
import { Search, Close, ArrowBack } from "@mui/icons-material";
import { getSocios, changeStatus } from "../api/socios";
import Logo from "../assets/logoHorizontal.png";

const GestionSocios = () => {
    // Estados para la tabla y búsqueda
    const [socios, setSocios] = useState([]);
    const [filteredSocios, setFilteredSocios] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const [showtoas, setShowtoas] = useState(false);

    // Estados de modal de detalles
    const [openDetailsModal, setOpenDetailsModal] = useState(false);
    const [selectedOne, setSelectedOne] = useState(null);

    useEffect(() => {
        const fetchSocios = async () => {
        try {
            const response = await getSocios(); // Use the imported API function
            const newData = response.data.result;

            if (JSON.stringify(newData) !== JSON.stringify(socios)) {
                setSocios(newData);
                setFilteredSocios(newData);

                if (!showtoas && !localStorage.getItem('toastShown')) {
                    toast.success("Nuevos datos cargados");
                    setShowtoas(true);
                    localStorage.setItem('toastShown', 'true');  // Marcar que ya se mostró el toast
                }
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            if (!showtoas && !localStorage.getItem('toastShown')) {
                toast.error("Error al cargar los socios.");
                setShowtoas(true);
                localStorage.setItem('toastShown', 'true');  // Marcar que ya se mostró el toast
            }
        }
    };

    fetchSocios();
        const interval = setInterval(fetchSocios, 5000);

        return () => clearInterval(interval);
    }, [socios]);


    // Filtrar socios
    useEffect(() => {
        let filtered = socios.filter((socio) =>
            socio.nombreRepresentante.toLowerCase().includes(searchQuery.toLowerCase())
            || socio.nombreEstablecimiento?.toLowerCase().includes(searchQuery.toLowerCase())
            || socio.apellidosRepresentante.toLowerCase().includes(searchQuery.toLowerCase())

        );

        if (statusFilter !== "all") {
            filtered = filtered.filter(
            (socio) => socio.estado === (statusFilter === "active")
            );
        }

        setFilteredSocios(filtered);
    }, [searchQuery, statusFilter, socios]);


    // Manejadores de paginación
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
    const [selectedSocio, setSelectedSocio] = useState(null);

      // Función para abrir el modal de confirmación
    const handleOpenStatusModal = (socio) => {
        setSelectedSocio(socio);
        setOpenStatusModal(true);
    };

    // Función para cerrar el modal de confirmación
    const handleCloseStatusModal = () => {
        setOpenStatusModal(false);
        setSelectedSocio(null);
    };

    // Función para cambiar el estado
    const handleChangeStatus = async () => {
        try {
            if(!selectedSocio) return;

            const response = await changeStatus(selectedSocio.id);

            if (response.type === "SUCCESS") {
                toast.success(response.text);
                // Actualizar el estado local
                setSocios(
                    socios.map((cat) =>
                    cat.id === selectedSocio.id
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
                        <option value="active">Revisados</option>
                        <option value="inactive">Pendientes</option>
                    </select>
                </Box>
            </Box>
            {/* Título y botón de Agregar */}
            <Box sx={{marginBottom: '10px', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{align:'left', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 30, color: '#25316D'}}>Socios</Typography>
            </Box>
            {/* Tabla de gestón de socios */}
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
                                {["#", "Nombre del Establecimiento", "Telefono", "Nombre del Representante", "Producto", "Ubicación", "Estado", "Detalles"].map((header) => (
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
                            {filteredSocios
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((socio) => (
                                    <TableRow key={socio.id} sx={{'&:hover': { backgroundColor: '#f5f5f5' },transition: 'background-color 0.3s'}}>
                                        <TableCell sx={{textAlign: 'center'}}>{socio.id}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{socio.nombreEstablecimiento}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{socio.telefono}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{socio.nombreRepresentante} {socio.apellidosRepresentante}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{socio.producto}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{socio.ubicacion}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>
                                            <Chip 
                                                label={socio.estado ? 'Revisado' : 'Pendiente'}
                                                color={socio.estado ? 'success' : 'default'}
                                                size="small"
                                                onClick={() => handleOpenStatusModal(socio)}
                                                sx={{cursor: 'pointer'}}
                                            />
                                        </TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>
                                            <Button variant="contained" onClick={() => handleOpenModal(socio)} 
                                                sx={{
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
                        count={filteredSocios.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>

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
                    <Typography variant="h6" sx={{color:'#25316D', fontWeight:'bold', paddingBottom: 1}}>¿Deseas cambiar el estado de revisión?</Typography>
                    <Typography variant="body1" sx={{color: 'black', fontStyle: 'italic', paddingBottom: 2}}>
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
                            <li>Negocio: {selectedOne.nombreEstablecimiento}</li>
                            <li>Teléfono: {selectedOne.telefono}</li>
                            <li>Nombre del representante: {selectedOne.nombreRepresentante} {selectedOne.apellidosRepresentante}</li>
                            <li>Producto: {selectedOne.producto}</li>
                            <li>Ubicación: {selectedOne.ubicacion}</li>
                        </ul>
                    </Box>
                </Box>
                </>
            )}
            </Drawer>
        <ToastContainer />
        </Box>
    );
}

export default GestionSocios;