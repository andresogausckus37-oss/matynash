import { CONFIG } from "../datos/servicios";
import {
  FaInstagram,
  FaFacebookF,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";

export default function PerfilTerapeuta() {
  const { terapeuta } = CONFIG;

  // WhatsApp
  const mensajeWhatsApp = encodeURIComponent(
    "Hola Maty!\n\nVengo de matynash.com y quisiera hacerte una consulta. Gracias 😊"
  );

  const whatsappLink = `https://wa.me/5493548619293?text=${mensajeWhatsApp}`;

  // Video de Cloudinary
  const videoCloudinaryUrl = terapeuta.videoBannerUrl || "";

  // Redes sociales
  const redes = [
    {
      nombre: "Instagram",
      url: terapeuta.instagram,
      icono: <FaInstagram />,
    },
    {
      nombre: "TikTok",
      url: terapeuta.tiktok,
      icono: <FaTiktok />,
    },
    {
      nombre: "Facebook",
      url: terapeuta.facebook,
      icono: <FaFacebookF />,
    },
    {
      nombre: "WhatsApp",
      url: whatsappLink,
      icono: <FaWhatsapp />,
    },
  ];

  return (
    <main className="w-full bg-white">
      {/* Espacio debajo del navbar */}
      <div className="h-1 sm:h-4 md:h-8 bg-white" />

      {/* =========================
          BANNER / VIDEO
      ========================== */}
      <section className="w-full overflow-hidden">
        {videoCloudinaryUrl ? (
          <video
            src={videoCloudinaryUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={`Video de presentación de ${terapeuta.nombre}`}
            className="
              block
              w-full
              h-[240px]
              sm:h-[300px]
              md:h-[380px]
              lg:h-[440px]
              object-cover
              object-center
            "
          />
        ) : (
          <div
            className="
              w-full
              h-[240px]
              sm:h-[300px]
              md:h-[380px]
              lg:h-[440px]
              bg-fondo
            "
            aria-hidden="true"
          />
        )}
      </section>

      {/* =========================
          INFORMACIÓN
      ========================== */}
      <section className="w-full bg-blanco">
        <div
          className="
            max-w-4xl
            mx-auto
            px-5
            sm:px-6
            md:px-8
            pt-7
            pb-10
            md:pt-8
            md:pb-14
          "
        >
          {/* Nombre */}
          <div className="text-center">
            <h1
              className="
                text-3xl
                sm:text-4xl
                md:text-5xl
                leading-tight
                text-texto
              "
            >
              {terapeuta.nombre}
            </h1>
          </div>

          {/* Bio */}
          {terapeuta.bio && (
            <div className="mt-5 sm:mt-6 text-center">
              <p
                className="
                  max-w-2xl
                  mx-auto
                  text-sm
                  sm:text-base
                  md:text-lg
                  leading-7
                  sm:leading-8
                  text-texto-suave
                "
              >
                {terapeuta.bio}
              </p>
            </div>
          )}

          {/* Separador */}
          <div
            className="
              w-16
              sm:w-20
              h-px
              mx-auto
              my-8
              sm:my-10
              bg-primario-claro
            "
          />

          {/* Redes sociales */}
          <div className="flex flex-col items-center">
            <p
              className="
                mb-5
                text-[11px]
                sm:text-xs
                uppercase
                tracking-[0.18em]
                text-texto-suave
                text-center
              "
            >
              Seguime en mis redes
            </p>

            <div
              className="
                flex
                items-center
                justify-center
                gap-3
                sm:gap-4
              "
            >
              {redes.map(
                (red) =>
                  red.url && (
                    <a
                      key={red.nombre}
                      href={red.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={red.nombre}
                      title={red.nombre}
                      className="
                        flex
                        items-center
                        justify-center
                        w-11
                        h-11
                        sm:w-12
                        sm:h-12
                        rounded-full
                        bg-blanco
                        border
                        border-borde
                        text-texto
                        shadow-sm
                        transition-all
                        duration-200
                        hover:border-primario
                        hover:text-primario
                        hover:-translate-y-0.5
                        active:scale-95
                        focus:outline-none
                        focus:ring-2
                        focus:ring-primario
                        focus:ring-offset-2
                      "
                    >
                      <span className="text-[19px] sm:text-[20px]">
                        {red.icono}
                      </span>
                    </a>
                  )
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}