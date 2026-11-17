import { LOREM } from "../lib/manifiesto";
import { obtener_perfil } from "../lib/plataforma";
import styles from "../styles/modulo.module.css";

export const dynamic = "force-dynamic"; // depende de la sesión de quien mira

// Inicio: textos de relleno y la sesión de quien mira, leída de la plataforma.
export default async function Inicio() {
  const perfil = await obtener_perfil();
  return (
    <div className={styles.pagina}>
      <section className={styles.tarjeta}>
        <h1 className={styles.titulo}>Lorem ipsum</h1>
        <p>{LOREM}</p>
        <p>{LOREM}</p>
      </section>
      <section className={styles.tarjeta} aria-labelledby="titulo-sesion">
        <h2 id="titulo-sesion" className={styles.subtitulo}>
          Su sesión, según la plataforma
        </h2>
        {perfil ? (
          <dl className={styles.datos}>
            <dt>Nombre</dt>
            <dd>{perfil.nombre}</dd>
            <dt>Rol</dt>
            <dd>{perfil.rol}</dd>
            <dt>Departamento</dt>
            <dd>{perfil.departamento_id ?? "todos (cuenta global)"}</dd>
            <dt>Permisos</dt>
            <dd>{Object.keys(perfil.permisos ?? {}).length}</dd>
          </dl>
        ) : (
          <p className={styles.aviso}>No hay una sesión válida: entre a la plataforma y vuelva a abrir el módulo.</p>
        )}
      </section>
    </div>
  );
}
