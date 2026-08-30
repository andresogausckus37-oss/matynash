import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  detectarReferenciaDesdeURL,
} from "../utilidades/referencias";

export default function ReferenciaGlobal() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const codigo =
      detectarReferenciaDesdeURL(
        location.pathname,
        location.search
      );

    if (!codigo) return;

    const parametros =
      new URLSearchParams(
        location.search
      );

    // Si la URL ya tiene la referencia correcta,
    // no hacemos nada.
    if (
      parametros.get("ref") === codigo
    ) {
      return;
    }

    // Conservamos cualquier otro parámetro
    // existente y agregamos la referencia.
    parametros.set("ref", codigo);

    navigate(
      {
        pathname: location.pathname,
        search: `?${parametros.toString()}`,
        hash: location.hash,
      },
      {
        replace: true,
      }
    );
  }, [
    location.pathname,
    location.search,
    location.hash,
    navigate,
  ]);

  return null;
}