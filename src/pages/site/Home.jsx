import React, { useEffect} from "react";
import Navbar from "../../components/Navbar";

const Home = () => {
useEffect(() => {
    console.log("Home se está renderizando");
  }, []);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>¡Hola desde Home!</h1>
    </div>
  );
};


export default Home;