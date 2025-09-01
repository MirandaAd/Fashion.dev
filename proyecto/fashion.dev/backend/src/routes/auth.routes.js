import { Router } from "express";
import {
  registerComprador,
  loginComprador,
  logoutComprador,
  profileComprador
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // optional for protected routes

const router = Router();

// Register a new comprador
router.post("/register", registerComprador);

// Login comprador
router.post("/login", loginComprador);

// Logout comprador
router.post("/logout", logoutComprador);

// Get profile (protected route)
router.get("/profile", verifyToken, profileComprador);

export default router;
