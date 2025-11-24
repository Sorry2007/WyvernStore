// Importaciones necesarias desde React y Firebase
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { auth } from "../firebase/firebaseConfig"; // Se importa la configuración de Firebase
import { onAuthStateChanged, signOut, type User } from "firebase/auth";

// Se define la estructura de datos que manejará el contexto de autenticación
interface AuthContextType {
  user: User | null; // Guarda la información del usuario autenticado
  logout: () => void; // Función para cerrar sesión
}

// Se crea el contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Proveedor de contexto que encapsula la app
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null); // Estado para el usuario actual

  // Monitorea el estado de autenticación (si hay un usuario logueado o no)
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser); // Actualiza el estado del usuario cuando cambia
    });
    return () => unsubscribe(); // Limpia el observador al desmontar
  }, []);

  // Cierra sesión del usuario actual
  const logout = () => signOut(auth);

  // Provee el contexto a todos los componentes hijos
  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acceder fácilmente al contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
