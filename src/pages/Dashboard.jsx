"use client";
import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Search } from "@mui/icons-material";
import FondoDashboard from "../assets/backgroundDashboard.png"

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


    return (
        <Box >
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
            </Box>
            <Box sx={{ display: 'flex', width: '100%', height:'100vh',
                overflow: 'hidden', backgroundColor: 'white' }}>
                <Box sx={{ width: '100%', height: '100%', backgroundImage:`url(${FondoDashboard})`, backgroundSize: 'cover', 
                    backgroundPosition: 'center', backgroundRepeat: 'no-repeat', color: 'white', display: 'flex', 
                    justifyContent: 'center', alignItems: 'center', flexDirection: 'column'}} >
                    <Typography variant="h2" sx={{fontWeight: 'bold', fontSize: '50px', mb:1, color: 'white'}}>
                        Buki Express
                    </Typography>
                    <Typography variant="body1" sx={{mt: 2, fontStyle: 'italic', fontSize: '30px', color: 'white'}}>
                        Tu necesidad en tu destino
                    </Typography>
                </Box>   
            </Box>
        </Box>
    );
};

export default Dashboard;