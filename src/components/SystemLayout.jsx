
import { useState } from "react"
import { Outlet } from "react-router-dom"
import Sidebar from "../components/SideBar.jsx"
import "../App.css"
import { Menu } from "lucide-react"
import useMediaQuery from "../hooks/useMediaQuery"

const SystemLayout = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const [showSidebar, setShowSidebar] = useState(!isMobile)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  return (
    <div className="app-container">
      {/* Sidebar - solo visible si showSidebar es true */}
      {showSidebar && <Sidebar onClose={() => isMobile && setShowSidebar(false)} />}

      <div className="content">
        {/* Botón de hamburguesa para mostrar/ocultar el sidebar en móviles */}
        {isMobile && (
          <button className="mobile-menu-button" onClick={toggleSidebar} aria-label="Toggle menu">
            <Menu size={24} />
          </button>
        )}
        <Outlet />
      </div>
    </div>
  )
}

export default SystemLayout;