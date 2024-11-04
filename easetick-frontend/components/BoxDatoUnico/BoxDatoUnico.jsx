import styles from './boxDatoUnico.module.css';

export default function BoxDatoUnico({ texto, dato, useBoxStyle = false }) {
    const containerClass = useBoxStyle ? styles.box : styles.container;
    
    return (
        <div className={containerClass}>
            {useBoxStyle ? (
                <>
                    <h2>{texto}</h2>
                    <h1>{dato}</h1>
                </>
            ) : (
                <>
                    <p className={styles.texto}>{texto}</p>
                    <p className={styles.dato}>{dato}</p>
                </>
            )}
        </div>
    );
}