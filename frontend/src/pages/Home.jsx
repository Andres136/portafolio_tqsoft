import { Link } from "react-router-dom";
import { SERVICES } from "../data/servicesData";
import ServiceCard from "../components/ServiceCard";
import hero from "../assets/about-bg.jpg"; // 👈 misma imagen de fondo

export default function Home() {
  return (
    <div>
      {/* Hero + Reseña histórica (con el mismo fondo y overlay) */}
      <section
        className="relative min-h-screen text-orange-300"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-white">
              TQSoft: Innovación con propósito
            </h1>
            <p className="mt-4 text-orange-100">
              <strong>Reseña histórica:</strong> TQSoft nace como un laboratorio personal de
              aprendizaje y soluciones para pymes en Colombia. Desde prototipos en
              Django/React hasta servicios de ciberseguridad y redes, hemos evolucionado con
              un enfoque claro: construir software útil, seguro y eficiente que impulse
              negocios reales.
            </p>

            <div className="mt-6 flex gap-3">
              <Link to="/servicios" className="btn btn-primary">
                Ver servicios
              </Link>
              <Link to="/contacto" className="btn btn-outline">
                Hablemos
              </Link>
            </div>
          </div>

          {/* Grid de servicios destacada (se mantiene con tarjetas blancas para contraste) */}
          <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/15">
            <div className="grid grid-cols-2 gap-4">
              {SERVICES.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl p-4 shadow border border-gray-100">
                  <img src={s.img} alt={s.title} className="h-24 w-full object-cover rounded-xl" />
                  <p className="mt-2 text-sm font-semibold text-gray-800">{s.title}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Destacados */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="section-title">Servicios principales</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((s, i) => (
            <ServiceCard key={i} {...s} />
          ))}
        </div>
      </section>
    </div>
  );
}
