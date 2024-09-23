import { login, signup } from './actions'
import styles from './page.module.css'

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <label htmlFor="email" className={styles.label}>Email:</label>
        <input id="email" name="email" type="email" className={styles.input} required />
        <label htmlFor="password" className={styles.label}>Password:</label>
        <input id="password" name="password" type="password" className={styles.input} required />
        <button type="submit" className={styles.button} formAction={login}>Log in</button>
        <button type="button" className={`${styles.button} ${styles.buttonSecondary}`} formAction={signup}>Sign up</button>
      </form>
    </div>
  )
}