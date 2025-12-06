// src/pages/CourseView.jsx
import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useLocation, useNavigate } from "react-router-dom"; // ✅ agregado useNavigate
import hero from "../assets/about-bg.jpg";
import { COURSES as LOCAL } from "../lib/courses";
import { useAuth } from "../context/AuthContext";

import devBasicoImg from "../assets/courses/dev-basico.jpg";
import ciberBasicoImg from "../assets/courses/ciberseguridad-basica.jpg";
import redesBasicoImg from "../assets/courses/redes-basico.jpg";
import datosBasicoImg from "../assets/courses/analisis-datos-basico.jpg";
import defaultCourseImg from "../assets/courses/curso-default.jpg";

// Convierte enlaces de YouTube a formato embed
function toYoutubeEmbed(url) {
  if (!url) return null;

  try {
    const u = new URL(url);

    // youtu.be/VIDEOID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return `https://www.youtube.com/embed/${id}`;
    }

    // youtube.com
    if (u.hostname.includes("youtube.com")) {
      if (u.pathname.startsWith("/embed/")) return url;

      const id = u.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    return url;
  } catch {
    return url;
  }
}

// Fallbacks de imágenes usando imports
const IMAGE_FALLBACKS = {
  "dev-basico": devBasicoImg,
  "ciberseguridad-basico": ciberBasicoImg,
  "ciberseguridad-basica": ciberBasicoImg,
  "redes-basico": redesBasicoImg,
  "redes-basicas": redesBasicoImg,
  "analisis-datos-basico": datosBasicoImg,
};

const imageForCourse = (local) =>
  local.image || IMAGE_FALLBACKS[local.slug] || defaultCourseImg;

export default function CourseView() {
  const { slug } = useParams();
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate(); // ✅ agregado

  const local = useMemo(() => LOCAL.find((c) => c.slug === slug), [slug]);

  const [course, setCourse] = useState(null);
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [msg, setMsg] = useState("");
  const [results, setResults] = useState([]); // "ok" | "bad" | null

  // ✅ NUEVO: detectar si vienes de login/registro
  const searchParams = new URLSearchParams(location.search);
  const registered = searchParams.get("registered") === "1";
  const logged = searchParams.get("logged") === "1";

  // ✅ NUEVO: limpiar el query param para que el mensaje salga solo una vez
  useEffect(() => {
    if (registered || logged) {
      const p = new URLSearchParams(location.search);
      p.delete("registered");
      p.delete("logged");
      navigate(
        { pathname: location.pathname, search: p.toString() ? `?${p}` : "" },
        { replace: true }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  // Si el curso no existe
  if (!local) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-10 text-white">
        <h1 className="text-2xl font-bold">Curso no encontrado</h1>
        <p className="mt-2 text-white/80">
          Vuelve al listado de cursos y elige uno disponible.
        </p>
        <Link
          to="/cursos"
          className="inline-block mt-4 px-4 py-2 rounded-xl border border-orange-500 text-orange-400"
        >
          Volver a cursos
        </Link>
      </main>
    );
  }

  // Si NO hay usuario, no mostramos el curso y mandamos a login/registro
  if (!user) {
    const from = location.pathname; // /curso/dev-basico
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
        <div className="absolute inset-0 bg-black/75" />

        <div className="relative z-10 max-w-xl mx-auto px-4 py-16 text-white text-center">
          <h1 className="text-2xl md:text-3xl font-extrabold mb-3">
            Crea tu cuenta para acceder a los cursos
          </h1>
          <p className="text-white/80 mb-6">
            Para ver el video, la teoría y la evaluación de este curso primero
            debes{" "}
            <span className="font-semibold text-orange-300">
              iniciar sesión
            </span>{" "}
            o{" "}
            <span className="font-semibold text-orange-300">registrarte</span>{" "}
            en TQSoft.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/login"
              state={{ from }}
              className="px-5 py-2 rounded-2xl border border-orange-500 text-orange-300 hover:bg-orange-500/10 text-sm font-semibold"
            >
              Iniciar sesión
            </Link>
            <Link
              to="/registrarse"
              state={{ from }}
              className="px-5 py-2 rounded-2xl bg-orange-600 text-white hover:bg-orange-700 text-sm font-semibold"
            >
              Registrarse
            </Link>
          </div>

          <p className="mt-4 text-xs text-white/60">
            Luego de registrarte o iniciar sesión, te redirigiremos a este curso
            automáticamente.
          </p>
        </div>
      </section>
    );
  }

  // A partir de aquí SOLO entra si hay usuario logueado
  useEffect(() => {
    if (!local) return;

    const mappedQuiz = (local.quiz || []).map((q) => ({
      question: q.q,
      options: q.a,
      correct: q.correct,
    }));

    const baseCourse = {
      title: local.title,
      overview: local.overview || [],
      content: local.content || [],
      video_url: local.video_url || null,
      image: imageForCourse(local),
    };

    // Intentar recuperar progreso
    const savedRaw = localStorage.getItem(`tq_course_${slug}`);
    if (savedRaw) {
      try {
        const saved = JSON.parse(savedRaw);
        setCourse(baseCourse);
        setQuiz(mappedQuiz);
        setAnswers(
          Array(mappedQuiz.length)
            .fill(null)
            .map((_, i) => saved.answers?.[i] ?? null)
        );
        setScore(saved.score ?? null);
        setResults(
          Array(mappedQuiz.length)
            .fill(null)
            .map((_, i) => saved.results?.[i] ?? null)
        );
        setMsg("");
        return;
      } catch {}
    }

    // Sin progreso previo
    setCourse(baseCourse);
    setQuiz(mappedQuiz);
    setAnswers(Array(mappedQuiz.length).fill(null));
    setResults(Array(mappedQuiz.length).fill(null));
    setScore(null);
    setMsg("");
  }, [local, slug]);

  // Guardar progreso en localStorage
  useEffect(() => {
    if (!quiz.length) return;
    const payload = { answers, score, results };
    localStorage.setItem(`tq_course_${slug}`, JSON.stringify(payload));
  }, [answers, score, results, slug, quiz.length]);

  function submitQuiz() {
    const missing = answers.reduce(
      (acc, v, i) => (v === null ? [...acc, i + 1] : acc),
      []
    );
    if (missing.length) {
      setMsg(`Responde todas las preguntas (faltan: ${missing.join(", ")}).`);
      setScore(null);
      setResults(Array(quiz.length).fill(null));
      return;
    }
    setMsg("");

    let ok = 0;
    const newResults = quiz.map((q, i) => {
      const isOk = answers[i] === q.correct;
      if (isOk) ok++;
      return isOk ? "ok" : "bad";
    });

    const pct = Math.round((ok / quiz.length) * 100);
    setScore(pct);
    setResults(newResults);
  }

  function resetQuiz() {
    setAnswers(Array(quiz.length).fill(null));
    setScore(null);
    setMsg("");
    setResults(Array(quiz.length).fill(null));
  }

  const waText = encodeURIComponent(
    `Hola, soy ${
      user?.name || user?.username || user?.email || "un estudiante"
    } y me interesa el curso: ${course?.title}. ¿Podemos agendar una tutoría?`
  );
  const waLink = `https://wa.me/573108157335?text=${waText}`;

  const displayName =
    user?.name || user?.username || user?.email || "estudiante";

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
      <div className="absolute inset-0 bg-black/75" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 text-white">
        {/* Header */}
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs text-white/60 uppercase tracking-[0.2em]">
              Curso online
            </p>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              {course?.title}
            </h1>
            <p className="text-sm text-white/70 mt-1">
              Bienvenido,{" "}
              <span className="font-semibold text-orange-300">
                {displayName}
              </span>
              . Tu progreso se guarda automáticamente.
            </p>

            {/* ✅ NUEVO: bienvenida solo si vienes de register/login */}
            {(registered || logged) && (
              <div className="mt-3 p-3 rounded-xl bg-orange-600/20 border border-orange-500 text-sm">
                👋 Bienvenido{" "}
                <span className="font-semibold text-orange-300">
                  {user?.username || user?.name || user?.email}
                </span>
                .
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/cursos"
              className="px-3 py-1.5 rounded-xl border border-orange-500 text-orange-300 text-sm hover:bg-orange-500/10"
            >
              ← Volver a cursos
            </Link>
          </div>
        </div>

        {/* Imagen */}
        {course?.image && (
          <div className="mt-4 rounded-2xl overflow-hidden border border-white/15">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-48 md:h-56 object-cover"
            />
          </div>
        )}

        {/* Overview */}
        <div className="mt-4 text-white/80 space-y-2 text-sm md:text-base">
          {(course?.overview || []).map((t, i) => (
            <p key={i}>{t}</p>
          ))}
        </div>

        {/* VIDEO */}
        {course?.video_url && (
          <section className="mt-6">
            <h2 className="text-xl font-semibold">Video de apoyo</h2>
            <p className="text-sm text-white/80">
              Mira este video antes de responder la evaluación.
            </p>
            <div className="mt-3 rounded-2xl overflow-hidden border border-white/20 bg-black/40 aspect-video">
              <iframe
                src={toYoutubeEmbed(course.video_url)}
                title={course.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}

        {/* TEORÍA */}
        {course?.content?.length > 0 && (
          <section className="mt-8">
            <h2 className="text-xl font-semibold">Contenido teórico</h2>
            <p className="text-sm text-white/80">
              Lee este contenido y luego responde las preguntas.
            </p>
            <div className="mt-3 space-y-2 text-white/80 text-sm md:text-base">
              {course.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </section>
        )}

        {/* TUTORÍA */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">Tutoría</h2>
          <p className="text-sm text-white/80">
            Escríbenos:{" "}
            <a
              className="text-orange-400 underline"
              href={waLink}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp (+57 310 815 7335)
            </a>{" "}
            o correo{" "}
            <a
              className="text-orange-400"
              href="mailto:tiquealapeandres6@gmail.com"
            >
              tiquealapeandres6@gmail.com
            </a>
          </p>
        </section>

        {/* EVALUACIÓN */}
        <section className="mt-8">
          <h2 className="text-xl font-semibold">
            Evaluación ({quiz.length} preguntas)
          </h2>

          <div className="space-y-4 mt-3">
            {quiz.map((q, i) => {
              const state = results[i];
              return (
                <div
                  key={i}
                  className={`p-3 rounded-xl border ${
                    state === "ok"
                      ? "border-green-500 bg-green-500/5"
                      : state === "bad"
                      ? "border-red-500 bg-red-500/5"
                      : "border-white/10 bg-white/5"
                  }`}
                >
                  <div className="font-medium">
                    {i + 1}. {q.question}
                  </div>
                  <div className="mt-2 grid gap-2">
                    {q.options.map((opt, idx) => {
                      const isSelected = answers[i] === idx;
                      const isCorrect = q.correct === idx;
                      const showResult = state !== null;

                      let extraClasses = "";
                      if (showResult && isCorrect) {
                        extraClasses = "border-green-500 bg-green-500/10";
                      } else if (showResult && isSelected && !isCorrect) {
                        extraClasses = "border-red-500 bg-red-500/10";
                      } else if (isSelected) {
                        extraClasses = "border-orange-500 bg-orange-500/10";
                      }

                      return (
                        <label
                          key={idx}
                          className={`inline-flex items-center gap-2 text-sm px-3 py-2 rounded-xl border cursor-pointer ${
                            extraClasses ||
                            "border-gray-700 hover:border-orange-700"
                          }`}
                        >
                          <input
                            type="radio"
                            name={`q${i}`}
                            checked={isSelected}
                            onChange={() => {
                              const a = [...answers];
                              a[i] = idx;
                              setAnswers(a);
                            }}
                          />
                          {opt}
                        </label>
                      );
                    })}
                  </div>

                  {state === "ok" && (
                    <p className="mt-2 text-sm text-green-400">
                      ✔ Respuesta correcta
                    </p>
                  )}
                  {state === "bad" && (
                    <p className="mt-2 text-sm text-red-400">
                      ✖ Respuesta incorrecta. Correcta:{" "}
                      <b>{q.options[q.correct]}</b>
                    </p>
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            <button
              onClick={submitQuiz}
              className="px-5 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 text-sm font-semibold"
            >
              Calcular puntaje
            </button>
            <button
              onClick={resetQuiz}
              className="px-5 py-2 rounded-xl border border-gray-600 text-sm"
            >
              Reiniciar
            </button>
            <Link
              to="/cursos"
              className="px-5 py-2 rounded-xl border border-orange-500 text-orange-400 text-sm"
            >
              ← Volver a cursos
            </Link>
          </div>

          {msg && <p className="mt-3 text-sm text-yellow-300">{msg}</p>}

          {score !== null && (
            <div className="mt-6 p-4 rounded-xl bg-black/40 border border-orange-500/30">
              <p className="text-lg">
                Puntaje: <b>{score}%</b>{" "}
                {score === 100
                  ? "🎉 ¡Felicitaciones, obtuviste 100%!"
                  : "— sigue practicando 💪"}
              </p>
              <div className="w-full bg-gray-800 rounded-xl h-3 mt-3 overflow-hidden">
                <div
                  className="h-3 bg-orange-500"
                  style={{ width: `${score}%` }}
                />
              </div>
            </div>
          )}
        </section>
      </div>
    </section>
  );
}
