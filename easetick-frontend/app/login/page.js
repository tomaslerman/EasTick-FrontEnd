'use client';
import Login from "@/components/Login/Login";
import Image from 'next/image';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.loginContainer}>
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