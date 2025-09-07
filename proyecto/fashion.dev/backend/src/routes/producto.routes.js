import { Router } from "express";
import {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto,
} from "../controllers/productoController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

router.get("/productos", getProductos);
router.get("/productos/:id", getProducto);
router.post("/productos", authMiddleware, createProducto);
router.put("/productos/:id", authMiddleware, updateProducto);
router.delete("/productos/:id", authMiddleware, deleteProducto);

export default router;
