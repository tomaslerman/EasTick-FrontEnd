'use client'
import styles from './ticketListado.module.css';

const TicketListado = ({ ticket }) => {
    return (
        <div className={styles.ticketRow}>
            <div className={styles.ticketCell}>
                <input type="checkbox" />
            </div>
            <div className={styles.ticketCell}>
                {ticket.estado}
            </div>
            <div className={styles.ticketCell}>
                <a href={ticket.link}>{ticket.titulo}</a>
            </div>
            <div className={styles.ticketCell}>
                {ticket.prioridad}
            </div>
            <div className={styles.ticketCell}>
                {ticket.tiempoRespuesta}
            </div>
            <div className={styles.ticketCell}>
                {ticket.diasVencimiento}
            </div>
            <div className={styles.ticketCell}>
                {ticket.asignadoA}
            </div>
            <div className={styles.ticketCell}>
                {ticket.categoria}
            </div>
        </div>
    );
}

export default TicketListado;
