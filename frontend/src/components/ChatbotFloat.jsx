// src/components/ChatbotFloat.jsx
import { useEffect, useRef, useState } from "react";
import { Send, X } from "lucide-react"; // quitamos Bot para no dejar import sin usar
import api from "../lib/api";

export default function ChatbotFloat() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hola 👋 Soy tu asistente IA de TQSoft. ¿En qué te ayudo?" }
  ]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  async function send() {
    const text = input.trim(); if (!text) return;
    setMessages(m => [...m, { role: "user", text }]); setInput("");
    const t = text.toLowerCase();

    // Respuestas rápidas locales
    if (t.includes("precio") || t.includes("pago")) {
      return setMessages(m => [...m, { role: "bot", text: "Aceptamos Nequi y Daviplata al 3108157335. ¿Qué servicio te interesa?" }]);
    }
    if (t.includes("curso")) {
      return setMessages(m => [...m, { role: "bot", text: "Cursos básicos: Desarrollo, Ciberseguridad, Redes y Análisis de Datos. Ve a /cursos para iniciar." }]);
    }

    // Chat backend
    try {
      const data = await api.chat(text);
      setMessages(m => [...m, { role: "bot", text: data.reply || "Listo, te ayudo con eso." }]);
    } catch {
      setMessages(m => [...m, { role: "bot", text: "Estoy en modo offline. Prueba con: precios, cursos, soporte, portafolio." }]);
    }
  }

  return (
    <>
      {/* Botón flotante: figurita + globito ¡HOLA! en naranja */}
      <button
        onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-50 p-0 bg-transparent hover:scale-105 transition"
        aria-label="Abrir chatbot"
      >
        <div className="relative w-14 h-14">
          {/* Globito ¡HOLA! (SVG simple) */}
          <svg
            className="absolute -top-3 -left-6"
            width="58" height="26" viewBox="0 0 58 26" aria-hidden="true"
          >
            {/* bocadillo */}
            <rect x="1" y="1" rx="6" ry="6" width="48" height="18" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
            <polygon points="20,19 26,19 22.5,25" fill="#ffffff" stroke="#f97316" strokeWidth="2" />
            {/* texto */}
            <text x="25" y="13" textAnchor="middle" dominantBaseline="central"
                  fontSize="10" fontWeight="800" fill="#f97316">¡HOLA!</text>
          </svg>

          {/* Figurita del robot (SVG, tonos naranja) */}
          <svg viewBox="0 0 128 128" className="w-14 h-14 drop-shadow" aria-hidden="true">
            {/* cabeza */}
            <circle cx="64" cy="64" r="40" fill="#FFE7D6" stroke="#f97316" strokeWidth="6"/>
            {/* orejas */}
            <circle cx="28" cy="68" r="9" fill="#f97316" />
            <circle cx="100" cy="68" r="9" fill="#f97316" />
            {/* antena */}
            <line x1="64" y1="20" x2="64" y2="30" stroke="#f97316" strokeWidth="6" strokeLinecap="round"/>
            <circle cx="64" cy="16" r="6" fill="#f97316"/>
            {/* visor */}
            <rect x="44" y="54" width="40" height="18" rx="9" fill="#111827" />
            <circle cx="56" cy="63" r="4" fill="#f59e0b"/>
            <circle cx="64" cy="63" r="4" fill="#f59e0b"/>
            <circle cx="72" cy="63" r="4" fill="#f59e0b"/>
            {/* sonrisa */}
            <path d="M50 80 Q64 90 78 80" fill="none" stroke="#f97316" strokeWidth="5" strokeLinecap="round"/>
          </svg>
        </div>
      </button>

      {/* Ventana del chat */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-black/10 overflow-hidden">
          <div className="p-3 bg-black text-white flex items-center gap-2">
            <div className="font-semibold">Asistente TQSoft</div>
            <button className="ml-auto" onClick={() => setOpen(false)} aria-label="Cerrar"><X /></button>
          </div>

          <div className="p-3 h-72 overflow-y-auto space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "text-right" : "text-left"}>
                <div className={`inline-block px-3 py-2 rounded-2xl ${m.role === "user" ? "bg-orange-100" : "bg-gray-100"}`}>
                  {m.text}
                </div>
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div className="p-3 flex gap-2">
            <input
              value={input}
              onChange={(e)=>setInput(e.target.value)}
              onKeyDown={(e)=> e.key === "Enter" && send()}
              placeholder="Escribe tu mensaje…"
              className="flex-1 border rounded-xl px-3 py-2"
            />
            <button onClick={send} className="px-3 py-2 rounded-xl bg-orange-500 text-white">
              <Send className="w-4 h-4"/>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
