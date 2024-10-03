'use client'
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import styles from './Header.module.css';
import React from 'react';

export default function Header({titulo}) {
    return (
        <ProtectedRoutes>
        <div className={styles.header}>
            <h1>{titulo}</h1>
            <div className={styles.icons}>
                <img src="/imagenes/notificacion.png" alt="Notificaciones" className={styles.icon} />
                <img src="/imagenes/perfil.png" alt="User" className={styles.icon} />
            </div>
        </div>
        </ProtectedRoutes>
    );
}
