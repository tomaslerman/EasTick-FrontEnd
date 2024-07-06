'use client'
import styles from './Header.module.css';
import React from 'react';

export default function Header() {
    return (
        <div className={styles.header}>
            <h1>Home</h1>
            <div className={styles.icons}>
                <img src="/imagenes/notificacion.png" alt="Notificaciones" className={styles.icon} />
                <img src="/imagenes/perfil.png" alt="User" className={styles.icon} />
            </div>
        </div>
    );
}
