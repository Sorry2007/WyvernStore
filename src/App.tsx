// src/App.tsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Páginas del proyecto
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AdminProducts from "./pages/AdminProducts";

// Contexto de autenticación
import { useAuth } from "./context/AuthContext";

const App: React.FC = () => {
  // Obtenemos el usuario autenticado desde el contexto
  const { user } = useAuth();

  return (
    <Routes>

      {/* Ruta raíz: redirecciona automáticamente al catálogo */}
      <Route path="/" element={<Navigate to="/products" />} />

      {/* Login y Register NO deben mostrarse si el usuario ya está autenticado */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      <Route
        path="/register"
        element={user ? <Navigate to="/dashboard" /> : <Register />}
      />

      {/* Dashboard: solo accesible si el usuario está autenticado */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />

      {/* Catálogo de productos (página pública) */}
      <Route path="/products" element={<Products />} />

      {/* Vista individual de un producto (pública) */}
      <Route path="/products/:id" element={<ProductDetail />} />

      {/* 
        Ruta del panel de administración  
        Solo accesible si el usuario está logueado.
        (Más adelante se puede validar roles, ej. admin)
      */}
      <Route
        path="/admin/products"
        element={user ? <AdminProducts /> : <Navigate to="/login" />}
      />

    </Routes>
  );
};

export default App;
