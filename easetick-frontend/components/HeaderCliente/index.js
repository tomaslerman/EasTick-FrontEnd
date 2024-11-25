'use client';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import styles from './styles.module.css';
import React, { useContext } from 'react';
import { TokenContext } from '@/context/TokenContext'; // Importa tu contexto de Token
import Link from 'next/link';

export default function Header({ titulo }) {
  const { userRole } = useContext(TokenContext); // Obtén el rol del usuario desde el contexto

  if (userRole !== 1) return null;

  return (
    <ProtectedRoutes allowedRoles={[1]}> 
      <div className={styles.header}>
        <h1>{titulo}</h1>
        <div className={styles.icons}>
          <Link href="/FlowCliente/perfilCliente">
            <img src="/imagenes/perfil.png" alt="Perfil" className={styles.icon} />
          </Link>
        </div>
      </div>
    </ProtectedRoutes>
  );
}
