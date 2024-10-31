import styles from './ListadoClientes.module.css';

const ListadoClientes = ({ clientes }) => {
    return (
        <div className={styles.tableWrapper}>
            <table className={styles.listadoClientes}>
                <thead>
                    <tr className={styles.headerRow}>
                        <th className={styles.clienteNombre}>Nombre</th>
                        <th className={styles.clienteTipo}>Tipo</th>
                        <th className={styles.clienteUltimoTicket}>Correo electrónico</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes && clientes.length > 0 ? (
                        clientes.map((cliente, index) => (
                            <tr key={index} className={styles.clienteRow}>
                                <td className={styles.clienteNombre}>
                                    <a href="#" className={styles.nombreLink}>
                                        {cliente.fkCliente.nombre}
                                    </a>
                                </td>
                                <td className={styles.clienteTipo}>
                                    {cliente.fkCliente.tipo}
                                </td>
                                <td className={styles.clienteUltimoTicket}>
                                    {cliente.fkCliente.correoelectronico}
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3" style={{textAlign: 'center', padding: '20px'}}>
                                No hay clientes disponibles
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ListadoClientes;
