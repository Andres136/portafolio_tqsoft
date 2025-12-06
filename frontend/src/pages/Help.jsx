// src/pages/Help.jsx
import { useState } from "react";
import hero from "../assets/about-bg.jpg";

const WA = "https://wa.me/573108157335";

// Acordeón accesible
function QA({ q, a, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const id = q.replace(/\s+/g, "-").toLowerCase();

  return (
    <div className="rounded-2xl border border-white/15 bg-black/50 backdrop-blur p-4 text-white">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between text-left font-semibold"
        aria-expanded={open}
        aria-controls={`panel-${id}`}
      >
        <span>{q}</span>
        <span
          className={`grid place-items-center h-7 w-7 rounded-full border border-white/20 transition
                      ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>

      {open && (
        <div id={`panel-${id}`} className="mt-3 text-white/85">
          <p>{a}</p>
        </div>
      )}
    </div>
  );
}

export default function Help() {
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
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 max-w-3xl mx-auto px-4 py-12">
        <header className="mb-6">
          <h1 className="text-3xl font-extrabold text-white">Ayuda</h1>
          <p className="text-white/80">
            Preguntas frecuentes, soporte y formas de contacto.
          </p>
        </header>

        <div className="space-y-3">
          <QA
            q="¿Cómo contrato un servicio?"
            a="Entra a Servicios → elige ‘Saber más’ → pulsa ‘Solicitar servicio’. Completa el formulario o escríbenos por WhatsApp."
            defaultOpen
          />
          <QA
            q="¿Puedo pagar por Nequi o Daviplata?"
            a="Sí. Genera la referencia en ‘Checkout’ y realiza el pago al 310 815 7335. Envía el comprobante por WhatsApp para validar."
          />
          <QA
            q="¿Ofrecen asesoría técnica o mentorías?"
            a="Sí, brindamos asesoría en desarrollo, ciberseguridad, redes y análisis de datos. Escríbenos para agendar una sesión."
          />
          <QA
            q="¿Cuánto tardan en responder?"
            a="Normalmente en horas hábiles respondemos en menos de 1 hora. Si es fuera de horario, te contactaremos al siguiente día hábil."
          />
          <QA
            q="¿Dónde puedo ver proyectos reales?"
            a="Visita la sección Portafolio para ver demos, repositorios y descripciones técnicas de los proyectos."
          />
        </div>

        {/* CTA */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <a
            href={WA}
            className="px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 text-center"
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp 310-815-7335
          </a>
          <a
            href="/contacto"
            className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-center"
          >
            Formulario de contacto
          </a>
        </div>
      </div>
    </section>
  );
}
