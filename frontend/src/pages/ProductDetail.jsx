import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import  api  from "../lib/api";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try { setProduct(await api.getProduct(id)); }
      catch { setProduct({ id, name: "Servicio Demo", description: "Descripción de ejemplo.", price: 1000000 }); }
      finally { setLoading(false); }
    })();
  }, [id]);

  if (loading) return <main className="text-white p-6">Cargando…</main>;
  if (!product) return <main className="text-white p-6">No encontrado</main>;

  const total = product.price * qty;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 text-white">
      <Link to="/servicios" className="text-sm text-orange-400">← Volver a servicios</Link>
      <div className="grid md:grid-cols-2 gap-8 mt-4">
        <div className="rounded-2xl bg-white/5 border border-white/10 aspect-video" />
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <p className="text-white/80 mt-2">{product.description}</p>
          <div className="mt-4 flex items-center gap-3">
            <label className="text-sm">Cantidad:</label>
            <input type="number" min={1} value={qty} onChange={(e)=>setQty(parseInt(e.target.value||"1"))} className="w-20 px-2 py-1 rounded-lg text-black" />
          </div>
          <div className="mt-4 font-bold text-orange-400 text-xl">${total.toLocaleString()}</div>
          <div className="mt-6 flex gap-3">
            <button className="px-4 py-2 rounded-xl bg-orange-500 text-white" onClick={() => navigate(`/checkout?product=${product.id}&amount=${total}`)}>
              Comprar ahora
            </button>
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-bold">Descripción del producto</h2>
        <p className="text-white/80 mt-2">{product.description || "Servicio profesional con soporte y garantía."}</p>
      </section>
    </main>
  );
}
