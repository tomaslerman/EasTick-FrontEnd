import styles from './TituloClientes.module.css';

const TituloClientes = () => {
    return (
        <div className={styles.tituloClientes}>
            <div className={styles.columna}>
                <span>Nombre</span>
                <span className={styles.flechaAbajo}>▼</span>
            </div>
            <div className={styles.columna}>
                <span>Tipo</span>
            </div>
            <div className={styles.columna}>
                <span>Ultimo ticket</span>
                <span className={styles.flechaAbajo}>▼</span>
            </div>
        </div>
    );
};

export default TituloClientes;
