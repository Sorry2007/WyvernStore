import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  // Estados para los campos del formulario y mensajes de error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Valida que la contraseña cumpla los requisitos de seguridad
  const validatePassword = (password: string) => {
    // Al menos una mayúscula, una minúscula, un número y mínimo 8 caracteres
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(password);
  };

  // Maneja el envío del formulario de registro
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Valida la contraseña antes de crear el usuario
    if (!validatePassword(password)) {
      setError("La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número.");
      return;
    }

    try {
      // Crea el usuario en Firebase Authentication
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/dashboard"); // Redirige al panel principal
    } catch (err: any) {
      setError(err.message); // Muestra errores si el registro falla
    }
  };

  return (
    // Diseño centrado con fondo en gradiente
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-700">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Crear Cuenta</h2>

        {/* Formulario de registro */}
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
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

          {/* Botón de registro */}
          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-md transition-all"
          >
            Registrarse
          </button>
        </form>

        {/* Enlace al login */}
        <p className="text-center text-gray-600 mt-4 text-sm">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
