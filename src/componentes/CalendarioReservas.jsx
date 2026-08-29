import { useMemo, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";
import { CONFIG_CALENDARIO } from "../datos/calendario";

// ==========================================
// UTILIDADES
// ==========================================

const NOMBRES_DIAS = [
  "domingo",
  "lunes",
  "martes",
  "miercoles",
  "jueves",
  "viernes",
  "sabado",
];

const NOMBRES_CORTOS = [
  "Dom",
  "Lun",
  "Mar",
  "Mié",
  "Jue",
  "Vie",
  "Sáb",
];

const MESES_CORTOS = [
  "ene",
  "feb",
  "mar",
  "abr",
  "may",
  "jun",
  "jul",
  "ago",
  "sep",
  "oct",
  "nov",
  "dic",
];

function obtenerInicioSemana(fecha) {
  const nuevaFecha = new Date(fecha);

  const dia = nuevaFecha.getDay();

  const diferencia =
    dia === 0
      ? -6
      : 1 - dia;

  nuevaFecha.setDate(
    nuevaFecha.getDate() + diferencia
  );

  nuevaFecha.setHours(0, 0, 0, 0);

  return nuevaFecha;
}

function sumarDias(fecha, cantidad) {
  const nuevaFecha = new Date(fecha);

  nuevaFecha.setDate(
    nuevaFecha.getDate() + cantidad
  );

  return nuevaFecha;
}

function formatearFechaISO(fecha) {
  const year = fecha.getFullYear();

  const month = String(
    fecha.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    fecha.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

// ==========================================
// COMPONENTE
// ==========================================

export default function CalendarioReservas({
  tipoSesion,
  valor,
  onChange,
}) {
  const [inicioSemana, setInicioSemana] =
    useState(() =>
      obtenerInicioSemana(new Date())
    );

  const sesion =
    CONFIG_CALENDARIO.sesiones[tipoSesion];

  const diasSemana = useMemo(() => {
    return Array.from(
      { length: 7 },
      (_, indice) =>
        sumarDias(inicioSemana, indice)
    );
  }, [inicioSemana]);

  if (!sesion) {
    return (
      <div className="border border-red-200 bg-red-50 text-red-600 rounded-lg p-4 text-sm">
        No se encontró la configuración de horarios para esta sesión.
      </div>
    );
  }

  const cambiarSemana = (direccion) => {
    setInicioSemana((actual) =>
      sumarDias(
        actual,
        direccion === "siguiente"
          ? 7
          : -7
      )
    );
  };

  const seleccionarHorario = (
    fecha,
    hora,
    estado
  ) => {
    if (estado !== "disponible") {
      return;
    }

    onChange?.({
      fecha: formatearFechaISO(fecha),
      hora,
      duracion: sesion.duracion,
      tipoSesion,
      nombreSesion: sesion.nombre,
    });
  };

  const tituloSemana = `${inicioSemana.getDate()} ${
    MESES_CORTOS[inicioSemana.getMonth()]
  } — ${diasSemana[6].getDate()} ${
    MESES_CORTOS[diasSemana[6].getMonth()]
  }`;

  return (
    <section
      className="
        border
        border-borde
        rounded-xl
        bg-white
        overflow-hidden
      "
    >
      {/* ENCABEZADO */}

      <div
        className="
          px-4
          sm:px-5
          py-4
          border-b
          border-borde
        "
      >
        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >
          <div>
            <h3 className="text-base sm:text-lg font-medium text-texto">
              Elegí día y horario
            </h3>

            <p className="text-xs sm:text-sm text-texto-suave mt-1">
              {sesion.nombre} · {sesion.duracion} min
            </p>
          </div>

          <div
            className="
              flex
              items-center
              gap-1
            "
          >
            <button
              type="button"
              onClick={() =>
                cambiarSemana("anterior")
              }
              className="
                w-9
                h-9
                rounded-md
                border
                border-borde
                flex
                items-center
                justify-center
                text-texto-suave
                hover:text-primario
                hover:border-primario
                transition-colors
              "
              aria-label="Semana anterior"
            >
              <ChevronLeft size={18} />
            </button>

            <button
              type="button"
              onClick={() =>
                cambiarSemana("siguiente")
              }
              className="
                w-9
                h-9
                rounded-md
                border
                border-borde
                flex
                items-center
                justify-center
                text-texto-suave
                hover:text-primario
                hover:border-primario
                transition-colors
              "
              aria-label="Semana siguiente"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        <p
          className="
            text-sm
            text-texto-suave
            mt-3
          "
        >
          Semana {tituloSemana}
        </p>
      </div>

      {/* DÍAS */}

      <div
        className="
          grid
          grid-cols-7
          border-b
          border-borde
        "
      >
        {diasSemana.map((fecha) => {
          const indiceDia =
            fecha.getDay();

          const nombreDia =
            NOMBRES_DIAS[indiceDia];

          const configuracionDia =
            CONFIG_CALENDARIO.dias[nombreDia];

          return (
            <div
              key={fecha.toISOString()}
              className="
                text-center
                py-3
                px-1
                border-r
                border-borde
                last:border-r-0
              "
            >
              <p
                className="
                  text-[10px]
                  sm:text-xs
                  uppercase
                  tracking-wide
                  text-texto-suave
                "
              >
                {NOMBRES_CORTOS[indiceDia]}
              </p>

              <p
                className="
                  text-sm
                  sm:text-base
                  font-medium
                  text-texto
                  mt-1
                "
              >
                {fecha.getDate()}
              </p>

              <span
                className={`
                  inline-block
                  mt-1
                  text-[9px]
                  sm:text-[10px]
                  ${
                    configuracionDia.estado ===
                    "disponible"
                      ? "text-green-600"
                      : configuracionDia.estado ===
                        "reservado"
                      ? "text-gray-500"
                      : "text-red-500"
                  }
                `}
              >
                {configuracionDia.texto}
              </span>
            </div>
          );
        })}
      </div>

      {/* HORARIOS */}

      <div
        className="
          grid
          grid-cols-1
          md:grid-cols-7
        "
      >
        {diasSemana.map((fecha) => {
          const indiceDia =
            fecha.getDay();

          const nombreDia =
            NOMBRES_DIAS[indiceDia];

          const configuracionDia =
            CONFIG_CALENDARIO.dias[nombreDia];

          const estado =
            configuracionDia.estado;

          return (
            <div
              key={formatearFechaISO(fecha)}
              className="
                p-3
                sm:p-4
                border-b
                md:border-b-0
                md:border-r
                border-borde
                last:border-r-0
              "
            >
              {/* CABECERA MÓVIL */}

              <div
                className="
                  md:hidden
                  flex
                  items-center
                  justify-between
                  mb-3
                "
              >
                <span className="text-sm font-medium text-texto">
                  {NOMBRES_CORTOS[indiceDia]}{" "}
                  {fecha.getDate()}
                </span>

                <span
                  className={`
                    text-xs
                    ${
                      estado === "disponible"
                        ? "text-green-600"
                        : estado === "reservado"
                        ? "text-gray-500"
                        : "text-red-500"
                    }
                  `}
                >
                  {configuracionDia.texto}
                </span>
              </div>

              {estado === "noDisponible" ? (
                <div
                  className={`
                    min-h-[84px]
                    rounded-lg
                    border
                    flex
                    items-center
                    justify-center
                    text-center
                    px-2
                    ${CONFIG_CALENDARIO.colores.noDisponible}
                  `}
                >
                  <span className="text-xs font-medium">
                    No disponible
                  </span>
                </div>
              ) : (
                <div className="space-y-2">
                  {sesion.horarios.map(
                    (hora) => {
                      const fechaISO =
                        formatearFechaISO(fecha);

                      const seleccionado =
                        valor?.fecha ===
                          fechaISO &&
                        valor?.hora === hora;

                      const estadoHorario =
                        seleccionado
                          ? "seleccionado"
                          : estado;

                      return (
                        <button
                          key={hora}
                          type="button"
                          disabled={
                            estado !==
                            "disponible"
                          }
                          onClick={() =>
                            seleccionarHorario(
                              fecha,
                              hora,
                              estado
                            )
                          }
                          className={`
                            w-full
                            rounded-lg
                            border
                            px-2
                            py-2.5
                            text-left
                            transition-all
                            ${
                              CONFIG_CALENDARIO
                                .colores[
                                estadoHorario
                              ]
                            }
                            ${
                              estado ===
                              "disponible"
                                ? "hover:shadow-sm cursor-pointer"
                                : "cursor-not-allowed"
                            }
                          `}
                        >
                          <div
                            className="
                              flex
                              items-center
                              gap-1.5
                            "
                          >
                            <Clock3
                              size={14}
                              strokeWidth={1.8}
                            />

                            <span className="text-sm font-medium">
                              {hora}
                            </span>
                          </div>

                          <span
                            className="
                              block
                              text-[10px]
                              mt-1
                            "
                          >
                            {seleccionado
                              ? CONFIG_CALENDARIO
                                  .textos
                                  .seleccionado
                              : CONFIG_CALENDARIO
                                  .textos[
                                  estado
                                ]}
                          </span>
                        </button>
                      );
                    }
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* SELECCIÓN */}

      {valor?.fecha &&
        valor?.hora && (
          <div
            className="
              border-t
              border-borde
              bg-green-50
              px-4
              sm:px-5
              py-3
              text-sm
              text-green-700
            "
          >
            Seleccionaste{" "}
            <span className="font-medium">
              {valor.fecha}
            </span>{" "}
            a las{" "}
            <span className="font-medium">
              {valor.hora}
            </span>
          </div>
        )}
    </section>
  );
}