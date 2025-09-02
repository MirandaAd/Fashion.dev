import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    const res = await login(data);                 // { token, user }
    if (res.user) setUser(res.user);
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth:380, margin:"40px auto"}}>
      <h1>Iniciar sesión</h1>

      <label>Correo</label>
      <input type="email" {...register("email")} />
      {errors.email && <small>{errors.email.message}</small>}

      <label>Contraseña</label>
      <input type="password" {...register("password")} />
      {errors.password && <small>{errors.password.message}</small>}

      <button disabled={isSubmitting} style={{marginTop:12}}>Entrar</button>

      <p style={{marginTop:12}}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </form>
  );
}