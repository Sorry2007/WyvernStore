import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  const { user } = useAuth(); // Se obtiene el usuario actual del contexto

  return (
    <Routes>
      {/* Redirige la ruta raíz al login */}
      <Route path="/" element={<Navigate to="/login" />} />

      {/* Rutas públicas */}
      <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />

      {/* Ruta privada protegida */}
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
