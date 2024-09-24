import { login, signup } from './actions'
import React from 'react';
import styles from './page.module.css'
export default function LoginPage() {
  return (
    <div className={styles.fullScreen}>
      <div className={styles.formContainer}>
        <form>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input className={styles.input} id="email" name="email" type="email" required />
          
          <label className={styles.label} htmlFor="password">Password:</label>
          <input className={styles.input} id="password" name="password" type="password" required />
          
          <button className={`${styles.button} ${styles.loginButton}`} formAction={login}>Log in</button>
          <button className={`${styles.button} ${styles.signupButton}`} formAction={signup}>Sign up</button>
        </form>
        <div className={styles.footer}>
          <p>© 2024 EASETICK</p>
        </div>
      </div>
    </div>
  );
}