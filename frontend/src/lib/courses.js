// src/lib/courses.js

// Imágenes locales
import devBasicoImg from "../assets/courses/dev-basico.jpg";
import ciberBasicoImg from "../assets/courses/ciberseguridad-basica.jpg";
import redesBasicoImg from "../assets/courses/redes-basico.jpg";
import datosBasicoImg from "../assets/courses/analisis-datos-basico.jpg";

// ✅ Tus enlaces reales
const YT_CIBER = "https://youtu.be/gzES0MuWqHE?si=boLDO_fJFTDuO9_D";
const YT_DEV   = "https://youtu.be/-howasl57fg?si=5LfD6PcFx1TwdnaF";
const YT_REDES = "https://youtu.be/_JNPvSxG6oM?si=Yd_mPHNj_TKfCM2H";
const YT_DATOS = "https://youtu.be/um41JAqO42g?si=CvjEG4zOlpb7vYk8";

// Convierte links (watch/youtu.be/shorts/embed o ID) a {id, watch, embed}
export function makeVideo(urlOrId) {
  if (!urlOrId) return { id: null, watch: null, embed: null };

  // Si llega solo el ID (11 chars)
  if (/^[a-zA-Z0-9_-]{11}$/.test(urlOrId)) {
    const id = urlOrId;
    return {
      id,
      watch: `https://www.youtube.com/watch?v=${id}`,
      embed: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`,
    };
  }

  try {
    const u = new URL(urlOrId);

    // youtu.be/ID
    if (u.hostname.includes("youtu.be")) {
      const id = u.pathname.replace("/", "");
      return {
        id,
        watch: `https://www.youtube.com/watch?v=${id}`,
        embed: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`,
      };
    }

    // youtube.com
    if (u.hostname.includes("youtube.com")) {
      // /embed/ID
      if (u.pathname.startsWith("/embed/")) {
        const id = u.pathname.split("/embed/")[1]?.split("/")[0];
        return {
          id,
          watch: id ? `https://www.youtube.com/watch?v=${id}` : urlOrId,
          embed: id
            ? `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`
            : null,
        };
      }

      // /watch?v=ID
      const v = u.searchParams.get("v");
      if (v) {
        return {
          id: v,
          watch: `https://www.youtube.com/watch?v=${v}`,
          embed: `https://www.youtube-nocookie.com/embed/${v}?rel=0&modestbranding=1&playsinline=1`,
        };
      }

      // /shorts/ID
      const m = u.pathname.match(/\/shorts\/([^/]+)/);
      if (m?.[1]) {
        const id = m[1];
        return {
          id,
          watch: `https://www.youtube.com/watch?v=${id}`,
          embed: `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1`,
        };
      }
    }

    return { id: null, watch: urlOrId, embed: null };
  } catch {
    return { id: null, watch: urlOrId, embed: null };
  }
}

// Cursos locales
export const COURSES = [
  {
    slug: "dev-basico",
    title: "Desarrollo de Software (Básico)",
    description:
      "Fundamentos de programación, Git, React y Django para entender el ciclo completo del desarrollo.",
    image: devBasicoImg,
    overview: [
      "Fundamentos de programación y Git.",
      "Frontend vs Backend; React/Django.",
      "Buenas prácticas: modularidad, pruebas y CI/CD.",
    ],
    video_url: YT_DEV,
    video: makeVideo(YT_DEV),
    content: [
      "En desarrollo de software es clave entender qué es un programa: un conjunto de instrucciones que una computadora ejecuta para resolver un problema. Esas instrucciones se escriben en un lenguaje de programación como Python, JavaScript o Java.",
      "Git es una herramienta de control de versiones que permite guardar el historial de cambios de un proyecto, trabajar con ramas (branch) y colaborar con otras personas sin perder trabajo. El comando git init se usa para iniciar un repositorio en una carpeta.",
      "En una aplicación web moderna normalmente hablamos de Frontend y Backend. El Frontend es la parte que ve el usuario (interfaz: botones, formularios, estilos). El Backend es la parte que corre en el servidor y maneja lógica de negocio, base de datos, autenticación, etc. React se usa principalmente en el Frontend, mientras que Django es un framework de Backend en Python.",
      "Las buenas prácticas incluyen modularidad (separar el código en archivos y componentes reutilizables), pruebas automatizadas (tests) y CI/CD. CI/CD significa Integración Continua y Despliegue Continuo: cada cambio que subes al repositorio puede ser probado y desplegado automáticamente gracias a pipelines configurados en herramientas como GitHub Actions, GitLab CI o similares.",
    ],
    quiz: [
      { q: "¿Qué comando crea un repositorio Git?", a: ["git init", "git start", "git new"], correct: 0 },
      { q: "¿Cuál NO es un lenguaje compilado?", a: ["C", "Go", "JavaScript"], correct: 2 },
      { q: "¿Qué archivo describe dependencias en Node?", a: ["requirements.txt", "package.json", "Pipfile"], correct: 1 },
      { q: "¿Qué significa CI/CD?", a: ["Código Inteligente", "Integración/Despliegue continuo", "Compilación interna"], correct: 1 },
      { q: "React es principalmente para...", a: ["Frontend", "Backend", "BD"], correct: 0 },
      { q: "Django es un framework de...", a: ["Python", "Java", "PHP"], correct: 0 },
      { q: "¿Qué comando crea una rama en Git?", a: ["git branch <nombre>", "git fork", "git split"], correct: 0 },
      { q: "¿Qué es Jest?", a: ["Framework CSS", "Linter", "Framework de pruebas"], correct: 2 },
      { q: "¿Qué es Tailwind?", a: ["Framework CSS utilitario", "DB", "Servidor"], correct: 0 },
      { q: "¿Qué librería facilita rutas en React?", a: ["redux", "react-router-dom", "axios"], correct: 1 },
      { q: "¿Qué es un Pull Request?", a: ["Un bug", "Propuesta de cambios", "Un release"], correct: 1 },
      { q: "¿Qué define la arquitectura cliente-servidor?", a: ["Acoplamiento fuerte", "Separación de responsabilidades", "Monolito"], correct: 1 },
    ],
  },

  {
    slug: "ciberseguridad-basica",
    title: "Ciberseguridad (Básico)",
    description:
      "Principios CIA, OWASP y amenazas comunes como phishing, malware y ransomware.",
    image: ciberBasicoImg,
    overview: [
      "Principios CIA (Confidencialidad, Integridad, Disponibilidad).",
      "Buenas prácticas OWASP y gestión de contraseñas.",
      "Amenazas comunes: phishing, malware, ransomware.",
    ],
    video_url: YT_CIBER,
    video: makeVideo(YT_CIBER),
    content: [
      "La ciberseguridad busca proteger la información y los sistemas frente a ataques, errores y accesos no autorizados. Un modelo básico es el CIA: Confidencialidad, Integridad y Disponibilidad.",
      "Confidencialidad significa que solo las personas autorizadas pueden acceder a la información. Integridad implica que los datos no se alteren sin permiso y se mantengan correctos. Disponibilidad quiere decir que los sistemas y datos estén accesibles cuando los usuarios los necesitan.",
      "OWASP es una comunidad que publica buenas prácticas para aplicaciones web, como el Top 10 de vulnerabilidades más comunes (XSS, inyección, problemas de autenticación, etc.). Una buena higiene de contraseñas incluye usar gestores de contraseñas, activar MFA (autenticación multifactor) y evitar reutilizar la misma clave en todos los servicios.",
      "Entre las amenazas más frecuentes están el phishing (correos o mensajes que engañan al usuario para robar credenciales), el malware (software malicioso que puede cifrar, robar o dañar datos) y el ransomware (malware que secuestra la información mediante cifrado y pide un pago para liberarla). Usar HTTPS, un buen antivirus, copias de seguridad 3-2-1 y el principio de mínimo privilegio ayuda a reducir riesgos.",
    ],
    quiz: [
      { q: "La 'C' del modelo CIA significa:", a: ["Confidencialidad", "Ciberataque", "Criptografía"], correct: 0 },
      { q: "¿Qué es MFA?", a: ["Firewall avanzado", "Autenticación multifactor", "Malware forense"], correct: 1 },
      { q: "¿Cuál es un riesgo típico web?", a: ["XSS", "JSON", "CDN"], correct: 0 },
      { q: "¿Qué hace un gestor de contraseñas?", a: ["Almacena y genera claves seguras", "Bloquea anuncios", "Analiza logs"], correct: 0 },
      { q: "Phishing es:", a: ["Correos de ingeniería social", "Ataques DNS", "Compilar binarios"], correct: 0 },
      { q: "¿Qué herramienta automatiza pruebas OWASP?", a: ["ZAP", "NPM", "PIP"], correct: 0 },
      { q: "HTTPS añade:", a: ["Cifrado TLS", "Más ancho de banda", "Imágenes optimizadas"], correct: 0 },
      { q: "Principio de mínimo privilegio aplica a:", a: ["Permisos de usuarios", "Tamaño de imágenes", "Límites de API"], correct: 0 },
      { q: "Hardening significa:", a: ["Reducir superficie de ataque", "Minificar JS", "Normalizar CSS"], correct: 0 },
      { q: "Backup 3-2-1 es:", a: ["3 copias, 2 medios, 1 offsite", "3 copias locales", "1 copia cloud"], correct: 0 },
      { q: "WAF sirve para:", a: ["Filtrar tráfico malicioso", "Optimizar CDN", "Renderizar SSR"], correct: 0 },
      { q: "Un indicador de compromiso (IOC) es:", a: ["Evidencia de ataque", "Clave pública", "Script build"], correct: 0 },
    ],
  },

  {
    slug: "redes-basicas",
    title: "Redes (Básico)",
    description:
      "Modelo OSI, IPv4, NAT y fundamentos de Wi-Fi para redes domésticas y pequeñas empresas.",
    image: redesBasicoImg,
    overview: [
      "Modelo OSI vs TCP/IP y dispositivos de red.",
      "Direccionamiento IPv4, subredes y NAT.",
      "Wi-Fi: canales, seguridad y troubleshooting.",
    ],
    video_url: YT_REDES,
    video: makeVideo(YT_REDES),
    content: [
      "En redes de datos, el modelo OSI define 7 capas (física, enlace de datos, red, transporte, sesión, presentación y aplicación), mientras que el modelo TCP/IP agrupa funciones en menos capas pero con la misma idea: separar responsabilidades.",
      "Los principales dispositivos de red son el switch (trabaja en capa 2, conecta equipos en una misma red local) y el router (capa 3, enruta paquetes entre redes diferentes). El direccionamiento IPv4 usa direcciones como 192.168.1.10 con una máscara de red, por ejemplo 255.255.255.0 que equivale a /24.",
      "NAT (Network Address Translation) permite que varias direcciones privadas dentro de una LAN salgan a Internet usando una o pocas direcciones públicas, ocultando la red interna. DHCP asigna direcciones IP automáticamente a los clientes, y DNS resuelve nombres de dominio a direcciones IP.",
      "En Wi-Fi, es importante elegir canales adecuados (1, 6 y 11 en 2.4 GHz para evitar solapamientos), usar seguridad WPA2 o WPA3, cambiar la contraseña por defecto del router, actualizar el firmware y revisar la intensidad de señal. El SSID es el nombre de la red inalámbrica que ven los usuarios.",
    ],
    quiz: [
      { q: "¿Cuántas capas tiene el modelo OSI?", a: ["5", "7", "4"], correct: 1 },
      { q: "Dispositivo que reenvía paquetes entre redes:", a: ["Switch", "Router", "Hub"], correct: 1 },
      { q: "Dirección privada válida:", a: ["192.168.1.10", "8.8.8.8", "1.1.1.1"], correct: 0 },
      { q: "WPA2 sirve para:", a: ["Seguridad Wi-Fi", "DNS", "QoS"], correct: 0 },
      { q: "¿Qué hace NAT?", a: ["Traduce IPs privadas a públicas", "Asigna VLANs", "Resuelve nombres"], correct: 0 },
      { q: "Canal recomendado en 2.4GHz (no solapado):", a: ["1/6/11", "3/7/9", "2/5/8"], correct: 0 },
      { q: "Ping usa:", a: ["ICMP", "HTTP", "FTP"], correct: 0 },
      { q: "La máscara 255.255.255.0 es:", a: ["/24", "/16", "/8"], correct: 0 },
      { q: "DHCP entrega:", a: ["IP automática", "Certificados", "SSH"], correct: 0 },
      { q: "QoS mejora:", a: ["Prioridad de tráfico", "Compresión PNG", "Caching CSS"], correct: 0 },
      { q: "SSID es:", a: ["Nombre de red Wi-Fi", "IP pública", "Puerto"], correct: 0 },
      { q: "802.11ac opera en:", a: ["5GHz", "2.4GHz", "Ambas"], correct: 2 },
    ],
  },

  {
    slug: "analisis-datos-basico",
    title: "Análisis de Datos (Básico)",
    description:
      "ETL, KPIs y visualización con SQL, Pandas y Power BI para comenzar en data analysis.",
    image: datosBasicoImg,
    overview: [
      "Proceso ETL y limpieza de datos.",
      "KPIs, dashboards y storytelling.",
      "Herramientas: SQL, Pandas/Power BI.",
    ],
    video_url: YT_DATOS,
    video: makeVideo(YT_DATOS),
    content: [
      "El análisis de datos es el proceso de tomar datos crudos, limpiarlos, organizarlos y obtener información útil para tomar decisiones. Un flujo típico es ETL: Extract, Transform, Load (extraer, transformar y cargar).",
      "En la fase de extracción se obtienen los datos desde distintas fuentes (archivos CSV, bases de datos, APIs). En la transformación se limpian valores nulos, se corrigen formatos, se normalizan columnas y se generan nuevas variables. Finalmente, en la carga se guardan en un Data Warehouse o sistema de reportes.",
      "Los KPIs (Indicadores Clave de Desempeño) son métricas que resumen el estado de un proceso o negocio, por ejemplo: ventas mensuales, tasa de conversión, número de clientes nuevos. Un dashboard efectivo presenta KPIs de forma clara y accionable, sin exceso de elementos visuales.",
      "Herramientas como SQL permiten consultar y filtrar datos en bases de datos relacionales. Librerías como Pandas en Python ayudan a manipular DataFrames, y Power BI permite crear visualizaciones interactivas. Detectar outliers (datos atípicos), elegir gráficos adecuados y saber contar la historia detrás de los datos es parte clave del análisis.",
    ],
    quiz: [
      { q: "ETL significa:", a: ["Extract, Transform, Load", "Encode, Transfer, Log", "Eval, Test, Loop"], correct: 0 },
      { q: "Medida de tendencia central:", a: ["Media", "Histograma", "Nube de palabras"], correct: 0 },
      { q: "Pandas es una librería de:", a: ["Python", "R", "Java"], correct: 0 },
      { q: "¿Qué es un KPI?", a: ["Indicador clave de desempeño", "Tabla de verdad", "Filtro"], correct: 0 },
      { q: "JOIN que devuelve intersección:", a: ["INNER", "LEFT", "FULL"], correct: 0 },
      { q: "Power BI sirve para:", a: ["Dashboards", "Compilar C", "Servir HTML"], correct: 0 },
      { q: "Normalizar datos ayuda a:", a: ["Evitar escalas sesgadas", "Acelerar GPU", "Mejorar CSS"], correct: 0 },
      { q: "CSV significa:", a: ["Valores separados por comas", "Cliente-Servidor-Vista", "Cache server value"], correct: 0 },
      { q: "Un outlier es:", a: ["Dato atípico", "Promedio", "Mediana"], correct: 0 },
      { q: "SQL para filtrar filas:", a: ["WHERE", "ORDER BY", "GROUP BY"], correct: 0 },
      { q: "ETL suele cargar a:", a: ["Data Warehouse", "IDE", "CDN"], correct: 0 },
      { q: "Dashboard efectivo es:", a: ["Claro y accionable", "Lleno de efectos", "Sin contexto"], correct: 0 },
    ],
  },
];

export const listCourses = async () => COURSES;

export const getCourse = async (slug) => {
  const local = COURSES.find((c) => c.slug === slug);
  if (!local) throw new Error("Curso no encontrado");
  return local;
};

export default COURSES;
