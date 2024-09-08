'use client';  // Para Next.js si estás utilizando la carpeta `app`

import React from 'react';
import styles from './TicketDetails.module.css';

const TicketDetails = ({ title, totalTickets, highPriority, assignedTickets, unassignedTickets, overdueTickets, newTickets }) => {
    return (
        <div>
            <div className={styles.header}>
                <h3 className={styles.title}>{title}</h3>
            </div>
            <div className={styles.details}>
                <p className={styles.label}>Total</p>
                <p className={styles.value}>{totalTickets}</p>

                <p className={styles.label}>Prioritarios</p>
                <p className={`${styles.value} ${styles.priority}`}>{highPriority}</p>

                <p className={styles.label}>Asignados</p>
                <p className={`${styles.value} ${styles.assigned}`}>{assignedTickets}</p>

                <p className={styles.label}>No asignados</p>
                <p className={`${styles.value} ${styles.unassigned}`}>{unassignedTickets}</p>

                <p className={styles.label}>Vencidos</p>
                <p className={`${styles.value} ${styles.overdue}`}>{overdueTickets}</p>

                <p className={styles.label}>Nuevos</p>
                <p className={`${styles.value} ${styles.newTickets}`}>{newTickets}</p>
            </div>
        </div>
    );
};

export default TicketDetails;
