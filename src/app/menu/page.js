import MenuPlataforma from "../../components/menu_plataforma";
import { MANIFIESTO } from "../../lib/manifiesto";
import styles from "../../styles/modulo.module.css";

// Menú de la plataforma: sus secciones e ítems (de /kit/menu.json), con dónde cae cada ítem de este módulo según su
// manifiesto. Sirve para elegir `grupo` y `despues_de` sin adivinar los nombres.
export default function Menu() {
  const propios = MANIFIESTO.items.map((i) => ({
    etiqueta: i.etiqueta,
    grupo: i.grupo ?? MANIFIESTO.grupo,
    despues_de: i.despues_de ?? null,
  }));
  return (
    <div className={styles.pagina}>
      <section className={styles.tarjeta}>
        <h1 className={styles.titulo}>Menú de la plataforma</h1>
        <p>
          Cada ítem del manifiesto puede elegir su sección con <code>grupo</code> (una de estas o una nueva) y su posición con{" "}
          <code>despues_de</code> (el href de un ítem de esa sección). Abajo están las secciones de la plataforma y, marcados,
          los ítems de este módulo donde los ubica su manifiesto. El administrador puede juntarlos todos en la sección
          MÓDULOS desde Ajustes avanzados.
        </p>
      </section>
      <MenuPlataforma propios={propios} />
    </div>
  );
}
