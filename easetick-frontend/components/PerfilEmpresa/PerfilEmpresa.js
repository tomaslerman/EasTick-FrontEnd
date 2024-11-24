import styles from './PerfilEmpresa.module.css';

const PerfilEmpresa = ({ data }) => {
    const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <div className={styles.perfilContainer}>
            <div className={styles.perfilCard}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatar}>
                        {getInitials(data.nombre)}
                    </div>
                    <h2>{data.nombre}</h2>
                    <div className={styles.rolBadge}>
                        {data.empresa.tipo}
                    </div>
                </div>

                <div className={styles.infoSection}>
                    <div className={styles.infoGroup}>
                        <h3>Información de Contacto</h3>
                        <div className={styles.infoItem}>
                            <span>Email:</span>
                            <p>{data.correoelectronico}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <span>Rol:</span>
                            <div className={styles.rolInfo}>
                                <p>{data.empresa.tipo}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoGroup}>
                        <h3>Información Empresarial</h3>
                        <div className={styles.infoItem}>
                            <span>Nombre de la Empresa:</span>
                            <p>{data.empresa.nombre}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <span>Email Empresarial:</span>
                            <p>{data.empresa.correoelectronico}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PerfilEmpresa; 