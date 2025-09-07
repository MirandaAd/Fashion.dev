export default function ProductCard({ producto }) {
  return (
    <div className="border rounded-xl shadow p-4 hover:shadow-lg transition">
      <img
        src={producto.imagenUrl}
        alt={producto.nombre}
        className="w-full h-48 object-cover rounded-lg"
      />
      <h3 className="text-lg font-semibold mt-2">{producto.nombre}</h3>
      <p className="text-gray-600">${producto.precio}</p>
      <a
        href={`/productos/${producto._id}`}
        className="text-blue-500 hover:underline mt-2 inline-block"
      >
        Detalles del producto
      </a>
    </div>
  );
}
