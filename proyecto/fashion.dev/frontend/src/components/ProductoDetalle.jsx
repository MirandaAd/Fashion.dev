import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../lib/api";

export default function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);

  useEffect(() => {
    api.get(`/productos/${id}`).then((res) => setProducto(res.data));
  }, [id]);

  if (!producto) return <p>Cargando...</p>;

  return (
    <div className="p-6">
      <img
        src={producto.imagenUrl}
        alt={producto.nombre}
        className="w-full max-w-md object-cover rounded-xl"
      />
      <h1 className="text-2xl font-bold mt-4">{producto.nombre}</h1>
      <p className="text-gray-700 mt-2">{producto.descripcion}</p>
      <p className="text-lg font-semibold mt-4">Precio: ${producto.precio}</p>
      <p className="text-sm text-gray-500">Categoría: {producto.categoria}</p>
      <p className="text-sm text-gray-500">Stock: {producto.stock}</p>
    </div>
  );
}
