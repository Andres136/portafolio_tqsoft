// src/pages/Contact.jsx
import { useEffect, useMemo, useState } from "react";
import hero from "../assets/about-bg.jpg";
import api from "../lib/api";

const LABELS = {
  software: "Desarrollo de software",
  ciberseguridad: "Ciberseguridad",
  "analitica-datos": "Análisis de datos",
  "redes-inalambricas": "Redes inalámbricas",
  "java-spring": "Java + Spring Boot",
  "php-laravel": "PHP Laravel",
  "javascript-node": "JavaScript / Node.js",
  nosql: "Bases de datos NoSQL",
  "docker-devops": "Docker / DevOps",
  "azure-cloud": "Azure Cloud",
};

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [msg, setMsg] = useState("");
  const [ok, setOk] = useState("");
  const [err, setErr] = useState("");

  const serviceName = useMemo(() => LABELS[service] || "", [service]);

  useEffect(() => {
    if (serviceName && !msg) {
      setMsg(`Hola, me interesa el servicio: ${serviceName}.`);
    }
  }, [serviceName, msg]);

  async function handleSubmit(e) {
    e.preventDefault();
    setOk("");
    setErr("");
    try {
      // Guarda en tu backend (si /api/contact/ existe en tu DRF)
      await api.contact({ name, email, service: serviceName, message: msg });

      // y abre WhatsApp (opcional)
      const text = `Hola, soy ${name} (${email}).%0A` +
                   `Servicio: ${serviceName || "—"}%0A` +
                   `Mensaje: ${msg}`;
      window.open(`https://wa.me/573108157335?text=${text}`, "_blank");

      setOk("¡Mensaje enviado! Te contactaré pronto.");
      setName(""); setEmail(""); setService(""); setMsg("");
    } catch {
      setErr("No se pudo enviar el mensaje. Intenta nuevamente.");
    }
  }

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
      <div className="relative z-10 max-w-xl mx-auto px-4 py-12">
        <div className="rounded-2xl bg-black/60 border border-white/10 p-6 text-white shadow-xl">
          <h1 className="text-3xl font-extrabold text-center mb-2">Contacto</h1>
          <p className="text-white/80 text-center mb-6">
            Cuéntame tu necesidad y te respondo muy pronto.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 placeholder-white/60"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 placeholder-white/60"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <select
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-white"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="">Selecciona un servicio (opcional)</option>
              {Object.entries(LABELS).map(([k, v]) => (
                <option key={k} value={k} className="text-black">
                  {v}
                </option>
              ))}
            </select>

            <textarea
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 placeholder-white/60 resize-y"
              rows={5}
              placeholder="Mensaje"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
              required
            />

            {ok && <p className="text-green-400 text-sm">{ok}</p>}
            {err && <p className="text-red-400 text-sm">{err}</p>}

            <button
              className="w-full px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600"
              type="submit"
            >
              Enviar
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
