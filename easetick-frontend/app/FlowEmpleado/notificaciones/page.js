'use client';
import { useEffect, useState, useContext } from 'react';
import { TokenContext } from '@/context/TokenContext';
import axios from 'axios';
import styles from './page.module.css';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import Link from 'next/link';

export default function Notificaciones() {
    const { userId } = useContext(TokenContext);
    const [notificaciones, setNotificaciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNotificaciones = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/tickets/notificaciones/${userId}`);
                setNotificaciones(response.data.message);
            } catch (error) {
                console.error('Error al obtener notificaciones:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchNotificaciones();
        }
    }, [userId]);

    const formatearFecha = (fecha) => {
        const fechaObj = new Date(fecha);
        const opciones = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            timeZone: 'UTC'
        };
        
        return fechaObj.toLocaleDateString('es-ES', opciones);
    };

    const handleNotificacionClick = async (notif) => {
        try {
            await axios.put(`http://localhost:5000/tickets/notificaciones/${notif.id}/leer`);
            setNotificaciones(prev => prev.filter(n => n.id !== notif.id));
            window.location.href = `/FlowEmpleado/ticket/${notif.fkticket}`;
        } catch (error) {
            console.error('Error al marcar notificación como leída:', error);
        }
    };

    if (loading) {
        return <div className={styles.loading}>Cargando notificaciones...</div>;
    }

    return (
        <ProtectedRoutes allowedRoles={[2, 3]}>
            <div className={styles.container}>
                <h1>Notificaciones</h1>
                <div className={styles.notificacionesList}>
                    {notificaciones.length > 0 ? (
                        notificaciones.map((notif) => (
                            <Link 
                                href={`/FlowEmpleado/ticket/${notif.fkticket}`} 
                                key={notif.id}
                                className={styles.notificacion}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNotificacionClick(notif);
                                }}
                            >
                                <div className={!notif.leido ? styles.noLeido : ''}>
                                    <h3>{notif.contenido}</h3>
                                    {notif.ticket && (
                                        <p>Ticket: {notif.ticket.asunto}</p>
                                    )}
                                    <small>{formatearFecha(notif.fechacreacion)}</small>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className={styles.noNotificaciones}>
                            <p>No tienes notificaciones nuevas</p>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoutes>
    );
} 