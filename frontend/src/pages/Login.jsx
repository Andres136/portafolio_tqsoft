import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import SimpleCaptcha from "../components/SimpleCaptcha";
import { useAuth } from "../context/AuthContext";
import hero from "../assets/about-bg.jpg";

export default function Login() {
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [e, setE] = useState("");
  const [human, setHuman] = useState(false);

  const nav = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  async function onSubmit(ev) {
    ev.preventDefault();
    setE("");

    if (!human) {
      setE('Marca "No soy un robot"');
      return;
    }

    try {
      await login(u, p);

      // ✅ volver a donde venía (ej: /curso/dev-basico)
      const from = location.state?.from || "/cursos";

      // ✅ solo para que CourseView muestre bienvenida
      nav(`${from}?logged=1`, { replace: true });
    } catch (err) {
      setE("Usuario o contraseña inválidos");
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

      <div className="relative z-10 max-w-md mx-auto px-4 py-12">
        <div className="rounded-2xl bg-black/60 border border-white/10 p-6 text-white shadow-xl">
          <h1 className="text-3xl font-extrabold text-center mb-6">Login</h1>

          <form onSubmit={onSubmit} className="space-y-3">
            <input
              value={u}
              onChange={(e) => setU(e.target.value)}
              placeholder="Usuario"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 placeholder-white/60"
              autoComplete="username"
            />

            <input
              type="password"
              value={p}
              onChange={(e) => setP(e.target.value)}
              placeholder="Contraseña"
              className="w-full px-4 py-2 rounded-xl bg-white/10 border border-white/20 placeholder-white/60"
              autoComplete="current-password"
            />

            <SimpleCaptcha onVerify={setHuman} />

            {e && <p className="text-red-400 text-sm mt-1">{e}</p>}

            <button
              type="submit"
              className="w-full px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600 transition"
            >
              Entrar
            </button>
          </form>

          <p className="text-sm text-white/70 mt-4 text-center">
            ¿No tienes cuenta?{" "}
            <Link className="text-orange-400 hover:underline" to="/registrarse" state={location.state}>
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
