// El manifiesto del módulo: lo que la plataforma necesita para mostrarlo en su menú. Cada ítem dice su ruta dentro del
// módulo y el permiso de la plataforma que lo muestra (null: lo ve cualquier persona con sesión). La plataforma oculta el
// ítem si falta el permiso, y la página lo vuelve a comprobar en el servidor: el menú no es la seguridad.
export const MANIFIESTO = {
  codigo: "ejemplo",
  nombre: "Módulo de ejemplo",
  version: "0.1.0",
  grupo: "MÓDULOS",
  items: [
    { etiqueta: "Ejemplo: inicio", ruta: "", permiso: null, descripcion: "Textos de relleno y la sesión de quien mira." },
    { etiqueta: "Ejemplo: datos", ruta: "datos", permiso: "catalogo.ver", descripcion: "Un dato de solo lectura." },
    {
      etiqueta: "Ejemplo: restringida",
      ruta: "restringida",
      permiso: "usuarios.gestionar",
      descripcion: "Solo para quien administra usuarios.",
    },
  ],
};

export const LOREM =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna " +
  "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.";
