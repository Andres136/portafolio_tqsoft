import { useEffect, useMemo, useState } from "react";
import { PortfolioAPI } from "../lib/api";
import { Search, ExternalLink, Github } from "lucide-react";
import hero from "../assets/about-bg.jpg";

const CATS = ["Todos","Desarrollo de software","Ciberseguridad","Redes","Análisis de datos"];

const FALLBACK = [
  { id: 1, title: "Plataforma TQSoft", description: "Frontend Vite/React + Tailwind, backend DRF. Cursos, login y chatbot.", image_url: "", repo_url: "#", demo_url: "#", tags: "Desarrollo de software,React,DRF,Tailwind" },
  { id: 2, title: "Monitor de Seguridad Web", description: "Django + React. Escaneo OWASP ZAP/Nmap con alertas y reportes.", image_url: "", repo_url: "#", demo_url: "#", tags: "Ciberseguridad,Django,OWASP ZAP" },
  { id: 3, title: "Laboratorios de Redes", description: "VLANs, ACLs y topologías prácticas.", image_url: "", repo_url: "#", demo_url: "#", tags: "Redes,CCNA" },
  { id: 4, title: "Dashboard de Datos", description: "ETL y visualización.", image_url: "", repo_url: "#", demo_url: "#", tags: "Análisis de datos,ETL" },
];

function hasMainCategory(tags, cat){
  if (cat === "Todos") return true;
  const list = (tags || "").split(",").map(s => s.trim().toLowerCase());
  return list.includes(cat.toLowerCase());
}

export default function Portfolio() {
  const [items,setItems] = useState([]);
  const [loading,setLoading] = useState(true);
  const [q,setQ] = useState("");
  const [cat,setCat] = useState("Todos");
  const [sort,setSort] = useState("recientes");

  useEffect(()=>{
    let mounted = true;
    (async()=>{
      try{
        const data = await PortfolioAPI.list();
        if (!mounted) return;
        const allowed = data?.filter?.(p => CATS.slice(1).some(c => hasMainCategory(p.tags, c)));
        setItems(allowed?.length ? allowed : FALLBACK);
      }catch{ setItems(FALLBACK); }
      finally{ setLoading(false); }
    })();
    return ()=>{ mounted = false; };
  },[]);

  const filtered = useMemo(()=>{
    let list = [...items].filter(p => hasMainCategory(p.tags, cat));
    const k = q.trim().toLowerCase();
    if (k) list = list.filter(p =>
      p.title?.toLowerCase().includes(k) || p.description?.toLowerCase().includes(k)
    );
    if (sort==="alfabético") list.sort((a,b)=>(a.title||"").localeCompare(b.title||""));
    else list.sort((a,b)=>(b.id??0)-(a.id??0));
    return list;
  },[items,q,cat,sort]);

  return (
    <section
      className="relative min-h-screen"  /* ← cubre hasta el footer */
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/55" /> {/* overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12 text-white">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-extrabold">Portafolio</h1>
          <div className="flex items-center gap-2 bg-white/90 text-black rounded-xl px-3 py-2 w-full sm:w-80">
            <Search size={18} />
            <input
              value={q}
              onChange={e=>setQ(e.target.value)}
              placeholder="Buscar proyectos…"
              className="bg-transparent outline-none w-full"
            />
          </div>
        </div>

        {/* Filtros */}
        <div className="mt-5 flex flex-wrap gap-2">
          {CATS.map(t=>(
            <button
              key={t}
              onClick={()=>setCat(t)}
              className={`px-3 py-1 rounded-full border ${
                cat===t
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-orange-300 text-orange-100 bg-white/10 hover:bg-white/20"
              }`}
            >
              {t}
            </button>
          ))}
          <select
            value={sort}
            onChange={e=>setSort(e.target.value)}
            className="ml-auto px-3 py-1 rounded-xl border border-orange-300 text-orange-800 bg-white/90"
          >
            <option value="recientes">Más recientes</option>
            <option value="alfabético">A–Z</option>
          </select>
        </div>

        {/* Grid (sin tarjetas blancas) */}
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(loading ? Array.from({ length: 6 }) : filtered).map((p, idx) =>
            loading ? (
              <div key={idx} className="h-40 rounded-2xl animate-pulse bg-white/10" />
            ) : (
              <article
                key={p.id}
                className="rounded-2xl overflow-hidden border border-white/15 bg-transparent backdrop-blur-[2px] hover:border-orange-400/60 transition"
              >
                {p.image_url && (
                  <img src={p.image_url} alt={p.title} className="w-full h-40 object-cover opacity-90" />
                )}
                <div className="p-4">
                  <h3 className="font-bold text-white text-lg">{p.title}</h3>
                  <p className="text-sm text-white/85 mt-1">{p.description}</p>
                  <div className="mt-4 flex gap-2">
                    {p.demo_url && (
                      <a
                        href={p.demo_url}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600"
                      >
                        <ExternalLink size={16}/> Demo
                      </a>
                    )}
                    {p.repo_url && (
                      <a
                        href={p.repo_url}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl border border-orange-400 text-orange-300 hover:bg-orange-500/10"
                      >
                        <Github size={16}/> Código
                      </a>
                    )}
                  </div>
                </div>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
