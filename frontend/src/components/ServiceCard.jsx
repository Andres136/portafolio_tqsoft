// src/components/ServiceCard.jsx
import { Link } from "react-router-dom";

export default function ServiceCard({ slug, title, desc, img }) {
  const to = `/services/${slug}`;

  return (
    <article className="p-3 rounded-2xl bg-white shadow hover:shadow-lg transition">
      {img && (
        <Link to={to} className="block">
          <img
            src={img}
            alt={title}
            className="w-full h-36 object-cover rounded-xl"
            loading="lazy"
          />
        </Link>
      )}

      <h3 className="text-lg font-bold mt-3">{title}</h3>
      <p className="text-sm text-gray-600">{desc}</p>

      <Link
        to={to}
        className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-xl border border-orange-500 text-orange-600 hover:bg-orange-50"
      >
        Saber más →
      </Link>
    </article>
  );
}
