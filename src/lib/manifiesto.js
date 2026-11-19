// El manifiesto del módulo: lo que la plataforma necesita para mostrarlo en su menú. Cada ítem dice su ruta dentro del
// módulo y el permiso de la plataforma que lo muestra (null: lo ve cualquier persona con sesión). La plataforma oculta el
// ítem si falta el permiso, y la página lo vuelve a comprobar en el servidor: el menú no es la seguridad.
//
// Dónde aparece cada ítem en el menú:
// - `grupo` (del manifiesto) es la sección por defecto: si no existe en la plataforma, se crea una nueva antes de AJUSTES;
// - `grupo` de un ítem lo manda a otra sección: una de la plataforma (PERIODO, HORARIOS...) u otra propia (un módulo puede
//   crear varias, como EJEMPLO y PRUEBA aquí);
// - `despues_de` lo pone justo después de un ítem de esa sección (su href, como "/datos-maestros"); si no, va al final.
// Las secciones e ítems de la plataforma están en /kit/menu.json (la página «Menú de la plataforma» los muestra). El
// administrador de la plataforma puede juntar todos los ítems del módulo en la sección MÓDULOS desde Ajustes avanzados.
export const MANIFIESTO = {
  codigo: "ejemplo",
  nombre: "Módulo de ejemplo",
  version: "0.2.0",
  grupo: "EJEMPLO",
  items: [
    { etiqueta: "Ejemplo: inicio", ruta: "", permiso: null, descripcion: "Textos de relleno y la sesión de quien mira." },
    {
      etiqueta: "Menú de la plataforma",
      ruta: "menu",
      permiso: null,
      descripcion: "Las secciones e ítems del menú de la plataforma, para ubicar los del módulo.",
    },
    {
      etiqueta: "Ejemplo: datos",
      ruta: "datos",
      permiso: "catalogo.ver",
      descripcion: "Un dato de solo lectura.",
      grupo: "PERIODO",
      despues_de: "/datos-maestros",
    },
    {
      etiqueta: "Ejemplo: restringida",
      ruta: "restringida",
      permiso: "usuarios.gestionar",
      descripcion: "Solo para quien administra usuarios.",
      grupo: "PRUEBA", // otra sección propia: un módulo puede crear varias
    },
  ],
};

export const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna " +
  "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
