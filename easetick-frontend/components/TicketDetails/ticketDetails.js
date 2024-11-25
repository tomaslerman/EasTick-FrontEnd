'use client';  // Para Next.js si estás utilizando la carpeta `app`

import React, { useEffect, useState } from 'react';
import styles from './TicketDetails.module.css';

const TicketDetails = ({ userId }) => {
    const [stats, setStats] = useState({
        totalTickets: 0,
        highPriority: 0,
        assignedTickets: 0,
        unassignedTickets: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(`http://localhost:5000/tickets/estadisticas/${userId}`);
                const data = await response.json();
                
                if (data.success) {
                    setStats(data.message);
                }
            } catch (error) {
                console.error('Error fetching ticket statistics:', error);
            }
        };

        if (userId) {
            fetchStats();
        }
    }, [userId]);

    return (
        <div>
            <div className={styles.header}>
                <h3 className={styles.title}>Detalles de Tickets</h3>
            </div>
            <div className={styles.details}>
                <p className={styles.label}>Total</p>
                <p className={styles.value}>{stats.totalTickets}</p>

                <p className={styles.label}>Prioritarios</p>
                <p className={`${styles.value} ${styles.priority}`}>{stats.highPriority}</p>

                <p className={styles.label}>Sin resolver</p>
                <p className={`${styles.value} ${styles.assigned}`}>{stats.assignedTickets}</p>

                <p className={styles.label}>Resueltos</p>
                <p className={`${styles.value} ${styles.unassigned}`}>{stats.unassignedTickets}</p>
            </div>
        </div>
    );
};

export default TicketDetails;
