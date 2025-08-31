import { z } from "zod";

export const registroSchema = z.object({
  name: z.string().min(2, "Nombre demasiado corto"),
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirm: z.string()
}).refine((d) => d.password === d.confirm, {
  path: ["confirm"],
  message: "Las contraseñas no coinciden"
});

export const loginSchema = z.object({
  email: z.string().email("Correo inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres")
});