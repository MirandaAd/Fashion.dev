import mongoose from "mongoose";

const productoSchema = new mongoose.Schema({
 nombre: {
    type: String,
    required: true,
    trim: true
 },

 descripcion: {
    type: String,
    required: true
 },

 precio: {
    type: Number,
    required: true
 },

 imagenUrl: {
    type: String,
    required: true
 },

 categoria: {
    type: String,
    enum: ["ropa", "zapatos", "relojes", "accesorios"],
    required: true
 },
 stock: {
    type: Number,
    default: 0
 },
 vendedorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
 },
});

export default mongoose.model("Producto", productoSchema);
