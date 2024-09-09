import React from 'react';
import styles from './TituloEmpleados.module.css';

const TituloEmpleados = () => {
  return (
    <div className={styles.tituloEmpleados}>
      <div className={styles.columna}>
        <span>Nombre</span>
      </div>
      <div className={styles.columna}>
        <span>Email</span>
      </div>
      <div className={styles.columna}>
        <span>Calificación</span>
      </div>
      <div className={styles.columna}>
        <span>Tickets asignados</span>
      </div>
    </div>
  );
};

export default TituloEmpleados;
