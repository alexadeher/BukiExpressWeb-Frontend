import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SystemRoutesConfig } from "./SystemRoutesConfig";
import { SiteRoutesConfig } from "./SiteRoutesConfig";
import NotFoundPage from "../pages/NotFoundPage";

export const RoutesConfig = () => {
    const { user } = useContext(AuthContext);
    console.log("Usuario:",user);

    return user ? <SystemRoutesConfig /> : <SiteRoutesConfig />;
};