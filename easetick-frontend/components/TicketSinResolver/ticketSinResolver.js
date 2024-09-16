'use client'
import styles from './ticketSinResolver.module.css'

export default function TicketSinResolver({ tickets }) {
    return (
        <div className={styles.tableContainer}>
            <div className={styles.header}>
                <h1>Tickets sin resolver</h1>
                <a href="/ver-ticket" className={styles.detailsLink}>Ver detalles</a>
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Prioridad</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr key={index}>
                            <td>{ticket.asunto}</td>
                            <td>{ticket.prioridad.nombre}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
