import { useEffect, useState } from "react";
import { getProfile } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user, logout } = useAuth();
  const [fresh, setFresh] = useState(user);

  useEffect(() => {
    if (!user) return;
    // refresca datos desde el backend
    getProfile().then(setFresh).catch(() => {});
  }, [user]);

  if (!fresh) return <div style={{padding:16}}>Cargando perfil…</div>;

  return (
    <div style={{maxWidth:640, margin:"40px auto"}}>
      <h1>Mi perfil</h1>
      <p><b>Nombre:</b> {fresh.name}</p>
      <p><b>Correo:</b> {fresh.email}</p>
      <button onClick={logout} style={{marginTop:12}}>Cerrar sesión</button>
    </div>
  );
}
