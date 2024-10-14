'use client';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import styles from './Header.module.css';
import React, { useContext } from 'react';
import { TokenContext } from '@/context/TokenContext'; // Importa tu contexto de Token

export default function Header({ titulo }) {
  const { userRole } = useContext(TokenContext); // Obtén el rol del usuario desde el contexto

  // Si el usuario no es empleado (rol 2), no renderiza el header
  if (userRole !== 2) return null;

  return (
    <ProtectedRoutes allowedRoles={[2]}> {/* Solo empleados (rol 2) pueden ver esto */}
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
