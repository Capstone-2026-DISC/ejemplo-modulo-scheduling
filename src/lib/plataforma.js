import "server-only";
import { cookies } from "next/headers";

// Todo lo que el módulo necesita de la plataforma, en un solo lugar. El módulo no tiene base de datos ni login propios:
// la plataforma le reenvía la cookie de sesión de la persona (mismo origen) y el módulo llama a la API de la plataforma
// con ese token, así cada lectura respeta los permisos y el departamento de quien mira.
//
// API_URL es la dirección interna de la API de la plataforma (en docker compose, http://api:8000).

const API_URL = process.env.API_URL ?? "http://api:8000";
const ESPERA_MS = 8000;

async function leer_token() {
  return (await cookies()).get("access_token")?.value ?? null;
}

// { ok, estado, datos } de una lectura a la API de la plataforma. Nunca lanza: el módulo muestra el error en vez de caerse.
export async function leer_de_la_plataforma(ruta) {
  const token = await leer_token();
  if (!token) return { ok: false, estado: 401, datos: null };
  try {
    const respuesta = await fetch(`${API_URL}${ruta}`, {
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
      signal: AbortSignal.timeout(ESPERA_MS),
    });
    const datos = respuesta.ok ? await respuesta.json() : null;
    return { ok: respuesta.ok, estado: respuesta.status, datos };
  } catch {
    return { ok: false, estado: 503, datos: null };
  }
}

// Quién está mirando: nombre, rol, departamento y permisos (GET /auth/yo de la plataforma). null sin sesión válida.
export async function obtener_perfil() {
  const r = await leer_de_la_plataforma("/auth/yo");
  return r.ok ? r.datos : null;
}

// Los permisos llegan como { "catalogo.ver": [departamentos...] }: tenerlo es que la clave exista.
export function tiene_permiso(perfil, permiso) {
  return Boolean(perfil?.permisos && permiso in perfil.permisos);
}
