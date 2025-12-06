// src/pages/Services.jsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";                  // axios instance (api.get)
import ProductCard from "../components/ProductCard";
import services from "../data/servicesData";

export default function Services() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;
    async function load() {
      setLoading(true);
      setError("");
      try {
        // Si tu backend devuelve {results: [...]}, tomamos ese arreglo,
        // si no, asumimos que devuelve un array directamente.
        const { data } = await api.get("/products/");
        const list = Array.isArray(data) ? data : (data?.results ?? []);
        if (isMounted) setProducts(list);
      } catch {
        if (isMounted) setError("No se pudo conectar al backend. (Se puede usar seed_demo)");
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    load();
    return () => { isMounted = false; };
  }, []);

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-extrabold text-white">Servicios</h1>

      {/* Grid de servicios estáticos */}
      <section className="mt-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((s) => (
            <article
              key={s.slug}
              className="p-3 rounded-2xl bg-white shadow hover:shadow-lg transition"
            >
              {s.img && (
                <img
                  src={s.img}
                  alt=""
                  className="w-full h-36 object-cover rounded-xl"
                />
              )}
              <h3 className="text-lg font-bold mt-3">{s.title}</h3>
              <p className="text-sm text-gray-600">{s.desc}</p>
              <Link
                to={s.path}
                className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl border border-orange-500 text-orange-600 hover:bg-orange-50"
              >
                Saber más →
              </Link>
            </article>
          ))}
        </div>
      </section>

      {/* Productos del backend (opcional) */}
      <section className="mt-12 text-white">
        <h2 className="text-xl font-bold mb-4">Productos</h2>
        {loading && <p>Cargando…</p>}
        {error && <p className="text-orange-400">{error}</p>}
        {!loading && !error && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id ?? p.slug} product={p} />
            ))}
            {products.length === 0 && (
              <p className="text-sm text-gray-300">Sin productos para mostrar.</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

