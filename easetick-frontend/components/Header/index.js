'use client';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import styles from './Header.module.css';
import React, { useContext, useState, useEffect } from 'react';
import { TokenContext } from '@/context/TokenContext';
import Link from 'next/link';
import axios from 'axios';

export default function Header({ titulo }) {
  const { userRole, userId } = useContext(TokenContext);
  const [itemsPendientes, setItemsPendientes] = useState(0);

  useEffect(() => {
    const obtenerNotificaciones = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tickets/notificacionesYRecordatorios/${userId}`);
        const items = response.data.message;
        const cantidadPendientes = items.length; // Contamos todos los items
        setItemsPendientes(cantidadPendientes);
      } catch (error) {
        console.error('Error al obtener notificaciones:', error);
      }
    };

    if (userId) {
      obtenerNotificaciones();
      // Actualizar cada 30 segundos
      const interval = setInterval(obtenerNotificaciones, 30000);
      return () => clearInterval(interval);
    }
  }, [userId]);

  if (userRole !== 2 && userRole !== 3) return null;

  return (
    <ProtectedRoutes allowedRoles={[2, 3]}> 
      <div className={styles.header}>
        <h1>{titulo}</h1>
        <div className={styles.icons}>
          <Link href="/FlowEmpleado/notificaciones" className={styles.iconContainer}>
            <img src="/imagenes/notificacion.png" alt="Notificaciones" className={styles.icon} />
            {itemsPendientes > 0 && (
              <span className={styles.badge}>{itemsPendientes}</span>
            )}
          </Link>
          <Link href="/FlowEmpleado/perfil">
            <img src="/imagenes/perfil.png" alt="Perfil" className={styles.icon} />
          </Link>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
