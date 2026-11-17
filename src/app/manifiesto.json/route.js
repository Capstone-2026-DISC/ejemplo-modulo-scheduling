import { MANIFIESTO } from "../../lib/manifiesto";

// GET <RUTA_BASE>/manifiesto.json: la plataforma lo lee para armar su menú. Es público dentro de la red interna.
export function GET() {
  return Response.json(MANIFIESTO, { headers: { "Cache-Control": "max-age=60" } });
}
