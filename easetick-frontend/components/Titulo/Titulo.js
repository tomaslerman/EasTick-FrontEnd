'use client';
import styles from './Titulo.module.css';

const Titulo = ({ titulo, subtitulo }) => {
  return (
    <div className={styles.tituloContainer}>
      <h1 className={styles.titulo}>{titulo}</h1>
      <p className={styles.subtitulo}>{subtitulo}</p>
    </div>
  );
};
export default Titulo;
