import AlturaIncrustada from "../components/altura_incrustada";
import styles from "../styles/modulo.module.css";

export const metadata = { title: "Módulo de ejemplo | DISC Scheduling" };

// Sin menú ni encabezado propios: los pone la plataforma, que muestra el módulo dentro de su panel. Los colores salen del
// kit de la plataforma (/kit/tema.css, mismo origen), así el módulo se ve como parte del sistema y cambia con él.
export default function Layout({ children }) {
  return (
    <html lang="es">
      <head>
        <link rel="stylesheet" href="/kit/tema.css" />
      </head>
      <body className={styles.cuerpo}>
        {children}
        <AlturaIncrustada />
      </body>
    </html>
  );
}
