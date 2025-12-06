import { Link, useLocation } from "react-router-dom";

export default function OrderSuccess() {
  const ref = new URLSearchParams(useLocation().search).get("ref");
  return (
    <main className="max-w-3xl mx-auto px-4 py-16 text-white text-center">
      <h1 className="text-3xl font-black text-orange-500">¡Pago registrado!</h1>
      <p className="mt-2">Referencia: <b>{ref}</b></p>
      <p className="mt-2 text-white/80">Hemos generado tu factura en PDF. Nuestro equipo confirmará el pago.</p>
      <Link to="/" className="mt-6 inline-block px-5 py-3 rounded-xl bg-white text-black">Volver al inicio</Link>
    </main>
  );
}
