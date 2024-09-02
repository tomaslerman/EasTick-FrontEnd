import React from 'react';
import styles from './TituloEmpleados.module.css'; // Archivo CSS para estilos

const TituloEmpleados = () => {
  return (
    <div className={styles.tableHeader}>
      <div className={styles.headerItem}>
        Nombre <span className={styles.sortIcon}>▼</span>
      </div>
      <div className={styles.headerItem}>
        Email <span className={styles.sortIcon}>▼</span>
      </div>
      <div className={styles.headerItem}>
        Calificación <span className={styles.sortIcon}>▼</span>
      </div>
      <div className={styles.headerItem}>
        Tickets asignados <span className={styles.sortIcon}>▼</span>
      </div>
    </div>
  );
};

export default TituloEmpleados;
