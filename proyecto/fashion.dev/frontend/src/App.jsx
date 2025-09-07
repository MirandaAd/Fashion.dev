import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Catalogo from "./pages/Catalogo";
import ProductoDetalle from "./pages/ProductoDetalle";
import ProductoForm from "./pages/ProductoForm";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";

function Nav() {
  const { user, logout } = useAuth();
  return (
    <nav style={{display:"flex", gap:12, padding:12, borderBottom:"1px solid #eee"}}>
      <Link to="/">Catálogo</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      {user ? (
        <>
          <Link to="/profile">Profile</Link>
          <Link to="/productos/nuevo">Nuevo Producto</Link>
          <button onClick={logout}>Salir</button>
        </>
      ) : null}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          {/* Catálogo como Home */}
          <Route path="/" element={<Catalogo />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/productos/nuevo" element={<ProductoForm />} />
            <Route path="/productos/editar/:id" element={<ProductoForm />} />
          </Route>

          {/* Detalle de producto (pública) */}
          <Route path="/productos/:id" element={<ProductoDetalle />} />

          {/* 404 */}
          <Route path="*" element={<div style={{padding:16}}>404</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
