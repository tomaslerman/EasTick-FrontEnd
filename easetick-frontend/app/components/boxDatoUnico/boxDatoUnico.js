import styles from './boxDatoUnico.module.css';

export default function boxDatoUnico({ texto, dato }) {
  return (
    <div className={styles.box}>
      <h2>{texto}</h2>
      <h1>{dato}</h1>
    </div>
  );
}
