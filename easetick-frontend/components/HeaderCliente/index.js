'use client';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import styles from './styles.module.css';
import React, { useContext } from 'react';
import { TokenContext } from '@/context/TokenContext'; // Importa tu contexto de Token

export default function Header({ titulo }) {
  const { userRole } = useContext(TokenContext); // Obtén el rol del usuario desde el contexto

  if (userRole !== 1) return null;

  return (
    <ProtectedRoutes allowedRoles={[1]}> 
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
