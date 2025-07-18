import React, { useState, useEffect }from "react";
import { Search } from "@mui/icons-material";
import { Box, Paper, Table, TableContainer, TableHead, TableCell, TableRow, Typography, TableBody, Chip, Button, TablePagination } from "@mui/material";

const GestionRepartidores = () => {

    const [repartidores, setRepartidores] = useState([]);
    const [filteredRepartidores, setFilteredRepartidores] = useState([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    useEffect(() => {
        let filtered = repartidores.filter((repartidor) =>
            repartidor.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        );

        if (statusFilter !== "all") {
            filtered = filtered.filter(
            (repartidor) => repartidor.estado === (statusFilter === "active")
            );
        }

        setFilteredRepartidores(filtered);
    }, [searchQuery, statusFilter, repartidores]);

      // Manejadores de paginación
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

      // Manejadores del modal de estado
    const handleOpenStatusModal = (categoria) => {
        setSelectedCategoria(categoria);
        setOpenStatusModal(true);
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
            {/* Título */}
            <Box sx={{marginBottom: '10px', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <Typography variant="h5" sx={{align:'left', fontFamily: 'sans-serif', fontWeight: 'bold', fontSize: 30, color: '#25316D'}}>Repartidores</Typography>
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
                                {["#", "Nombre", "Edad", "Ubicación", "Motocicleta", "Mochila", "Trabajo", "Estado", "Detalles"].map((header) => (
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
                            {filteredRepartidores
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((repartidor) => (
                                    <TableRow key={categoria.id} sx={{'&:hover': { backgroundColor: '#f5f5f5' },transition: 'background-color 0.3s'}}>
                                        <TableCell sx={{textAlign: 'center'}}>{repartidor.id}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{repartidor.nombre}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{repartidor.edad}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{repartidor.ubicacion}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{repartidor.moto}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{repartidor.mochila}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>{repartidor.trabajo}</TableCell>
                                        <TableCell sx={{textAlign: 'center'}}>
                                            <Chip 
                                                label={repartidor.estado ? 'Activo' : 'Inactivo'}
                                                color={repartidor.estado ? 'success' : 'default'}
                                                size="small"
                                                onClick={() => handleOpenStatusModal(repartidor)}
                                                sx={{cursor: 'pointer'}}
                                            />
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
                        count={filteredRepartidores.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </TableContainer>
            </Box>
        </Box>
    );
}
export default GestionRepartidores;