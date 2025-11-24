import React from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth(); // Se obtiene el usuario y la función de logout
  const navigate = useNavigate();

  // Cierra sesión y redirige al login
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">
        Bienvenido, {user?.email}
      </h1>
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-all"
      >
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;
