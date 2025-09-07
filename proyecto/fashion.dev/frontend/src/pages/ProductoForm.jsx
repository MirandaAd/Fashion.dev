import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import api from "../lib/api";

// ✅ Validación con Zod
const productoSchema = z.object({
  nombre: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  descripcion: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  precio: z.number().positive("El precio debe ser mayor que 0"),
  imagenUrl: z.string().url("Debe ser una URL válida"),
  categoria: z.string().nonempty("La categoría es obligatoria"),
  stock: z.number().int().nonnegative("El stock no puede ser negativo"),
});

export default function ProductoForm() {
  const { id } = useParams(); // si hay id → edición
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    imagenUrl: "",
    categoria: "",
    stock: "",
  });
  const [error, setError] = useState(null);

  // Si es edición, carga el producto
  useEffect(() => {
    if (id) {
      api.get(`/productos/${id}`).then((res) => {
        setForm(res.data);
      });
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // ✅ Validar datos con Zod
      const parsed = productoSchema.parse({
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock),
      });

      if (id) {
        // ✅ Actualizar
        await api.put(`/productos/${id}`, parsed);
        alert("Producto actualizado");
      } else {
        // ✅ Crear nuevo
        await api.post("/productos", parsed);
        alert("Producto creado");
      }

      navigate("/"); // volver al home
    } catch (err) {
      if (err.errors) {
        setError(err.errors[0].message); // mostrar primer error
      }
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        {id ? "Editar Producto" : "Crear Producto"}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          value={form.nombre}
          onChange={handleChange}
          placeholder="Nombre"
          className="w-full border rounded p-2"
        />
        <textarea
          name="descripcion"
          value={form.descripcion}
          onChange={handleChange}
          placeholder="Descripción"
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          name="precio"
          value={form.precio}
          onChange={handleChange}
          placeholder="Precio"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="imagenUrl"
          value={form.imagenUrl}
          onChange={handleChange}
          placeholder="URL de imagen"
          className="w-full border rounded p-2"
        />
        <input
          type="text"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
          placeholder="Categoría"
          className="w-full border rounded p-2"
        />
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
          className="w-full border rounded p-2"
        />
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {id ? "Actualizar" : "Crear"}
        </button>
      </form>
    </div>
  );
}
