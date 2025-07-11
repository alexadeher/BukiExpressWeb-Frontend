import Navbar from "./Navbar.jsx";
import SiteFooter from "./SiteFooter.jsx";
import React from "react";
import { Outlet } from "react-router-dom";

const SiteLayout = () => {
    return (
        <div className="site-layout">
            <Navbar />
            <main>
                <Outlet />
            </main>
            <footer>
                <SiteFooter />
            </footer>
        </div>
    );
}

export default SiteLayout;