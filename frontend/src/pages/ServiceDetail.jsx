// src/pages/ServiceDetail.jsx
import { useParams, Link } from "react-router-dom";

const CONTENT = {
  software: {
    title: "Desarrollo de software",
    bullets: [
      "React + Tailwind",
      "Django REST",
      "PostgreSQL/MySQL",
      "CI/CD y despliegue",

      // Tecnologías que pides en la misma “línea de software”
      "Java + Spring Boot (APIs REST, JPA/Hibernate, Spring Security, OpenAPI)",
      "PHP / Laravel (Laravel 10/11, Eloquent, Blade/Inertia + Vite, Passport/Sanctum)",
      "JavaScript / Node.js (Express/NestJS, REST/GraphQL, JWT, WebSockets)",
      "Bases de datos NoSQL (MongoDB/Redis, modelos, índices y performance, backups)",
      "Docker / DevOps (Docker/Compose, CI/CD con GitHub Actions, logs/metrics, IaC)",
      "Azure Cloud (App Service/Functions, Cosmos DB/Storage, AAD, pipelines)",
    ],
  },

  ciberseguridad: {
    title: "Ciberseguridad",
    bullets: ["Escaneo OWASP/ZAP", "Hardening", "Pentesting básico", "Monitoreo y alertas"],
  },
  "analitica-datos": {
    title: "Análisis de datos",
    bullets: ["ETL", "Dashboards (Power BI)", "Modelos descriptivos", "Automatización de reportes"],
  },
  "redes-inalambricas": {
    title: "Redes inalámbricas",
    bullets: ["Site survey", "Diseño de cobertura", "Optimización de canales", "Seguridad Wi-Fi"],
  },

  // NUEVOS
  "java-spring": {
    title: "Java + Spring Boot",
    bullets: ["APIs REST", "JPA/Hibernate", "Spring Security", "Pruebas y documentación (OpenAPI)"],
  },
  "php-laravel": {
    title: "PHP Laravel",
    bullets: ["Laravel 10/11", "Eloquent ORM", "Blade/Inertia + Vite", "Passport/Sanctum"],
  },
  "javascript-node": {
    title: "JavaScript / Node.js",
    bullets: ["Express/NestJS", "REST/GraphQL", "JWT/Autenticación", "WebSockets"],
  },
  nosql: {
    title: "Bases de datos NoSQL",
    bullets: ["MongoDB/Redis", "Diseño de esquemas", "Índices y performance", "Backups/replicación"],
  },
  "docker-devops": {
    title: "Docker / DevOps",
    bullets: ["Docker/Compose", "CI/CD (GitHub Actions)", "Logs/metrics", "Infra como código"],
  },
  "azure-cloud": {
    title: "Azure Cloud",
    bullets: ["App Service/Functions", "Cosmos DB/Storage", "Identidad (AAD)", "Pipelines de despliegue"],
  },
};

// ✅ SOLO PARA QUE FUNCIONE /services/web
CONTENT.web = CONTENT.software;

const WA = "https://wa.me/573108157335";

export default function ServiceDetail() {
  const { slug } = useParams();
  const data = CONTENT[slug];

  if (!data) return <div className="max-w-4xl mx-auto p-6">Servicio no encontrado.</div>;

  const toContact = `/contacto?service=${encodeURIComponent(slug)}`;
  const waMsg = encodeURIComponent(`Hola, me interesa el servicio: ${data.title}. ¿Podemos hablar?`);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-extrabold mb-2">{data.title}</h1>
      <p className="text-gray-600 mb-6">Incluye:</p>

      <ul className="list-disc pl-6 space-y-1">
        {data.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-3 mt-8">
        {/* Solicitar servicio → Contacto pre-relleno */}
        <Link
          to={toContact}
          className="px-4 py-2 rounded-xl bg-orange-500 text-white hover:bg-orange-600"
        >
          Solicitar servicio
        </Link>

        {/* WhatsApp directo con mensaje armado */}
        <a
          href={`${WA}?text=${waMsg}`}
          className="px-4 py-2 rounded-xl border border-green-600 text-green-700"
          target="_blank"
          rel="noreferrer"
        >
          Hablar por WhatsApp
        </a>

        {/* Pagos */}
        <Link
          to="/checkout"
          className="px-4 py-2 rounded-xl border border-orange-500 text-orange-600"
        >
          Ir a pagos
        </Link>
      </div>
    </div>
  );
}

