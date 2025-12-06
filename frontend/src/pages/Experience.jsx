export default function Experience() {
  const items = [
    { role: "Desarrollador Freelance", time: "2024 - Actual", desc: "Sitios web para PyMEs y dashboards." },
    { role: "Auditoría de Seguridad", time: "2024", desc: "OWASP ZAP y recomendaciones." },
  ];
  return (
    <main className="max-w-4xl mx-auto px-4 py-10 text-white">
      <h1 className="text-2xl font-bold">Experiencia</h1>
      <div className="mt-6 space-y-4">
        {items.map((it, i)=>(
          <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="font-semibold">{it.role}</div>
            <div className="text-sm text-white/70">{it.time}</div>
            <p className="text-sm text-white/80 mt-1">{it.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
