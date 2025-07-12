import { Route, Routes } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import Home from "../pages/site/Home";
import Socios from "../pages/site/Socios";
import Login from "../pages/site/Login";
import Repartidores from "../pages/site/Repartidores";
import RepartidorForm from "../pages/site/RepartidorForm";

export const SiteRoutesConfig = () => {
    return (
        <Routes>
            <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/socios" element={<Socios />} />
                <Route path="/repartidores" element={<Repartidores />} />
                <Route path="/afiliacion-repartidor" element={<RepartidorForm />} />
                <Route path="/login" element={<Login />} />   
            </Route>
        </Routes>
    );
}