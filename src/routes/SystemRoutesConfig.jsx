import { Routes, Route } from "react"

import SystemLayout from "../components/SystemLayout";
import Dashboard from "../pages/Dashboard";
import Repartidores from "../pages/GestionRepartidores";

export const SystemRoutesConfig = () => {
    console.log("Repartidores:", Repartidores);
    console.log("Dashboard:", Dashboard);
    console.log("SystemLayout:", SystemLayout);

    return (
        
        <Routes>
        <Route path="/" element={<SystemLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/repartidores" element={<Repartidores />} />
        </Route></Routes>
    );
}