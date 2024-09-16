import React from 'react';
import styles from './ListadoEmpleados.module.css';

const ListadoEmpleados = ({ empleados }) => {
  return (
    <div className={styles.tableWrapper}>
      <div className={styles.listadoEmpleados}>
        {empleados && empleados.length > 0 ? (
          empleados.map((empleado, index) => (
            <div key={index} className={styles.empleadoRow}>
              <div className={styles.empleadoInfo}>
                <span>{empleado.nombre}</span> {/* Cambiado según datos de ejemplo */}
              </div>
              <div className={styles.empleadoInfo}>
                <span>{empleado.email}</span> {/* Cambiado según datos de ejemplo */}
              </div>
              <div className={styles.empleadoInfo}>
                <span>{empleado.calificacion}</span> {/* Cambiado según datos de ejemplo */}
              </div>
              <div className={styles.empleadoInfo}>
                <span>{empleado.ticketsAsignados}</span> {/* Cambiado según datos de ejemplo */}
              </div>
            </div>
          ))
        ) : (
          <p>No hay empleados disponibles</p>
        )}
      </div>
    </div>
  );
};

export default ListadoEmpleados;
