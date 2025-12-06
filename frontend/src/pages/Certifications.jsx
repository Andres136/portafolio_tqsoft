// src/pages/Certifications.jsx
import hero from "../assets/about-bg.jpg";

const CERTS = [
  {
    id: 1,
    name: "Introducción a la Ciberseguridad",
    org: "Cisco Networking Academy",
    year: "2024",
    area: "Ciberseguridad",
  },
  {
    id: 2,
    name: "Ciberseguridad Essentials",
    org: "Cisco Networking Academy",
    year: "2024",
    area: "Ciberseguridad",
  },
  {
    id: 3,
    name: "Seguridad en Redes",
    org: "Cisco Networking Academy",
    year: "2024",
    area: "Redes y Seguridad",
  },
  {
    id: 4,
    name: "Linux Essentials / Entornos TI",
    org: "Cisco / Plataforma académica",
    year: "2024",
    area: "Sistemas / Infraestructura",
  },
];

export default function Certifications() {
  return (
    <section
      className="relative min-h-screen"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 text-white">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Certificaciones
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Validaciones oficiales de mi formación en ciberseguridad, redes y
            desarrollo, que respaldan los servicios que ofrezco como TQSoft.
          </p>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CERTS.map((c) => (
            <article
              key={c.id}
              className="rounded-2xl border border-white/15 bg-black/55 backdrop-blur p-4"
            >
              <p className="text-xs uppercase tracking-wide text-orange-300">
                {c.area}
              </p>
              <h2 className="mt-1 text-lg font-bold text-white">
                {c.name}
              </h2>
              <p className="text-sm text-white/80 mt-1">{c.org}</p>
              <p className="text-xs text-white/60 mt-3">
                Año de obtención: <span className="font-semibold">{c.year}</span>
              </p>
            </article>
          ))}
        </div>

        <p className="mt-8 text-sm text-white/70">
          Próximamente agregaré más certificaciones (defensa en red, desarrollo
          seguro, cloud y análisis de datos) a medida que avance mi ruta de
          formación.
        </p>
      </div>
    </section>
  );
}
