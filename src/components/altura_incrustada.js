"use client";

import { useEffect } from "react";

// Dentro del panel de la plataforma, el módulo se muestra en un marco: cada vez que cambia su alto se lo avisa a la página
// que lo contiene (mismo origen), para que el marco crezca y no haya una segunda barra de desplazamiento.
export default function AlturaIncrustada() {
  useEffect(() => {
    if (window.parent === window) return undefined;
    const avisar = () =>
      window.parent.postMessage({ tipo: "modulo-altura", altura: document.documentElement.scrollHeight }, window.location.origin);
    const observador = new ResizeObserver(avisar);
    observador.observe(document.body);
    avisar();
    return () => observador.disconnect();
  }, []);
  return null;
}
