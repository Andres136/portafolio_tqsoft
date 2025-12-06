// src/context/AuthContext.jsx
import { createContext, useContext, useState } from "react";
import api from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Cargamos usuario desde localStorage al iniciar
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem("tq_user");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  const saveUser = (u) => {
    setUser(u);
    if (u) {
      localStorage.setItem("tq_user", JSON.stringify(u));
    } else {
      localStorage.removeItem("tq_user");
    }
  };

  // LOGIN
  // Soporta: login({ username, password }) o login("username", "password")
  const login = async (arg1, arg2) => {
    let payload;

    if (typeof arg1 === "string") {
      payload = { username: arg1, password: arg2 };
    } else {
      payload = arg1;
    }

    setLoading(true);
    try {
      const data = await api.login(payload);
      const u = data.user || data; // por si el backend manda {user: {...}}
      saveUser(u);
      return u;
    } finally {
      setLoading(false);
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      // Si tienes endpoint de logout en backend, puedes hacer:
      // await api.post("/api/auth/logout/", {});
      saveUser(null);
    } catch (e) {
      console.error("Error haciendo logout", e);
      saveUser(null);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
