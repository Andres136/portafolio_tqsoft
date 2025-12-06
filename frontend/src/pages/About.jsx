import { Link } from "react-router-dom";
import hero from "../assets/about-bg.jpg";

export default function About() {
  const STUDIES = [
    {
      title: "Tecnólogo en Análisis y Desarrollo de Sistemas de Información (ADSI)",
      org: "SENA",
      when: "Finalizado",
      desc: "Bases sólidas en análisis, diseño, desarrollo de software y bases de datos.",
    },
    {
      title: "Análisis de Datos (Talento Tech)",
      org: "Universidad Sergio Arboleda",
      when: "Finalizado",
      desc: "KPIs, ETL, análisis y visualización para toma de decisiones.",
    },
    {
      title: "Ingeniería de Sistemas",
      org: "CUN (Corporación Unificada Nacional)",
      when: "Actual — 8.º semestre (homologación)",
      desc: "Formación en ingeniería, arquitectura, redes y proyectos de software.",
    },
  ];

  const CERTS = [
    {
      title: "Ruta de Ciberseguridad",
      org: "Cisco Networking Academy",
      when: "En progreso / completada por módulos",
      desc: "Incluye cursos como Introducción a la Seguridad, Seguridad en Terminales y Hacking Ético.",
    },
    {
      title: "ISO 27001 / SGSI",
      org: "Formación académica",
      when: "Finalizado",
      desc: "Fundamentos de gestión de seguridad de la información y controles.",
    },
    {
      title: "Gestión de amenazas y vulnerabilidades",
      org: "Formación académica",
      when: "Finalizado",
      desc: "Clasificación, evaluación de riesgos, mitigación y buenas prácticas.",
    },
  ];

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
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />

      {/* Contenido */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-start text-white">
        {/* Columna izquierda */}
        <div className="md:sticky md:top-24">
          <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
            Construyo software{" "}
            <span className="text-orange-400">seguro</span> que impulsa tu negocio
          </h1>

          <p className="mt-4 text-lg text-white/90">
            Soy <b>Andres Tique (TQSoft)</b>: full-stack con enfoque en
            ciberseguridad, redes y análisis de datos. Convierto ideas en
            soluciones robustas, escalables y protegidas desde el diseño.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/portafolio"
              className="px-5 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 font-semibold shadow-lg shadow-orange-500/30 transition"
            >
              Ver Portafolio
            </Link>

            <a
              href="#formacion"
              className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/30"
            >
              Ver formación
            </a>
          </div>

          {/* Píldoras */}
          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-white/90">
            <li className="bg-white/10 rounded-xl p-3 border border-white/20">
              ADSI + Ingeniería de Sistemas (CUN)
            </li>
            <li className="bg-white/10 rounded-xl p-3 border border-white/20">
              Cisco Cybersecurity (NetAcad)
            </li>
            <li className="bg-white/10 rounded-xl p-3 border border-white/20">
              Django/DRF + React/Vite
            </li>
            <li className="bg-white/10 rounded-xl p-3 border border-white/20">
              ISO 27001 · Amenazas/Riesgos
            </li>
          </ul>
        </div>

        {/* Columna derecha: Timeline */}
        <div id="formacion" className="bg-black/60 backdrop-blur rounded-2xl p-6 shadow-xl border border-white/10">
          <p className="font-semibold text-lg">Formación académica & certificaciones</p>
          <p className="text-sm text-white/70">
            Línea de tiempo de mi formación (academia + certificaciones).
          </p>

          {/* Timeline: Estudios */}
          <div className="mt-6">
            <h2 className="text-sm font-bold text-orange-300 uppercase tracking-wider">
              Estudios
            </h2>

            <ol className="mt-4 relative border-l border-white/15 pl-5 space-y-5">
              {STUDIES.map((it, idx) => (
                <li key={idx} className="relative">
                  <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-orange-500 shadow shadow-orange-500/30" />
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">{it.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80">
                        {it.when}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 mt-1">{it.org}</p>
                    <p className="text-sm text-white/85 mt-3">{it.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Timeline: Certificados */}
          <div className="mt-8">
            <h2 className="text-sm font-bold text-orange-300 uppercase tracking-wider">
              Certificaciones / cursos
            </h2>

            <ol className="mt-4 relative border-l border-white/15 pl-5 space-y-5">
              {CERTS.map((it, idx) => (
                <li key={idx} className="relative">
                  <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-white/70 shadow" />
                  <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">{it.title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 border border-white/15 text-white/80">
                        {it.when}
                      </span>
                    </div>
                    <p className="text-sm text-white/70 mt-1">{it.org}</p>
                    <p className="text-sm text-white/85 mt-3">{it.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/certificaciones"
              className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-sm font-semibold"
            >
              Ver certificados
            </Link>
            <Link
              to="/contacto"
              className="px-4 py-2 rounded-xl border border-white/30 bg-white/10 hover:bg-white/20 text-sm"
            >
              Contacto
            </Link>
          </div>

          <p className="mt-4 text-xs text-white/60">
            * Si quieres, puedo agregar “IDs de credenciales” o links de verificación cuando los tengas.
          </p>
        </div>
      </div>
    </section>
  );
}
