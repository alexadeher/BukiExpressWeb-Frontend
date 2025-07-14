import { Route, Routes } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import Home from "../pages/site/Home";
import Socios from "../pages/site/Socios";
import Login from "../pages/site/Login";
import Registro from "../pages/site/Registro";
import Repartidores from "../pages/site/Repartidores";
import RepartidorForm from "../pages/site/RepartidorForm";
import NotFoundPage from "../pages/NotFoundPage";

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
                <Route path="/registro" element={<Registro />} />
                <Route path="*" element={<NotFoundPage />} />
            </Route>
        </Routes>
    );
}