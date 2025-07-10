import { Route, Routes } from "react-router-dom";
import SiteLayout from "../components/SiteLayout";
import Home from "../pages/site/Home";
import Login from "../pages/site/Login";

export const SiteRoutesConfig = () => {
    return (
        <Routes>
            <Route element={<SiteLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />   
            </Route>
        </Routes>
    );
}