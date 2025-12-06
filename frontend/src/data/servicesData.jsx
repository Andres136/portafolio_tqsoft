// src/data/servicesData.js

import webImg from "../assets/services/services-web.jpg";
import securityImg from "../assets/services/services-security.jpg";
import dataImg from "../assets/services/services-data.jpg";
import wifiImg from "../assets/services/services-wifi.jpg";

// IMPORTANTE:
// Los slug deben coincidir con ServiceDetail.jsx
// - /services/web  ✅ (en ServiceDetail ya pusiste CONTENT.web = CONTENT.software)
// - ciberseguridad ✅
// - analitica-datos ✅
// - redes-inalambricas ✅

export const SERVICES = [
  {
    slug: "web",
    title: "Desarrollo de software",
    desc: "Apps web robustas (Django/React), APIs REST, integración y despliegue.",
    img: webImg,
  },
  {
    slug: "ciberseguridad",
    title: "Ciberseguridad",
    desc: "Pruebas de vulnerabilidades (OWASP), hardening y monitoreo continuo.",
    img: securityImg,
  },
  {
    slug: "analitica-datos",
    title: "Análisis de datos",
    desc: "Dashboards, ETL y analítica para decisiones de negocio.",
    img: dataImg,
  },
  {
    slug: "redes-inalambricas",
    title: "Redes inalámbricas",
    desc: "Diseño, site survey y optimización Wi-Fi empresarial.",
    img: wifiImg,
  },
];

export default SERVICES;

