import styles from './ListadoClientes.module.css';

const ListadoClientes = ({ clientes }) => {
    return (
        <div className={styles.tableWrapper}>
            <div className={styles.listadoClientes}>
                {clientes && clientes.length > 0 ? (
                    clientes.map((cliente, index) => (
                        <div key={index} className={styles.clienteRow}>
                            <div className={styles.clienteNombre}>
                                <a href="#" className={styles.nombreLink}>
                                    {cliente.empresa.nombre}
                                </a>
                            </div>
                            <div className={styles.clienteTipo}>
                                {cliente.empresa.tipo}
                            </div>
                            <div className={styles.clienteUltimoTicket}>
                                {cliente.empresa.correoelectronico}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No hay clientes disponibles</p>
                )}
            </div>
        </div>
    );
};

export default ListadoClientes;
