// src/pages/Courses.jsx
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import hero from "../assets/about-bg.jpg";
import { listCourses } from "../lib/courses";
import { useAuth } from "../context/AuthContext";

// Imágenes locales
import devBasicoImg from "../assets/courses/dev-basico.jpg";
import ciberBasicoImg from "../assets/courses/ciberseguridad-basica.jpg";
import redesBasicoImg from "../assets/courses/redes-basico.jpg";
import datosBasicoImg from "../assets/courses/analisis-datos-basico.jpg";
import defaultCourseImg from "../assets/courses/curso-default.jpg";

const FALLBACKS = {
  "dev-basico": devBasicoImg,
  "ciberseguridad-basica": ciberBasicoImg,
  "ciberseguridad-basico": ciberBasicoImg,
  "redes-basico": redesBasicoImg,
  "redes-basicas": redesBasicoImg,
  "analisis-datos-basico": datosBasicoImg,
};

const imageFor = (c) =>
  c?.image || c?.image_url || FALLBACKS[c?.slug] || defaultCourseImg;

export default function Courses() {
  const [items, setItems] = useState([]);
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Modal auth
  const [authOpen, setAuthOpen] = useState(false);
  const [nextPath, setNextPath] = useState("/cursos");

  // Leer query params para mostrar mensajes
  const searchParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );
  const registered = searchParams.get("registered") === "1";
  const logged = searchParams.get("logged") === "1";

  useEffect(() => {
    (async () => {
      try {
        const data = await listCourses();
        setItems(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error(e);
        setItems([]);
      }
    })();
  }, []);

  const displayName =
    user?.name || user?.username || user?.email || "invitado";

  const handleLogout = async () => {
    if (logout) await logout();
    navigate("/cursos", { replace: true });
  };

  const requireAuth = (path) => {
    setNextPath(path);
    setAuthOpen(true);
  };

  const goToCourse = (slug) => {
    if (!slug) return;
    const path = `/curso/${slug}`;
    if (user) navigate(path);
    else requireAuth(path);
  };

  const goToLogin = () => {
    setAuthOpen(false);
    navigate(`/login?next=${encodeURIComponent(nextPath)}`);
  };

  const goToRegister = () => {
    setAuthOpen(false);
    navigate(`/registrarse?next=${encodeURIComponent(nextPath)}`);
  };

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
        {/* Mensajes de estado (login/registro) */}
        {(registered || logged) && (
          <div className="mb-4 space-y-2">
            {registered && (
              <div className="p-3 rounded-xl bg-green-600/20 border border-green-500 text-sm">
                ✅ Registro exitoso. Ahora puedes acceder a los cursos.
              </div>
            )}
            {logged && user && (
              <div className="p-3 rounded-xl bg-orange-600/20 border border-orange-500 text-sm">
                👋 Bienvenido{" "}
                <span className="font-semibold">{displayName}</span>.
              </div>
            )}
          </div>
        )}

        {/* Hero / mensaje superior */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            Cursos interactivos
          </h1>
          <p className="text-white/80 mt-2 max-w-2xl">
            Aprende con teoría clara, videos y evaluaciones con retroalimentación.
          </p>

          <div className="mt-4 p-4 rounded-2xl bg-black/60 border border-white/15">
            {user ? (
              <>
                <p className="text-sm md:text-base">
                  Estás navegando como{" "}
                  <span className="font-semibold text-orange-300">
                    {displayName}
                  </span>
                  .
                </p>
                <p className="text-xs md:text-sm text-white/70 mt-1">
                  Elige un curso para ver el contenido completo, el video y tu
                  evaluación.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 rounded-xl border border-orange-500 text-orange-300 text-sm hover:bg-orange-500/10"
                  >
                    Cerrar sesión
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm md:text-base">
                  Para ingresar a los cursos de{" "}
                  <span className="font-semibold text-orange-300">TQSoft</span>,
                  inicia sesión o regístrate.
                </p>
                <p className="text-xs md:text-sm text-white/70 mt-1">
                  Puedes ver el catálogo, pero el contenido completo requiere cuenta.
                </p>
                <div className="mt-3 flex flex-wrap gap-3">
                  <button
                    onClick={() => requireAuth("/cursos")}
                    className="px-4 py-2 rounded-xl bg-orange-500 text-white text-sm hover:bg-orange-600"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => {
                      setNextPath("/cursos");
                      goToRegister();
                    }}
                    className="px-4 py-2 rounded-xl border border-orange-500 text-orange-300 text-sm hover:bg-orange-500/10"
                  >
                    Registrarse
                  </button>
                </div>
              </>
            )}
          </div>
        </header>

        {/* Tarjetas de cursos */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {items.map((c, idx) => (
            <article
              key={c.id || c.slug || `course-${idx}`}
              className="rounded-2xl overflow-hidden border border-white/15 bg-black/55 backdrop-blur hover:border-orange-400/60 transition"
            >
              <img
                src={imageFor(c)}
                className="w-full h-40 object-cover opacity-95"
                alt={c.title}
                loading="lazy"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold">{c.title}</h3>
                <p className="text-sm text-white/80 line-clamp-3">
                  {c.description}
                </p>

                <div className="mt-2 text-xs text-white/70 flex flex-wrap gap-2">
                  {c.level && (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                      {c.level}
                    </span>
                  )}
                  {c.duration_min && (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                      {c.duration_min} min
                    </span>
                  )}
                  {c.lessons_count && (
                    <span className="px-2 py-0.5 rounded-full bg-white/10 border border-white/20">
                      {c.lessons_count} lecciones
                    </span>
                  )}
                </div>

                <div className="mt-4 flex gap-2 items-center">
                  {c.slug && (
                    <button
                      onClick={() => goToCourse(c.slug)}
                      className="px-3 py-1.5 rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-sm"
                    >
                      Ir al curso
                    </button>
                  )}

                  {c.video_url && (
                    <a
                      href={c.video_url}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl border border-orange-400 text-orange-300 hover:bg-orange-500/10 text-sm"
                    >
                      Ver video
                    </a>
                  )}
                </div>

                {!user && (
                  <p className="mt-2 text-xs text-white/70">
                    🔒 Para entrar al curso: inicia sesión o regístrate.
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Modal Auth */}
      {authOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setAuthOpen(false)}
          />
          <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-zinc-950/90 backdrop-blur p-5 text-white shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold">
                  Acceso requerido
                </h3>
                <p className="text-sm text-white/75 mt-1">
                  Para ingresar a los cursos de{" "}
                  <span className="text-orange-300 font-semibold">TQSoft</span>,
                  inicia sesión o regístrate.
                </p>
              </div>
              <button
                onClick={() => setAuthOpen(false)}
                className="px-2 py-1 rounded-lg hover:bg-white/10 text-white/80"
                aria-label="Cerrar"
              >
                ✕
              </button>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3">
              <button
                onClick={goToLogin}
                className="flex-1 px-4 py-2 rounded-xl bg-orange-500 text-white text-sm hover:bg-orange-600"
              >
                Iniciar sesión
              </button>
              <button
                onClick={goToRegister}
                className="flex-1 px-4 py-2 rounded-xl border border-orange-500 text-orange-300 text-sm hover:bg-orange-500/10"
              >
                Registrarse
              </button>
            </div>

            <p className="mt-3 text-xs text-white/60">
              Te llevaremos al contenido que estabas intentando abrir.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

