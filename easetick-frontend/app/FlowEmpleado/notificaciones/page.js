'use client';
import { useEffect, useState, useContext } from 'react';
import { TokenContext } from '@/context/TokenContext';
import axios from 'axios';
import styles from './page.module.css';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import Link from 'next/link';

export default function Notificaciones() {
    const { userId } = useContext(TokenContext);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                setLoading(true);
                const response = await axios.get(`http://localhost:5000/tickets/notificacionesYRecordatorios/${userId}`);
                setItems(response.data.message);
            } catch (error) {
                console.error('Error al obtener notificaciones y recordatorios:', error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchItems();
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

    const handleNotificacionClick = async (item) => {
        if (item.tipo === 'notificacion') {
            try {
                await axios.put(`http://localhost:5000/tickets/notificaciones/${item.id}/leer`);
                setItems(prev => prev.filter(n => n.id !== item.id));
                window.location.href = `/FlowEmpleado/ticket/${item.fkticket}`;
            } catch (error) {
                console.error('Error al marcar notificación como leída:', error);
            }
        }
    };

    const renderItem = (item) => {
        const isRecordatorio = item.tipo === 'recordatorio';
        return (
            <div 
                key={item.id}
                className={`${styles.notificacion} ${isRecordatorio ? styles.recordatorio : ''}`}
                onClick={() => !isRecordatorio && handleNotificacionClick(item)}
            >
                <div className={!item.leido ? styles.noLeido : ''}>
                    <h3>{item.contenido}</h3>
                    {item.ticket && (
                        <p>Ticket: {item.ticket.asunto}</p>
                    )}
                    {isRecordatorio && (
                        <span className={styles.recordatorioTag}>Recordatorio</span>
                    )}
                    <small>{formatearFecha(item.fechacreacion)}</small>
                </div>
            </div>
        );
    };

    if (loading) {
        return <div className={styles.loading}>Cargando...</div>;
    }

    return (
        <ProtectedRoutes allowedRoles={[2, 3]}>
            <div className={styles.container}>
                <h1 className={styles.pageTitle}>Notificaciones y Recordatorios</h1>
                <div className={styles.notificacionesList}>
                    {items.length > 0 ? (
                        items.map(renderItem)
                    ) : (
                        <div className={styles.noNotificaciones}>
                            <p>No hay notificaciones ni recordatorios</p>
                        </div>
                    )}
                </div>
            </div>
        </ProtectedRoutes>
    );
} 