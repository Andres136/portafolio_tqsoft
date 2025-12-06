import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import Logo from "./Logo";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);     // menú móvil (overlay)
  const [deskServicesOpen, setDeskServicesOpen] = useState(false); // dropdown escritorio
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false); // acordeón móvil

  // Clases de enlaces
  const desktopLink = ({ isActive }) =>
    `px-3 py-2 rounded-xl font-semibold text-sm transition-colors ${
      isActive ? "text-orange-400" : "text-orange-200 hover:text-white"
    }`;

  const mobileLink = ({ isActive }) =>
    `block w-full text-left px-2 py-2 text-base font-semibold rounded-lg transition-colors ${
      isActive ? "text-orange-400" : "text-orange-100 hover:text-white"
    }`;

  const closeAll = () => {
    setMenuOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <>
      {/* BARRA SUPERIOR */}
      <header className="bg-black/95 backdrop-blur sticky top-0 z-50 shadow">
        <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3" aria-label="Inicio">
              <Logo />
            </Link>

            {/* Botón móvil */}
            <button
              className="md:hidden text-orange-400 text-2xl"
              onClick={() => setMenuOpen(true)}
              aria-label="Abrir menú"
            >
              ☰
            </button>

            {/* Navegación escritorio */}
            <nav
              className="hidden md:flex md:items-center md:justify-end md:gap-2"
              aria-label="Navegación principal"
            >
              <ul className="flex items-center gap-2">
                {/* Servicios (dropdown escritorio) */}
                <li className="relative">
                  <button
                    className="px-4 py-2 rounded-xl font-semibold text-sm text-orange-200 hover:text-white flex items-center gap-1"
                    onClick={() => setDeskServicesOpen(v => !v)}
                    aria-expanded={deskServicesOpen}
                    aria-haspopup="menu"
                  >
                    Servicios ▾
                  </button>
                  {deskServicesOpen && (
                    <div
                      role="menu"
                      className="absolute left-0 mt-2 w-64 bg-black border border-orange-500 rounded-2xl shadow-xl py-2"
                    >
                      <NavLink
                        to="/servicios"
                        onClick={closeAll}
                        className="block px-4 py-2 text-sm text-orange-200 hover:bg-orange-500/10 hover:text-white"
                      >
                        Todos los servicios
                      </NavLink>
                      <NavLink
                        to="/services/web"
                        onClick={closeAll}
                        className="block px-4 py-2 text-sm text-orange-200 hover:bg-orange-500/10 hover:text-white"
                      >
                        Desarrollo de software
                      </NavLink>
                      <NavLink
                        to="/services/ciberseguridad"
                        onClick={closeAll}
                        className="block px-4 py-2 text-sm text-orange-200 hover:bg-orange-500/10 hover:text-white"
                      >
                        Ciberseguridad
                      </NavLink>
                      <NavLink
                        to="/services/analitica-datos"
                        onClick={closeAll}
                        className="block px-4 py-2 text-sm text-orange-200 hover:bg-orange-500/10 hover:text-white"
                      >
                        Análisis de datos
                      </NavLink>
                      <NavLink
                        to="/services/redes-inalambricas"
                        onClick={closeAll}
                        className="block px-4 py-2 text-sm text-orange-200 hover:bg-orange-500/10 hover:text-white"
                      >
                        Redes inalámbricas
                      </NavLink>
                    </div>
                  )}
                </li>

                <li><NavLink to="/" className={desktopLink}>Home</NavLink></li>
                <li><NavLink to="/cursos" className={desktopLink}>Cursos</NavLink></li>
                <li><NavLink to="/portafolio" className={desktopLink}>Portafolio</NavLink></li>
                <li><NavLink to="/noticias" className={desktopLink}>Noticias TI</NavLink></li>
                <li><NavLink to="/sobre-mi" className={desktopLink}>Sobre mí</NavLink></li>
                <li><NavLink to="/ayuda" className={desktopLink}>Ayuda</NavLink></li>
                <li><NavLink to="/contacto" className={desktopLink}>Contacto</NavLink></li>

                {/* Botones Login / Registro */}
                <li className="ml-4 flex items-center gap-2">
                  <NavLink
                    to="/login"
                    className="px-4 py-2 rounded-2xl border border-orange-500 text-orange-300 hover:bg-orange-500/10 hover:text-white text-sm font-semibold"
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/registrarse"
                    className="px-4 py-2 rounded-2xl bg-orange-600 text-white hover:bg-orange-700 text-sm font-semibold"
                  >
                    Registrarse
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL: OVERLAY A PANTALLA COMPLETA */}
      {menuOpen && (
        <div className="fixed inset-0 z-[80] bg-black/95 md:hidden">
          {/* barra superior dentro del overlay */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-orange-600">
            <Link to="/" onClick={closeAll} className="flex items-center gap-2">
              <Logo />
            </Link>
            <button
              className="text-orange-400 text-2xl"
              onClick={closeAll}
              aria-label="Cerrar menú"
            >
              ✕
            </button>
          </div>

          {/* contenido scrollable del overlay */}
          <nav className="px-4 py-4 h-[calc(100vh-64px)] overflow-y-auto">
            <ul className="flex flex-col gap-3">
              {/* Servicios como acordeón */}
              <li>
                <button
                  className="w-full flex items-center justify-between px-2 py-3 text-lg font-bold text-orange-200 border-b border-zinc-700"
                  onClick={() => setMobileServicesOpen(v => !v)}
                  aria-expanded={mobileServicesOpen}
                >
                  <span>Servicios</span>
                  <span>{mobileServicesOpen ? "▴" : "▾"}</span>
                </button>
                {mobileServicesOpen && (
                  <div className="mt-2 ml-2 pl-3 border-l border-orange-600 space-y-1">
                    <NavLink
                      to="/servicios"
                      onClick={closeAll}
                      className="block text-sm text-orange-100 hover:text-white py-1"
                    >
                      Todos los servicios
                    </NavLink>
                    <NavLink
                      to="/services/web"
                      onClick={closeAll}
                      className="block text-sm text-orange-100 hover:text-white py-1"
                    >
                      Desarrollo de software
                    </NavLink>
                    <NavLink
                      to="/services/ciberseguridad"
                      onClick={closeAll}
                      className="block text-sm text-orange-100 hover:text-white py-1"
                    >
                      Ciberseguridad
                    </NavLink>
                    <NavLink
                      to="/services/analitica-datos"
                      onClick={closeAll}
                      className="block text-sm text-orange-100 hover:text-white py-1"
                    >
                      Análisis de datos
                    </NavLink>
                    <NavLink
                      to="/services/redes-inalambricas"
                      onClick={closeAll}
                      className="block text-sm text-orange-100 hover:text-white py-1"
                    >
                      Redes inalámbricas
                    </NavLink>
                  </div>
                )}
              </li>

              {/* Links principales */}
              <li><NavLink to="/" onClick={closeAll} className={mobileLink}>Home</NavLink></li>
              <li><NavLink to="/cursos" onClick={closeAll} className={mobileLink}>Cursos</NavLink></li>
              <li><NavLink to="/portafolio" onClick={closeAll} className={mobileLink}>Portafolio</NavLink></li>
              <li><NavLink to="/noticias" onClick={closeAll} className={mobileLink}>Noticias TI</NavLink></li>
              <li><NavLink to="/sobre-mi" onClick={closeAll} className={mobileLink}>Sobre mí</NavLink></li>
              <li><NavLink to="/ayuda" onClick={closeAll} className={mobileLink}>Ayuda</NavLink></li>
              <li><NavLink to="/contacto" onClick={closeAll} className={mobileLink}>Contacto</NavLink></li>

              {/* Botones grandes al final */}
              <li className="mt-4 space-y-3">
                <NavLink
                  to="/login"
                  onClick={closeAll}
                  className="block w-full text-center px-4 py-3 rounded-2xl border border-orange-500 text-orange-200 hover:bg-orange-500/10 hover:text-white text-base font-semibold"
                >
                  Iniciar sesión
                </NavLink>
                <NavLink
                  to="/registrarse"
                  onClick={closeAll}
                  className="block w-full text-center px-4 py-3 rounded-2xl bg-orange-600 text-white hover:bg-orange-700 text-base font-semibold"
                >
                  Registrarse
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
