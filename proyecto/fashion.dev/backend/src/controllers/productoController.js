import Producto from "../models/Producto.js";

// Listar todos los productos
export const getProductos = async (req, res) => {
  const productos = await Producto.find().populate("vendedorId", "username email");
  res.json(productos);
};

// Obtener detalle de un producto
export const getProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id).populate("vendedorId", "username email");
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });
    res.json(producto);
  } catch (err) {
    res.status(400).json({ message: "ID inválido" });
  }
};

// Crear producto (requiere login)
export const createProducto = async (req, res) => {
  try {
    const producto = new Producto({ ...req.body, vendedorId: req.user.id });
    const saved = await producto.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error al crear producto", error: err });
  }
};

// Actualizar producto
export const updateProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    // Solo dueño o admin
    if (producto.vendedorId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "No autorizado" });
    }

    const updated = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar producto" });
  }
};

// Eliminar producto
export const deleteProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) return res.status(404).json({ message: "Producto no encontrado" });

    if (producto.vendedorId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: "No autorizado para eliminar este producto" });
    }

    await producto.remove();
    res.json({ message: "Producto eliminado" });
  } catch (err) {
    res.status(400).json({ message: "Error al eliminar producto" });
  }
};
