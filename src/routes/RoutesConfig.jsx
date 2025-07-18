import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SystemRoutesConfig } from "./SystemRoutesConfig";
import { SiteRoutesConfig } from "./SiteRoutesConfig";
import Home from "../pages/Home";
import Socios from "../pages/Socios";
import Repartidores from "../pages/Repartidores";
import RepartidorForm from "../pages/RepartidorForm";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Dashboard from "../pages/Dashboard";
import GestionRepartidores from "../pages/GestionRepartidores";
import GestionSocios from "../pages/GestionSocios";
import GestionUsuarios from "../pages/GestionUsuarios";
import NotFoundPage from "../pages/NotFoundPage";
import SystemLayout from "../components/SystemLayout";
import SiteLayout from "../components/SiteLayout";

export const RoutesConfig = () => {
    const { user } = useContext(AuthContext);
    //console.log("Usuario:",user);

    return (
        <Routes>
            {user ? (
                <Route element={<SystemLayout />}>
                    <Route path="/home" element={<Dashboard />}/>
                    <Route path="/repartidores" element={<GestionRepartidores />}/>
                    <Route path="/socios" element={<GestionSocios />}/>
                    <Route path="/usuarios" element={<GestionUsuarios />}/>
                </Route>
            ) : (
                <Route element={<SiteLayout />}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />}/>
                    <Route path="/registro" element={<Registro />}/>
                    <Route path="/page-socios" element={<Socios />}/>
                    <Route path="/page-repartidores" element={<Repartidores />}/>
                    <Route path="/afiliacion-repartidor" element={<RepartidorForm />}/>
                </Route>
            )}
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
};