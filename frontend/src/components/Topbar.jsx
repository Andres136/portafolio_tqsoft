// src/components/Topbar.jsx
export default function Topbar(){
  const phone = import.meta.env.VITE_CONTACT_PHONE ?? "+57 3108157335";
  const email = import.meta.env.VITE_CONTACT_EMAIL ?? "TiquealapeAndres6@gmail.com";

  const FB  = import.meta.env.VITE_FACEBOOK_URL  ?? "https://facebook.com";
  const IG  = import.meta.env.VITE_INSTAGRAM_URL ?? "https://instagram.com";
  const LI  = import.meta.env.VITE_LINKEDIN_URL  ?? "https://linkedin.com";
  const YT  = import.meta.env.VITE_YOUTUBE_URL   ?? "https://youtube.com";

  return (
    <div className="w-full bg-orange-400 text-black">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        {/* Izquierda: Teléfono + Correo */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full">
            {/* Tel */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.11 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.72c.12.89.3 1.77.57 2.61a2 2 0 0 1-.45 2.11l-1.27 1.27a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.84.27 1.72.45 2.61.57A2 2 0 0 1 22 16.92Z"/>
            </svg>
            <a href={`tel:${phone.replace(/\s+/g,'')}`} className="font-medium">{phone}</a>
          </span>

          <span className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full">
            {/* Mail */}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4 4h16a2 2 0 0 1 2 2v1l-10 6L2 7V6a2 2 0 0 1 2-2Zm18 6.2V18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-7.8l10 6 10-6Z"/>
            </svg>
            <a href={`mailto:${email}`} className="font-medium">{email}</a>
          </span>
        </div>

        {/* Derecha: Redes sociales (iconos visibles) */}
        <div className="flex items-center gap-3 flex-wrap">
          {/* Facebook */}
          <a href={FB} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full hover:bg-white transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M22 12a10 10 0 1 0-11.6 9.9v-7h-2.2V12h2.2V9.8c0-2.2 1.3-3.4 3.3-3.4.95 0 1.94.17 1.94.17v2.1h-1.09c-1.08 0-1.41.67-1.41 1.35V12h2.4l-.38 2.9h-2.02v7A10 10 0 0 0 22 12Z"/>
            </svg>
            Facebook
          </a>

          {/* Instagram */}
          <a href={IG} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full hover:bg-white transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm10 2H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3Zm-5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm6.5-.25a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z"/>
            </svg>
            Instagram
          </a>

          {/* LinkedIn */}
          <a href={LI} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full hover:bg-white transition">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5ZM.5 8h4V24h-4V8Zm7.5 0h3.8v2.2h.1c.5-1 1.8-2.2 3.8-2.2 4.1 0 4.8 2.7 4.8 6.3V24h-4v-5.7c0-1.4 0-3.2-1.9-3.2-1.9 0-2.1 1.5-2.1 3.1V24h-4V8Z"/>
            </svg>
            LinkedIn
          </a>

          {/* YouTube */}
          <a href={YT} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 bg-orange-50 px-3 py-1 rounded-full hover:bg-white transition">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M23.5 7.1a4 4 0 0 0-2.8-2.8C18.7 3.8 12 3.8 12 3.8s-6.7 0-8.7.5A4 4 0 0 0 .5 7.1 41.1 41.1 0 0 0 0 12a41.1 41.1 0 0 0 .5 4.9 4 4 0 0 0 2.8 2.8c2 .5 8.7.5 8.7.5s6.7 0 8.7-.5a4 4 0 0 0 2.8-2.8A41.1 41.1 0 0 0 24 12a41.1 41.1 0 0 0-.5-4.9ZM9.6 15.5V8.5L15.9 12l-6.3 3.5Z"/>
            </svg>
            YouTube
          </a>
        </div>
      </div>
    </div>
  );
}
