import styles from './ListadoClientes.module.css';

const ListadoClientes = ({ clientes }) => {
    return (
        <div className={styles.listadoClientes}>
            {clientes.map((cliente, index) => (
                <div key={index} className={styles.clienteRow}>
                    <div className={styles.clienteNombre}>
                        <a href="#" className={styles.nombreLink}>{cliente.nombre}</a>
                    </div>
                    <div className={styles.clienteTipo}>
                        {cliente.tipo}
                    </div>
                    <div className={styles.clienteUltimoTicket}>
                        {cliente.ultimoTicket}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListadoClientes;
