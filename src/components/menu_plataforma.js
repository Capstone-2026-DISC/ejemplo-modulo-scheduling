"use client";

import { useEffect, useState } from "react";
import styles from "../styles/modulo.module.css";

const clave = (nombre) =>
  String(nombre ?? "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim()
    .toUpperCase();

// Lee /kit/menu.json de la plataforma (mismo origen, con la sesión de quien mira) y dibuja sus secciones, intercalando los
// ítems de este módulo (`propios`: { etiqueta, grupo, despues_de }) donde los pondría el menú. Fuera de la plataforma no
// hay kit: lo dice en vez de caerse.
export default function MenuPlataforma({ propios }) {
  const [menu, setMenu] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("/kit/menu.json", { credentials: "same-origin", cache: "no-store" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then(setMenu)
      .catch(() => setError(true));
  }, []);

  if (error) {
    return (
      <p className={styles.aviso}>
        No se pudo leer /kit/menu.json: abra el módulo desde la plataforma, con una sesión iniciada.
      </p>
    );
  }
  if (!menu) return <p>Cargando el menú de la plataforma…</p>;

  // las secciones de la plataforma, más las nuevas que crea este módulo (antes de AJUSTES)
  const secciones = menu.secciones.map((s) => ({ grupo: s.grupo, items: s.items.map((i) => ({ ...i, propio: false })) }));
  for (const p of propios) {
    let s = secciones.find((x) => clave(x.grupo) === clave(p.grupo));
    if (!s) {
      s = { grupo: String(p.grupo).toUpperCase(), items: [], nueva: true };
      const i = secciones.findIndex((x) => x.grupo === "AJUSTES");
      secciones.splice(i === -1 ? secciones.length : i, 0, s);
    }
    const despues = p.despues_de ? s.items.findIndex((i) => i.href === p.despues_de) : -1;
    s.items.splice(despues === -1 ? s.items.length : despues + 1, 0, { etiqueta: p.etiqueta, href: null, propio: true });
  }

  return (
    <section className={styles.tarjeta} aria-labelledby="titulo-menu">
      <h2 id="titulo-menu" className={styles.subtitulo}>
        Secciones e ítems
      </h2>
      <div className={styles.secciones}>
        {secciones.map((s) => (
          <div key={s.grupo}>
            <h3 className={styles.seccion}>
              <code>{s.grupo}</code>
              {s.nueva ? <span className={styles.etiqueta}>nueva, de este módulo</span> : null}
            </h3>
            <table className={styles.tabla}>
              <thead>
                <tr>
                  <th scope="col">Ítem</th>
                  <th scope="col">
                    <code>despues_de</code>
                  </th>
                </tr>
              </thead>
              <tbody>
                {s.items.map((i) => (
                  <tr key={`${i.etiqueta}-${i.href}`} className={i.propio ? styles.propio : undefined}>
                    <td>
                      {i.etiqueta}
                      {i.propio ? <span className={styles.etiqueta}>este módulo</span> : null}
                    </td>
                    <td>{i.href ? <code>{i.href}</code> : "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}
