// src/lib/api.js

// 🔹 Base de la API (puedes cambiarla con VITE_API_URL en .env)
const BASE =
  import.meta.env.VITE_API_URL?.replace(/\/$/, "") || "http://localhost:8000";

// 🔹 Helper genérico para hacer requests
async function request(path, { method = "GET", body, headers } = {}) {
  // Si el path NO es absoluto, se concatena con BASE
  const url = path.startsWith("http") ? path : `${BASE}${path}`;

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json", ...(headers || {}) },
    credentials: "include",
    body: body ? JSON.stringify(body) : undefined,
  });

  let data = {};
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    console.error("Error API", res.status, data);

    // 👉 Intentar construir un mensaje de error útil
    let message = data.detail || data.error || "";

    // Ejemplo típico DRF: { username: ["Este campo es requerido."] }
    if (!message && data && typeof data === "object") {
      const parts = [];
      for (const [field, msgs] of Object.entries(data)) {
        if (Array.isArray(msgs)) {
          parts.push(`${field}: ${msgs.join(" ")}`);
        } else {
          parts.push(`${field}: ${msgs}`);
        }
      }
      message = parts.join(" | ");
    }

    throw new Error(message || "Error de red");
  }

  return data;
}

// 🔹 Objeto api con métodos genéricos + atajos
export const api = {
  // 👉 Métodos genéricos
  get: (path, opts) => request(path, { ...(opts || {}), method: "GET" }),
  post: (path, body, opts) =>
    request(path, { ...(opts || {}), method: "POST", body }),

  // 👉 Atajos específicos que ya usas en el frontend
  register: (payload) =>
    request("/api/auth/register/", { method: "POST", body: payload }),

  login: (payload) =>
    request("/api/auth/login/", { method: "POST", body: payload }),

  contact: (payload) =>
    request("/api/contact/", { method: "POST", body: payload }),
};

// 🔹 API específica para Portafolio
export const PortfolioAPI = {
  list: () => api.get("/api/portfolio/"),
  create: (payload) => api.post("/api/portfolio/", payload),
};

// default para `import api from "../lib/api"`
export default api;

