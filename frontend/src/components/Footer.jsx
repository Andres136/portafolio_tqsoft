// src/components/Footer.jsx
// src/components/Footer.jsx
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-black text-orange-300 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
        <p>© {year} TQSoft. Todos los derechos reservados.</p>
        <p className="text-orange-200/90">Hecho con React + Tailwind + Django REST</p>
      </div>
    </footer>
  );
}
