import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
    return (
        <div className={styles.notFoundContainer}>
            <h1 className={styles.errorCode}>404</h1>
            <h2 className={styles.title}>¡Ups! Página no encontrada</h2>
            <p className={styles.description}>
                Lo sentimos, la página que estás buscando parece que se ha perdido en el espacio.
                Verifica la URL o regresa a la página principal.
            </p>
            <Link href="/" className={styles.button}>
                Volver al inicio
            </Link>
        </div>
    );
}