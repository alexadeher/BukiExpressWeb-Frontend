import { Routes, Route } from "react"
import Repartidores from "../pages/system/Repartidores.jsx";
import SystemLayout from "../components/SystemLayout.jsx";

export const SystemRoutesConfig = () => {
    return (
        <Route element={<SystemLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/repartidores" element={<Repartidores />} />
        </Route>
    );
}