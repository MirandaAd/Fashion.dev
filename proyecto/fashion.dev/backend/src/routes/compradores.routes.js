import { Router } from "express";
import Comprador from "../models/CompradorModel.js";

const router = Router();

// Crear comprador
router.post('/', async (req, res) => {
  try {
    const nuevoComprador = new Comprador(req.body);
    const compradorGuardado = await nuevoComprador.save();
    res.status(201).json(compradorGuardado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Obtener todos los compradores
router.get('/', async (req, res) => {
  try {
    const compradores = await Comprador.find();
    res.status(200).json(compradores);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Modificar comprador
router.put('/:id', async (req, res) => {
  try {
    const compradorActualizado = await Comprador.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(compradorActualizado);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Eliminar comprador
router.delete('/:id', async (req, res) => {
  try {
    await Comprador.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Comprador eliminado" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;