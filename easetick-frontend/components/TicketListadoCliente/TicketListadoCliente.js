import React from 'react';
import Link from 'next/link';
import styles from './TicketListadoCliente.module.css';

const TicketListadoCliente = ({ ticket, index }) => {
    return (
        <tr key={ticket.id || index} className={styles.ticketRow}>
            <td className={styles.ticketCell}>
                <Link href={`/FlowCliente/ticket/${ticket.id}`} className={styles.ticketTitle}>
                    {ticket.asunto}
                </Link>
            </td>
            <td className={styles.ticketCell}>{ticket.estado?.nombre || 'No especificado'}</td>
            <td className={styles.ticketCell}>{ticket.prioridad?.nombre || 'No especificada'}</td>
            <td className={styles.ticketCell}>{ticket.tipo?.nombre || 'No especificado'}</td>
            <td className={styles.ticketCell}>{new Date(ticket.fechacreacion).toLocaleDateString()}</td>
            <td className={styles.ticketCell}>{ticket.usuario?.nombre || 'No asignado'}</td>
            <td className={styles.ticketCell}>
                <Link href={`/FlowCliente/ticket/${ticket.id}`} className={styles.ticketLink}>
                    Ver detalles
                </Link>
            </td>
        </tr>
    );
};

export default TicketListadoCliente;
