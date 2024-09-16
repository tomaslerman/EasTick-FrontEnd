'use client'
import styles from './styles.module.css';

const TicketListado = ({ ticket, index }) => {
    return (
        <tr key={index} className={styles.ticketRow}>
            <td className={styles.ticketCell}>
                <a href={ticket.link} className={styles.ticketTitle}>{ticket.asunto}</a>
            </td>
            <td className={styles.ticketCell}>{ticket.estado.nombre}</td>
            <td className={styles.ticketCell}>{ticket.prioridad.nombre}</td>
            <td className={styles.ticketCell}>{ticket.fechacreacion}</td>
            <td className={styles.ticketCell}>{ticket.prioridad.caducidad}</td>
            <td className={styles.ticketCell}>{ticket.usuario.nombre}</td>
            <td className={styles.ticketCell}>{ticket.empresa.nombre}</td>
            <td className={styles.ticketCell}>
                <a href={ticket.link} className={styles.ticketLink}>Ver detalles</a>
            </td>
        </tr>
    );
}

export default TicketListado;