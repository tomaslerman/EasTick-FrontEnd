import styles from './boxDatoUnico.module.css';
import {useSate} from 'react';

const BoxDatoUnico = ({ texto, dato }) =>{

  return (
    <div className={styles.box}>
      <h2>{texto}</h2>
      <h1>{dato}</h1>
    </div>
  );
}
export default BoxDatoUnico;
