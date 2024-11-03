'use client';
import Login from '@/components/Login/Login';
import Image from 'next/image';
import styles from './page.module.css';
import { useEffect, useContext } from "react";
import { TokenContext } from "@/context/TokenContext";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const { isLoggedIn, userRole, loading } = useContext(TokenContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading && isLoggedIn) {
      if (userRole === 1) {
        router.push('/FlowCliente/home');
      } else if (userRole === 2) {
        router.push('/FlowEmpleado/home');
      }
    }
  }, [isLoggedIn, userRole, loading, router]);

  // Si está cargando, muestra un indicador de carga
  if (loading) {
    return <div>Cargando...</div>;
  }

  // Si no está logueado, muestra la página de login
  if (!isLoggedIn) {
    return (
      <div className={styles.pageContainer}>
        <div className={styles.loginBox}>
          <div className={styles.logoContainer}>
            <Image 
              src="/imagenes/LogoVectorizadoGris_EaseTick.png" 
              alt="Logo EaseTick"
              width={150} 
              height={150}
              className={styles.logo}
            />
          </div>
          <h1 className={styles.title}>Bienvenido a EaseTick</h1>
          <p className={styles.subtitle}>Inicia sesión para gestionar tus tickets</p>
          <Login />
        </div>
      </div>
    );
  }
//hola
  // Si está logueado pero aún no se ha redirigido, muestra un mensaje de carga
  return <div>Redirigiendo...</div>;
}