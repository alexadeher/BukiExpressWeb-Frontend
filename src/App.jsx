import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from "./components/SideBar.jsx";
import Repartidores from "../src/system/pages/Repartidores.jsx";
import Home from "../src/system/pages/Homee";
import "../src/styles/Sidebar.css";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Sidebar />
          <main className="content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/repartidores" element={<Repartidores />} />
            </Routes>
          </main>
        </div>
      </Router>
    </>
  )
}

export default App;