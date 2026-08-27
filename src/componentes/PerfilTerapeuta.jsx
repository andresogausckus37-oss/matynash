import { CONFIG } from "../datos/servicios";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

export default function PerfilTerapeuta() {
  const { terapeuta } = CONFIG;
  const whatsappLink = `https://wa.me/${terapeuta.whatsapp}?text=Hola!%20Quisiera%20consultar%20sobre%20tus%20servicios`;

  return (
    <>
      {/* ✅ Espacio entre Navbar y Banner */}
<div className="h-1 md:h-8 bg-white"></div>

<section className="w-full bg-white">
  {/* 🖼️ Banner con tu imagen de Postimages */}
  <div className="w-full overflow-hidden">
    <img
      src="https://i.postimg.cc/RFMptW1W/IMG-20260825-WA0001(1).jpg"
      alt={`Portada de ${terapeuta.nombre}`}
      className="w-full h-68 sm:h-56 md:h-72 object-cover"
    />
  </div>
  

        {/* 👤 INFORMACIÓN DEL TERAPEUTA */}
        <div className="max-w-4xl mx-auto px-6 sm:px-6 py-5 md:py-2 bg-blanco">
          
          {/* NOMBRE — SIN negrita, separado */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl text-texto">
              {terapeuta.nombre}
            </h1>
          </div>

          {/* BIO — Separada del nombre */}
          <div className="text-center mb-10">
            <p className="max-w-2xl mx-auto text-texto-suave leading-relaxed text-base">
              {terapeuta.bio}
            </p>
          </div>

          {/* SEPARADOR */}
          <div className="w-24 h-0.5 bg-primario-claro mx-auto mb-8"></div>

          {/* 🔗 REDES SOCIALES — Separadas, círculos blancos, íconos negros */}
          <div className="flex flex-col items-center">
            <p className="text-xs uppercase tracking-widest text-texto-suave mb-5">
              SEGUIME EN MIS REDES
            </p>
            <div className="flex items-center justify-center gap-5">
              {/* Instagram — Círculo blanco, ícono negro */}
              {terapeuta.instagram && (
                <a
                  href={terapeuta.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-blanco border border-borde text-texto hover:border-primario hover:text-primario transition-colors shadow-sm"
                >
                  <FaInstagram size={20} />
                </a>
              )}

              {/* TikTok — Círculo blanco, ícono negro */}
              {terapeuta.tiktok && (
                <a
                  href={terapeuta.tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-blanco border border-borde text-texto hover:border-primario hover:text-primario transition-colors shadow-sm"
                >
                  <FaTiktok size={20} />
                </a>
              )}

              {/* Facebook — Círculo blanco, ícono negro */}
              {terapeuta.facebook && (
                <a
                  href={terapeuta.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-blanco border border-borde text-texto hover:border-primario hover:text-primario transition-colors shadow-sm"
                >
                  <FaFacebookF size={20} />
                </a>
              )}

              {/* WhatsApp — Círculo blanco, ícono negro */}
              {terapeuta.whatsapp && (
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-blanco border border-borde text-texto hover:border-primario hover:text-primario transition-colors shadow-sm"
                >
                  <FaWhatsapp size={20} />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}