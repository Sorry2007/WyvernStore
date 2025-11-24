import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  // Estados del formulario y mensajes de error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Maneja el inicio de sesión
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      // Verifica las credenciales en Firebase
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Si es correcto, redirige
    } catch (err: any) {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-700">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Iniciar Sesión</h2>

        {/* Formulario de login */}
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 border rounded-md focus:ring-2 focus:ring-indigo-500"
            required
          />

          {/* Mensaje de error */}
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}

          {/* Botón de acceso */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-all"
          >
            Iniciar sesión
          </button>
        </form>

        {/* Enlace a registro */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          ¿No tienes cuenta?{" "}
          <Link to="/register" className="text-indigo-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
