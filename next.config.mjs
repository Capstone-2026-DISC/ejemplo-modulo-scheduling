// El módulo vive bajo /m/<codigo> en el dominio de la plataforma: la plataforma le reenvía esa ruta (mismo origen, así recibe
// la sesión). RUTA_BASE se fija al construir la imagen; debe coincidir con el código del módulo en la plataforma.
const RUTA_BASE = process.env.RUTA_BASE ?? "/m/ejemplo";

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: RUTA_BASE,
  output: "standalone", // servidor mínimo y autocontenido para la imagen de Docker
  env: { RUTA_BASE },
};

export default nextConfig;
