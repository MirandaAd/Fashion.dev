import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getProfile, logout as doLogout } from "../services/authService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const u = localStorage.getItem("user");
    return u ? JSON.parse(u) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setLoading(false); return; }
    // intenta refrescar datos del perfil
    getProfile().then(setUser).catch(() => {
      doLogout();
      setUser(null);
    }).finally(() => setLoading(false));
  }, []);

  const value = useMemo(() => ({
    user,
    setUser,
    logout: () => { doLogout(); setUser(null); },
  }), [user]);

  if (loading) return <div style={{padding:16}}>Cargando sesión…</div>;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth debe usarse dentro de <AuthProvider>");
  return ctx;
}