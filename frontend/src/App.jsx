// src/App.jsx
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import Topbar from "./components/Topbar";
import Footer from "./components/Footer";
import ChatbotFloat from "./components/ChatbotFloat";

// páginas...
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Courses from "./pages/Courses";
import Certifications from "./pages/Certifications";
import Help from "./pages/Help";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import PaymentStatus from "./pages/PaymentStatus";
import ProductDetail from "./pages/ProductDetail";
import OrderSuccess from "./pages/OrderSuccess";

// ✅ OJO: tu archivo se llama "Courses.View.jsx"
import CourseView from "./pages/CoursesView";

import Portfolio from "./pages/Portfolio";
import Experience from "./pages/Experience";

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Topbar />
        <Navbar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sobre-mi" element={<About />} />
            <Route path="/noticias" element={<News />} />

            {/* Servicios y productos */}
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/servicios" element={<Services />} />
            <Route path="/producto/:id" element={<ProductDetail />} />

            {/* Checkout / Pagos */}
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orden-exitosa" element={<OrderSuccess />} />
            <Route
              path="/payment-status/:reference"
              element={<PaymentStatus />}
            />

            {/* Cursos */}
            <Route path="/cursos" element={<Courses />} />
            <Route path="/curso/:slug" element={<CourseView />} />

            {/* Portafolio / Experiencia */}
            <Route path="/portafolio" element={<Portfolio />} />
            <Route path="/experiencia" element={<Experience />} />

            {/* Protegidas (opcional) */}
            <Route element={<ProtectedRoute />}>
              {/* <Route path="/certificaciones" element={<Certifications />} /> */}
            </Route>

            {/* Pública */}
            <Route path="/certificaciones" element={<Certifications />} />

            {/* Ayuda / Contacto / Auth */}
            <Route path="/ayuda" element={<Help />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registrarse" element={<Register />} />
          </Routes>
        </main>

        <Footer />
        <ChatbotFloat greeting="¡Hola! ¿En qué puedo ayudarte?" />
      </div>
    </AuthProvider>
  );
}
