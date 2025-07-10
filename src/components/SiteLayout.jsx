import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

const SiteLayout = () => {
    return (
        <div className="site-layout">
            <Navbar />
            <main>
                <Outlet />
            </main>
        </div>
    );
}

export default SiteLayout;