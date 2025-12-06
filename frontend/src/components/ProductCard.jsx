import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <div className="border border-black/10 rounded-2xl overflow-hidden bg-white hover:shadow-lg transition">
      <div className="aspect-video bg-gradient-to-br from-orange-100 to-white grid place-items-center text-orange-500 text-3xl">
        {product.image ? <img src={product.image} alt={product.name} className="object-cover w-full h-full" /> : "TQ"}
      </div>
      <div className="p-4 space-y-2">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-black/70">{product.short}</p>
        <div className="flex items-center justify-between">
          <span className="font-bold text-orange-600">${product.price.toLocaleString()}</span>
          <Link to={`/producto/${product.id}`} className="px-3 py-1 rounded-xl bg-black text-white text-sm">Saber más</Link>
        </div>
      </div>
    </div>
  );
}
