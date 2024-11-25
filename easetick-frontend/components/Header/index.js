'use client';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import styles from './Header.module.css';
import React, { useContext } from 'react';
import { TokenContext } from '@/context/TokenContext'; // Importa tu contexto de Token
import Link from 'next/link';

export default function Header({ titulo }) {
  const { userRole } = useContext(TokenContext); // Obtén el rol del usuario desde el contexto

  // Si el usuario no es empleado (rol 2), no renderiza el header
  if (userRole !== 2 && userRole !== 3) return null;

  return (
    <ProtectedRoutes allowedRoles={[2, 3]}> 
      <div className={styles.header}>
        <h1>{titulo}</h1>
        <div className={styles.icons}>
          <Link href="/FlowEmpleado/notificaciones">
            <img src="/imagenes/notificacion.png" alt="Notificaciones" className={styles.icon} />
          </Link>
          <Link href="/FlowEmpleado/perfil">
            <img src="/imagenes/perfil.png" alt="Perfil" className={styles.icon} />
          </Link>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
