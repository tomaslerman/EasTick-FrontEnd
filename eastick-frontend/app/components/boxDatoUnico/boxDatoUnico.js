import styles from './BoxDatoUnico.module.css';

export default function BoxDatoUnico({ texto, dato }) {
  return (
    <div className={styles.box}>
      <h2>{texto}</h2>
      <h1>{dato}</h1>
    </div>
  );
}
