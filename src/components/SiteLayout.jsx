import Navbar from "./Navbar.jsx";
import SiteFooter from "./SiteFooter.jsx";
import React from "react";
import { Outlet, useLocation } from "react-router-dom";

const SiteLayout = () => {
    const location = useLocation();

    // Rutas que no deben mostrar Navbar ni Footer
    const noLayoutRoutes = [
        "/login", "/registro", "/*"
    ];

    const hideLayout = noLayoutRoutes.includes(location.pathname);

    return (
        <div className="site-layout">
            {!hideLayout && <Navbar />}
            <main>
                <Outlet />
            </main>
            {!hideLayout && <footer><SiteFooter /></footer>}
        </div>
    );
}

export default SiteLayout;