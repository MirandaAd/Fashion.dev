import { Router } from "express";
import {
  registerComprador,
  loginComprador,
  logoutComprador,
  profileComprador
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // Middleware para proteger rutas

const router = Router();

// Ruta para registrar un nuevo comprador
router.post("/register", registerComprador);

// Ruta para login de comprador
router.post("/login", loginComprador);

// Ruta para logout de comprador
router.post("/logout", logoutComprador);

// Ruta para obtener perfil del comprador (protegida con middleware)
router.get("/profile", verifyToken, profileComprador);

export default router;
