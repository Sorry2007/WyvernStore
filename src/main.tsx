import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Estilos globales (Tailwind)
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext"; // Contexto global de autenticación

// Punto de entrada principal de la aplicación
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* Router para navegación entre páginas */}
    <BrowserRouter>
      {/* Proveedor del contexto de autenticación */}
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
