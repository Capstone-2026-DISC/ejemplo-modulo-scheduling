// GET <RUTA_BASE>/salud: el chequeo de salud del contenedor.
export function GET() {
  return Response.json({ ok: true });
}
