import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schemas/auth";
import { login, registerUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const { register, handleSubmit, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(registerSchema) });

  const onSubmit = async ({ confirm, ...payload }) => {
    await registerUser(payload);                 // crea usuario
    const res = await login({ email: payload.email, password: payload.password }); // auto-login
    if (res.user) setUser(res.user);
    navigate("/profile");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{maxWidth:420, margin:"40px auto"}}>
      <h1>Crear cuenta</h1>

      <label>Nombre</label>
      <input {...register("name")} />
      {errors.name && <small>{errors.name.message}</small>}

      <label>Correo</label>
      <input type="email" {...register("email")} />
      {errors.email && <small>{errors.email.message}</small>}

      <label>Contraseña</label>
      <input type="password" {...register("password")} />
      {errors.password && <small>{errors.password.message}</small>}

      <label>Confirmar contraseña</label>
      <input type="password" {...register("confirm")} />
      {errors.confirm && <small>{errors.confirm.message}</small>}

      <button disabled={isSubmitting} style={{marginTop:12}}>Registrarme</button>

      <p style={{marginTop:12}}>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </form>
  );
}