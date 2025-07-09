"use client";
// Importar dependencias necesarias
import { useState, useEffect, useCallback } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Home, Person3, Groups3,  Person, FolderShared, Logout, ChevronLeft, Close } from "@mui/icons-material";
import SidebarItem from "./SidebarItem";
import useMediaQuery from "../hooks/useMediaQuery";
import LogoComponent from "./LogoComponent";
import "../styles/Sidebar.css"; 

//Definir el componente Sidebar que renderiza la barra lateral de navegación
const Sidebar = ({ onClose }) => {
    const location = useLocation();
    const currentPath = location.pathname; // 
    const [collapsed, setCollapsed] = useState(false); // Estado para controlar si el sidebar está colapsado
    const isMobile = useMediaQuery("(max-width: 768px)"); // Verifica si es un dispositivo móvil
    const navigate = useNavigate(); // Hook para navegar a otras rutas
    const [isModalOpen, setIsModalOpen] = useState(false); // Estado para controlar la apertura del modal

    // Función para alternar el estado del colapso del sidebar
    const toggleSidebar = () => {
        setCollapsed(!collapsed); // Cambia el estado de colapso
    }

    const handleMediaQueryChange = useCallback(
        (matches) => {
        if (matches) {
            setCollapsed(true);
        } else if (!isMobile) {
            setCollapsed(false);
        }
        },
        [isMobile]
    );

    // Colapsar automáticamente en pantallas medianas
    useEffect(() => {
        const mediaQuery = window.matchMedia(
        "(max-width: 1024px) and (min-width: 769px)"
        );
        handleMediaQueryChange(mediaQuery.matches);

        const listener = (event) => handleMediaQueryChange(event.matches);

        mediaQuery.addEventListener("change", listener);

        return () => {
        mediaQuery.removeEventListener("change", listener);
        };
    }, [handleMediaQueryChange, isMobile]);

    // Función para abrir el el modal de confirmación de cierre de sesión
    const openLogoutModal = () => {
        setIsModalOpen(true);
    };

    // Función para cerrar el modal de confirmación de cierre de sesión
    const closeLogoutModal = () => {
        setIsModalOpen(false);  
    }

    // Función para manejar el cierre de sesión (remover localStorage y redirigir al usuario)
    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("jwt");
        localStorage.removeItem("expiration");
        navigate("/");
        window.location.reload();
    };

    return (
        <aside className={`sidebar ${collapsed ? "collapsed" : ""} ${
        isMobile ? "mobile" : ""
        }`}>
            <div className="sidebar-header">
                {!collapsed ? (
                    <>
                        <div className="header-top">
                            <div className="logo-container">
                                <LogoComponent size="default" />
                                <span className="logo-text">Buki Express</span>
                            </div>
                            <button className="collapse-button" onClick={toggleSidebar}>
                                <ChevronLeft size={20} />
                            </button>
                        </div>
                        {isMobile && (
                        <button className="close-button" onClick={onClose}>
                            <Close size={24} />
                        </button>
                        )}
                    </>
                ) : (
                <button className="expand-button" onClick={toggleSidebar}>
                    <LogoComponent size="small" />
                </button>
                )}
            </div>
            <div className="sidebar-section">
                <h2 className="section-title">AFILIACIONES</h2>
                <nav className="nav-menu">
                    <SidebarItem 
                        icon={<Home size={20} />} 
                        text="Home" 
                        to="/" 
                        isActive={currentPath === "/home" || currentPath === "/"} 
                        collapsed={collapsed}
                        onClick={isMobile ? onClose : undefined}
                    />
                    <SidebarItem
                        icon={<Person3 size={20} />}
                        text="Repartidores"
                        to="/repartidores"
                        isActive={currentPath === "/repartidores"}
                        collapsed={collapsed}
                        onClick={isMobile ? onClose : undefined}
                    />
                    <SidebarItem
                        icon={<Groups3 size={20} />}
                        text="Socios"
                        to="/socios"
                        isActive={currentPath === "/socios"}
                        collapsed={collapsed}
                        onClick={isMobile ? onClose : undefined}
                    />
                </nav>
            </div>
            <hr className="sidebar-divider" />
            <div className="sidebar-section">
                <h2 className="section-title">SISTEMA</h2>
                <nav className="nav-menu">
                    <SidebarItem
                        icon={<Person size={20} />}
                        text="Usuarios"
                        to="/usuarios"
                        isActive={currentPath === "/usuarios"}
                        collapsed={collapsed}
                        onClick={isMobile ? onClose : undefined}
                    />
                    <SidebarItem
                        icon={<FolderShared size={20} />}
                        text="Nuevas Cuentas"
                        to="/nuevas-cuentas"
                        isActive={currentPath === "/nuevas-cuentas"}
                        collapsed={collapsed}
                        onClick={isMobile ? onClose : undefined}
                    />
                </nav>
            </div>
            <div className="sidebar-footer">
                <Link 
                    to="/#" 
                    className={`logout-button ${collapsed ? "collapsed" : ""}`}
                    onClick={openLogoutModal} // Abre el modal de confirmación de cierre de sesión
                >
                    {/* Icono de cierre de sesión */}
                    <Logout size={20} />
                    {!collapsed && <span>Salir</span>}
                </Link>
            </div>
            {isModalOpen && (
            <div className="modal-overlay">
                <div className="modal">
                    <h2
                    style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        color: "#0d47a1",
                        marginBottom: "20px",
                        textAlign: "center",
                    }}
                    >
                    ¿Deseas cerrar sesión?
                    </h2>
                    <div className="modal-actions">
                        <button onClick={handleLogout} className="confirm-button">
                            Salir
                        </button>
                        <button onClick={closeLogoutModal} className="cancel-button">
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )}
        </aside>
    );
};

export default Sidebar;