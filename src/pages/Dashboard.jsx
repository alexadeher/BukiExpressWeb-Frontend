"use client";
import React, { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import { contarSocios } from "../api/socios";
import { Box, Card, CardContent, Typography } from "@mui/material";

const Dashboard = () => {

    const [repartidores, setRepartidores] = useState([]);
    const [filteredRepartidores, setFilteredRepartidores] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("active");

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

    const [totalSocios, setTotalSocios] = useState(0);

    useEffect(() => {
        const fetchTotalSocios = async () => {
        try {
            const total = await contarSocios();
            setTotalSocios(total);
        } catch (error) {
            console.error("Error al obtener el total de socios:", error);
        }
        };

        fetchTotalSocios();
    }, []);

    return (
        <Box >
            <Box sx={{display: 'flex', justifyContent: 'start', marginBottom: '10px', alignItems: 'center', position: 'sticky', 
                top: 0, backgroundColor: 'white', zIndex: 1, padding: '10px 20px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)'}}>
                {/*Barra de busqueda y filtro*/} 
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
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 2,
                    padding: '2rem'
                }}
                >
                <Card sx={{ padding: '2rem', minWidth: 275, textAlign: 'center', backgroundColor: '#EFF8FF', boxShadow: 2 }}>
                    <CardContent>
                    <Typography sx={{ color: '#FF9149', fontWeight: 'bold' }} variant="h5">
                        Total de Socios Registrados
                    </Typography>
                    <Typography sx={{ color: '#FF9149', fontWeight: 'bold' }} variant="h3">
                        {totalSocios}
                    </Typography>
                    </CardContent>
                </Card>
                <Card sx={{ padding: '2rem', minWidth: 275, textAlign: 'center', backgroundColor: '#FFF1E6', boxShadow: 2 }}>
                    <CardContent>
                    <Typography sx={{ color: '#FF9149', fontWeight: 'bold' }} variant="h5">
                        Total de Repartidores Registrados
                    </Typography>
                    <Typography sx={{ color: '#FF9149', fontWeight: 'bold' }} variant="h3">
                        {/*totalRepartidores*/}
                        2
                    </Typography>
                    </CardContent>
                </Card>
            </Box>
        </Box>
    );
};

export default Dashboard;