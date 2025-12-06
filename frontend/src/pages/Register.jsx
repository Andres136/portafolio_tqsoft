import { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api"; // ✅ tu api.js
import hero from "../assets/about-bg.jpg";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    confirm: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [human, setHuman] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!human) {
      setError('Marca "No soy un robot"');
      return;
    }

    if (form.password !== form.confirm) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      await api.register({
        username: form.username,
        email: form.email,
        first_name: form.first_name,
        last_name: form.last_name,
        password: form.password,
      });

      setSuccess("¡Registro exitoso! Iniciando sesión...");

      await login(form.username, form.password);

      // ✅ volver a donde venía (ej: /curso/dev-basico)
      const from = location.state?.from || "/cursos";

      // ✅ solo CourseView mostrará la bienvenida
      navigate(`${from}?registered=1`, { replace: true });
    } catch (err) {
      console.error(err);
      setError(err.message || "No se pudo registrar. Revisa los datos.");
    }
  }

  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full max-w-md px-6 py-8 bg-black/80 text-white rounded-3xl shadow-2xl">
        <h1 className="text-3xl font-extrabold text-center mb-6">Registro</h1>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Correo"
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 focus:outline-none focus:border-orange-400"
          />
          <input
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Usuario"
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 focus:outline-none focus:border-orange-400"
          />
          <input
            name="first_name"
            value={form.first_name}
            onChange={handleChange}
            placeholder="Nombres"
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 focus:outline-none focus:border-orange-400"
          />
          <input
            name="last_name"
            value={form.last_name}
            onChange={handleChange}
            placeholder="Apellidos"
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 focus:outline-none focus:border-orange-400"
          />
          <input
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Contraseña"
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 focus:outline-none focus:border-orange-400"
          />
          <input
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            placeholder="Confirmar contraseña"
            className="w-full px-4 py-2 rounded-xl bg-slate-800 border border-slate-600 focus:outline-none focus:border-orange-400"
          />

          <label className="flex items-center gap-2 text-sm text-white/90 mt-1">
            <input
              type="checkbox"
              className="h-4 w-4 accent-orange-500"
              checked={human}
              onChange={(e) => setHuman(e.target.checked)}
            />
            No soy un robot
          </label>

          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
          {success && <p className="text-green-400 text-sm mt-1">{success}</p>}

          <button
            type="submit"
            className="mt-3 w-full px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 font-semibold"
          >
            Registrarme
          </button>
        </form>

        <p className="mt-4 text-sm text-white/70 text-center">
          ¿Ya tienes cuenta?{" "}
          <Link to="/login" state={location.state} className="text-orange-300 hover:text-orange-200">
            Inicia sesión
          </Link>
        </p>
      </div>
    </section>
  );
}
