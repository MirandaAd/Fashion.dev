import { useEffect, useState } from "react";
import api from "../lib/api";
import ProductCard from "../components/ProductCard";

export default function Catalogo() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    api.get("/productos").then((res) => setProductos(res.data));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Fashion.Dev - Productos de Moda </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {productos.map((prod) => (
          <ProductCard key={prod._id} producto={prod} />
        ))}
      </div>
    </div>
  );
}
