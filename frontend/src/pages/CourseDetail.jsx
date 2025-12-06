// src/pages/CourseDetail.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import hero from "../assets/about-bg.jpg";
import { getCourse } from "../lib/courses";
import { useAuth } from "../context/AuthContext";

function toYouTubeEmbed(urlOrId) {
  if (!urlOrId) return null;

  // Si sólo es el ID (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    return `https://www.youtube-nocookie.com/embed/${urlOrId}`;
  }

  try {
    const u = new URL(urlOrId);

    // youtu.be/ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return id
        ? `https://www.youtube-nocookie.com/embed/${id}`
        : null;
    }

    // youtube.com
    if (u.hostname.includes("youtube.com")) {
      // /embed/ID
      if (u.pathname.startsWith("/embed/")) {
        return `https://www.youtube-nocookie.com${u.pathname}${u.search}`;
      }

      // /watch?v=ID
      const v = u.searchParams.get("v");
      if (v) {
        return `https://www.youtube-nocookie.com/embed/${v}`;
      }

      // /shorts/ID
      const m = u.pathname.match(/\/shorts\/([^/]+)/);
      if (m?.[1]) {
        return `https://www.youtube-nocookie.com/embed/${m[1]}`;
      }
    }

    // Si ya venía bien, devuélvelo
    return urlOrId;
  } catch {
    return null;
  }
}

export default function CourseDetail() {
  const { slug } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const next = location.pathname;

  const [course, setCourse] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const data = await getCourse(slug);
        setCourse(data);
        setError("");
      } catch (e) {
        console.error(e);
        setError("No se encontró el curso.");
      }
    })();
  }, [slug]);

  const embedSrc = useMemo(
    () => toYouTubeEmbed(course?.video_url),
    [course?.video_url]
  );

  // 🔒 BLOQUEO si es invitado
  if (!user) {
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
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 py-16 text-white">
          <div className="rounded-2xl border border-white/15 bg-black/70 backdrop-blur p-6">
            <h1 className="text-2xl md:text-3xl font-extrabold">
              Acceso a cursos TQSoft
            </h1>
            <p className="mt-2 text-white/80">
              Para ingresar a este curso,{" "}
              <span className="text-orange-300 font-semibold">
                inicia sesión o regístrate.
              </span>
            </p>
            <p className="mt-1 text-sm text-white/70">
              Después de autenticarse, te llevaremos de nuevo a este curso.
            </p>

            <div className="mt-5 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() =>
                  navigate(`/login?next=${encodeURIComponent(next)}`)
                }
                className="flex-1 px-4 py-2 rounded-xl bg-orange-500 text-white text-sm hover:bg-orange-600"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() =>
                  navigate(`/registrarse?next=${encodeURIComponent(next)}`)
                }
                className="flex-1 px-4 py-2 rounded-xl border border-orange-500 text-orange-300 text-sm hover:bg-orange-500/10"
              >
                Registrarse
              </button>
            </div>

            <button
              onClick={() => navigate("/cursos")}
              className="mt-4 text-sm text-white/70 hover:text-white underline"
            >
              ⬅ Volver al catálogo de cursos
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ✅ LOGUEADO: mostrar curso
  return (
    <section className="relative min-h-screen bg-black text-white">
      <div className="max-w-5xl mx-auto px-4 py-10">
        {error && (
          <div className="mb-4 rounded-xl border border-red-500/70 bg-red-900/30 px-4 py-2 text-sm">
            {error}
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-extrabold">
          {course?.title || "Curso"}
        </h1>
        <p className="mt-2 text-white/75">
          {course?.description || "Descripción del curso."}
        </p>

        {course?.overview && (
          <ul className="mt-4 list-disc list-inside text-sm text-white/80 space-y-1">
            {course.overview.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        )}

        <p className="mt-6 text-sm text-white/80">
          Mira este video antes de responder a la evaluación.
        </p>

        <div className="mt-3 rounded-2xl overflow-hidden border border-white/15 bg-black/40">
          <div className="aspect-video">
            {embedSrc ? (
              <iframe
                key={embedSrc}
                className="w-full h-full"
                src={embedSrc}
                title="Video del curso"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/70 text-sm px-4 text-center">
                No hay un video configurado para este curso aún.  
                Edita <code>video_url</code> en <code>src/lib/courses.js</code>.
              </div>
            )}
          </div>
        </div>

        {course?.video_url && (
          <a
            className="inline-block mt-3 px-4 py-2 rounded-xl border border-orange-500 text-orange-300 hover:bg-orange-500/10 text-sm"
            href={course.video_url}
            target="_blank"
            rel="noreferrer"
          >
            Ver en YouTube
          </a>
        )}

        {course?.content && (
          <div className="mt-8 space-y-3 text-sm leading-relaxed text-white/85">
            {course.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
