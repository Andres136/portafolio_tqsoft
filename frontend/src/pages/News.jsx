// src/pages/News.jsx
import { useEffect, useMemo, useState } from "react";
import hero from "../assets/about-bg.jpg";

/** ====== Config ====== */
const CATS = ["IA", "Ciberseguridad", "Redes", "Datos", "Desarrollo"];

const FEEDS = {
  IA: [
    "https://feeds.feedburner.com/GoogleAIBlog",
    "https://www.technologyreview.com/topic/artificial-intelligence/feed/",
    "https://www.theverge.com/rss/index.xml",
  ],
  Ciberseguridad: [
    "https://feeds.feedburner.com/TheHackersNews",
    "https://krebsonsecurity.com/feed/",
    "https://www.bleepingcomputer.com/feed/",
  ],
  Redes: [
    "https://www.networkworld.com/category/networking/index.rss",
    "https://www.cisco.com/c/en/us/about/rss-feeds/networking.xml",
  ],
  Datos: ["https://www.kdnuggets.com/feed", "https://dataconomy.com/feed/"],
  Desarrollo: ["https://dev.to/feed", "https://www.smashingmagazine.com/feed/"],
};

const PROXY = (url) =>
  `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`;
const TTL_MS = 24 * 60 * 60 * 1000;

/** ====== Página ====== */
export default function News() {
  const [tab, setTab] = useState(CATS[0]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const cacheKey = useMemo(() => `news_cache_v1_${tab}`, [tab]);

  useEffect(() => {
    let dead = false;

    // cache
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      try {
        const { ts, data } = JSON.parse(cached);
        if (Date.now() - ts < TTL_MS) {
          setItems(data);
          return;
        }
      } catch {}
    }

    (async () => {
      setLoading(true);
      try {
        const feeds = FEEDS[tab] ?? [];
        const xmls = await Promise.allSettled(
          feeds.map((u) =>
            fetch(PROXY(u)).then((r) =>
              r.ok ? r.text() : Promise.reject(new Error(String(r.status)))
            )
          )
        );

        const all = [];
        for (const res of xmls) {
          if (res.status !== "fulfilled") continue;
          const doc = new DOMParser().parseFromString(res.value, "text/xml");
          const itemsRss = Array.from(doc.querySelectorAll("item"));
          const itemsAtom = Array.from(doc.querySelectorAll("entry"));
          all.push(
            ...itemsRss.map(parseRssItem).filter(Boolean),
            ...itemsAtom.map(parseAtomEntry).filter(Boolean)
          );
        }

        const filtered = filterByCategory(all, tab);
        const top = filtered
          .sort((a, b) => (b.dateMs || 0) - (a.dateMs || 0))
          .slice(0, 12);

        if (!dead) {
          setItems(top);
          localStorage.setItem(
            cacheKey,
            JSON.stringify({ ts: Date.now(), data: top })
          );
        }
      } catch {
        if (!dead) setItems([]);
      } finally {
        if (!dead) setLoading(false);
      }
    })();

    return () => {
      dead = true;
    };
  }, [tab, cacheKey]);

  const empty = useMemo(
    () => !loading && (!items || items.length === 0),
    [loading, items]
  );

  function refreshNow() {
    localStorage.removeItem(cacheKey);
    setTimeout(() => setTab((t) => t), 0);
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 text-white">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Noticias TI</h1>
            <p className="text-white/80">
              IA, ciberseguridad, redes, datos y desarrollo. Se actualiza a
              diario.
            </p>
          </div>
          <button
            onClick={refreshNow}
            className="px-3 py-2 rounded-xl border border-orange-300 text-orange-100 bg-white/10 hover:bg-white/20"
            title="Forzar actualización ahora"
          >
            Actualizar
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex flex-wrap gap-2">
          {CATS.map((c) => {
            const active = tab === c;
            return (
              <button
                key={c}
                onClick={() => setTab(c)}
                className={`px-3 py-2 rounded-xl border transition ${
                  active
                    ? "bg-orange-500 text-white border-orange-500"
                    : "border-orange-300 text-orange-100 bg-white/10 hover:bg-white/20"
                }`}
              >
                {c}
              </button>
            );
          })}
        </div>

        {/* Grid “glass” */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {loading &&
            [...Array(9)].map((_, i) => (
              <article
                key={i}
                className="p-4 rounded-2xl bg-white/10 border border-white/15 animate-pulse"
              >
                <div className="w-full h-40 rounded-xl bg-white/10" />
                <div className="mt-3 h-5 bg-white/10 rounded w-3/4" />
                <div className="mt-2 h-4 bg-white/10 rounded w-1/3" />
              </article>
            ))}

          {empty && (
            <div className="col-span-full text-center text-white/80">
              No se encontraron noticias para{" "}
              <span className="font-semibold">{tab}</span>. Intenta “Actualizar”.
            </div>
          )}

          {items?.map((n, i) => (
            <a
              key={i}
              href={n.link}
              target="_blank"
              rel="noreferrer"
              title={n.title}
              className="group block p-3 rounded-2xl bg-black/55 border border-white/15 hover:border-orange-400/60 transition backdrop-blur"
            >
              <div className="w-full h-40 overflow-hidden rounded-xl">
                <img
                  src={n.image || pickFallback(tab)}
                  alt={n.title}
                  className="w-full h-full object-cover group-hover:scale-[1.02] transition"
                  loading="lazy"
                />
              </div>
              <h3 className="font-bold mt-3 leading-snug text-white">
                {n.title}
              </h3>
              <div className="mt-1 text-xs text-white/70 flex items-center gap-2">
                {n.source && (
                  <span className="inline-flex items-center px-2 py-0.5 bg-white/10 border border-white/20 rounded-full">
                    {n.source}
                  </span>
                )}
                {n.date && <span>{n.date}</span>}
              </div>
              <span className="text-orange-400 font-semibold mt-2 inline-block">
                Leer en el portal →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Helpers ===== */
function text(el, sel) {
  const n = el.querySelector(sel);
  return n ? (n.textContent || "").trim() : "";
}
function attr(el, sel, name) {
  const n = el.querySelector(sel);
  return n ? n.getAttribute(name) : "";
}

function parseDate(s) {
  if (!s) return { date: "Sin fecha", dateMs: 0 };
  const d = new Date(s);
  if (isNaN(d.getTime())) return { date: "Sin fecha", dateMs: 0 };

  return {
    date: d.toLocaleDateString("es-CO", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }),
    dateMs: d.getTime(),
  };
}

function firstImgFromHtml(html) {
  const m = /<img[^>]+src=["']([^"']+)["']/i.exec(html || "");
  return m?.[1];
}
function isImg(u) {
  return /\.(png|jpe?g|gif|webp|avif|svg)(\?|$)/i.test(u || "");
}

function parseRssItem(it) {
  const title = text(it, "title");
  const link = text(it, "link");
  const source = text(it, "source") || text(it, "dc\\:creator") || "";
  const { date, dateMs } = parseDate(text(it, "pubDate") || text(it, "updated"));

  let image =
    attr(it, "media\\:content", "url") ||
    attr(it, "media\\:thumbnail", "url") ||
    (isImg(attr(it, "enclosure", "url")) ? attr(it, "enclosure", "url") : "") ||
    firstImgFromHtml(text(it, "content\\:encoded") || text(it, "description"));

  return link && title ? { title, link, source, date, dateMs, image } : null;
}

function parseAtomEntry(en) {
  const title = text(en, "title");
  const linkEl =
    en.querySelector("link[rel='alternate']") || en.querySelector("link");
  const link = linkEl ? linkEl.getAttribute("href") : "";
  const source = text(en, "author > name") || "";
  const { date, dateMs } = parseDate(text(en, "updated") || text(en, "published"));
  const image = firstImgFromHtml(text(en, "content") || text(en, "summary"));
  return link && title ? { title, link, source, date, dateMs, image } : null;
}

function filterByCategory(list, cat) {
  const blob = (x) => `${x?.title || ""} ${x?.source || ""}`.toLowerCase();

  if (cat === "IA") {
    return list.filter((x) =>
      /inteligencia artificial|\bai\b|machine learning|aprendizaje automático|llm|modelo|modelos|openai|gemini|claude/.test(
        blob(x)
      )
    );
  }

  if (cat === "Ciberseguridad") {
    return list.filter((x) =>
      /ciberseguridad|vulnerabilidad|exploit|malware|ransomware|phishing|brecha|cve|zero[\s-]?day|hack/.test(
        blob(x)
      )
    );
  }

  if (cat === "Redes") {
    return list.filter((x) =>
      /redes|network|router|switch|wifi|wi-fi|lan|wan|tcp|ip|dns|dhcp|routing|bgp|ospf/.test(
        blob(x)
      )
    );
  }

  if (cat === "Datos") {
    return list.filter((x) =>
      /datos|data|analítica|analytics|etl|kpi|sql|bi|power bi|pandas|dashboard|warehouse/.test(
        blob(x)
      )
    );
  }

  if (cat === "Desarrollo") {
    return list.filter((x) =>
      /desarrollo|programación|developer|dev|javascript|react|node|python|django|java|spring|laravel|api|backend|frontend/.test(
        blob(x)
      )
    );
  }

  return list;
}

function pickFallback(cat) {
  switch (cat) {
    case "Ciberseguridad":
      return "/assets/services/services-security.jpg";
    case "Redes":
      return "/assets/services/services-wifi.jpg";
    case "Desarrollo":
      return "/assets/services/services-web.jpg";
    case "Datos":
    case "IA":
    default:
      return "/assets/services/services-data.jpg";
  }
}
