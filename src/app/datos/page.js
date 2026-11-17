import { LOREM } from "../../lib/manifiesto";
import { leer_de_la_plataforma, obtener_perfil, tiene_permiso } from "../../lib/plataforma";
import styles from "../../styles/modulo.module.css";

export const dynamic = "force-dynamic";

const PERMISO = "catalogo.ver";

// Un dato de solo lectura y sin importancia: los bloques horarios del catálogo de la plataforma (A a G con sus horas).
// Muestra cómo leer de la API con el token de la persona y cómo responder si no tiene el permiso.
export default async function Datos() {
  const perfil = await obtener_perfil();
  if (!tiene_permiso(perfil, PERMISO)) {
    return <p className={styles.aviso}>Esta página necesita el permiso «{PERMISO}» de la plataforma.</p>;
  }
  const bloques = await leer_de_la_plataforma("/bloques");
  return (
    <div className={styles.pagina}>
      <section className={styles.tarjeta}>
        <h1 className={styles.titulo}>Dolor sit amet</h1>
        <p>{LOREM}</p>
      </section>
      <section className={styles.tarjeta} aria-labelledby="titulo-bloques">
        <h2 id="titulo-bloques" className={styles.subtitulo}>
          Bloques horarios (solo lectura)
        </h2>
        {bloques.ok ? (
          <table className={styles.tabla}>
            <thead>
              <tr>
                <th scope="col">Bloque</th>
                <th scope="col">Inicio</th>
                <th scope="col">Fin</th>
              </tr>
            </thead>
            <tbody>
              {bloques.datos.map((b) => (
                <tr key={b.codigo}>
                  <th scope="row">{b.codigo}</th>
                  <td>{b.hora_inicio}</td>
                  <td>{b.hora_fin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className={styles.aviso}>No se pudo leer el dato (respuesta {bloques.estado}).</p>
        )}
      </section>
    </div>
  );
}
