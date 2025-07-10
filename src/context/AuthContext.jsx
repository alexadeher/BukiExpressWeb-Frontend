import React, { createContext, useState } from "react";

// Creamos el contexto
export const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  // Puedes cambiar esto a null si quieres simular que no hay sesión iniciada
  const [user, setUser] = useState(null); // ← null = rutas públicas, objeto = rutas privadas

  const [error, setError] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser, error, setError }}>
      {children}
    </AuthContext.Provider>
  );
};
