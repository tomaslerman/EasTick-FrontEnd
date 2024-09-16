import React from 'react';
import styles from './ListadoEmpleados.module.css';

const ListadoEmpleados = ({ empleados }) => {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.listadoEmpleados}>
        {empleados.map((empleado, index) => (
          <div key={index} className={styles.empleadoRow}>
            <div className={styles.empleadoInfo}>
              <span>{empleado.name}</span>
            </div>
            <div className={styles.empleadoInfo}>
              <span>{empleado.email}</span>
            </div>
            <div className={styles.empleadoInfo}>
              <span>{empleado.rating}</span>
            </div>
            <div className={styles.empleadoInfo}>
              <span>{empleado.tickets}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListadoEmpleados;