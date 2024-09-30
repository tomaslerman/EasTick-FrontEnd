import { login } from './actions';
import React from 'react';
import Image from 'next/image';
import styles from './page.module.css';

export default function LoginPage() {
  return (
    <div className={styles.fullScreen}>
      <div className={styles.formContainer}>
        <h2>Iniciar sesión</h2>
        <form>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input className={styles.input} id="email" name="email" type="email" placeholder="Ingrese mail" required />

          <label className={styles.label} htmlFor="password">Contraseña:</label>
          <input className={styles.input} id="password" name="password" type="password" placeholder="Ingrese contraseña" required />

          <button className={`${styles.button} ${styles.loginButton}`} formAction={login}>Iniciar sesión</button>
        </form>
        <div className={styles.footer}>
          <p>© 2024 EASETICK</p>
        </div>
      </div>
      <div className={styles.logoContainer}>
        <Image 
          src="/imagenes/LogoVectorizadoGris_EaseTick.png" 
          alt="EaseTick Logo" 
          width={400} 
          height={400} 
        />
      </div>
    </div>
  );
}
