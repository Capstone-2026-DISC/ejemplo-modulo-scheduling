import { LOREM } from "../../lib/manifiesto";
import { obtener_perfil, tiene_permiso } from "../../lib/plataforma";
import styles from "../../styles/modulo.module.css";

export const dynamic = "force-dynamic";

const PERMISO = "usuarios.gestionar";

// Una página que solo ve quien tiene un permiso. El menú de la plataforma ya la oculta, pero la comprobación que vale es
// esta, en el servidor: alguien puede escribir la dirección a mano.
export default async function Restringida() {
  const perfil = await obtener_perfil();
  if (!tiene_permiso(perfil, PERMISO)) {
    return (
      <p className={styles.aviso} role="alert">
        No tiene el permiso «{PERMISO}»: esta página es solo para quien administra usuarios.
      </p>
    );
  }
  return (
    <section className={styles.tarjeta}>
      <h1 className={styles.titulo}>Consectetur adipiscing</h1>
      <p>{LOREM}</p>
    </section>
  );
}
