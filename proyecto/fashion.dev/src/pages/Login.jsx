import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";
import api from "../lib/api";

export default function Login() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data) => {
    const { data: res } = await api.post("/login", data);
    localStorage.setItem("token", res.accessToken);
    localStorage.setItem("user", JSON.stringify(res.user));
    navigate("/catalogo");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Iniciar sesión</h1>
      <input placeholder="Correo" type="email" {...register("email")} />
      {errors.email && <small>{errors.email.message}</small>}

      <input placeholder="Contraseña" type="password" {...register("password")} />
      {errors.password && <small>{errors.password.message}</small>}

      <button disabled={isSubmitting}>Entrar</button>
      <p>¿No tienes cuenta? <Link to="/registro">Regístrate</Link></p>
    </form>
  );
}
