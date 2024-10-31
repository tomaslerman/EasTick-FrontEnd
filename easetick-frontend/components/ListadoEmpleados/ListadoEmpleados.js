import React from 'react';
import styles from './ListadoEmpleados.module.css';

const ListadoEmpleados = ({ empleados }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.listadoEmpleados}>
        <thead>
          <tr className={styles.headerRow}>
            <th className={styles.empleadoCell}>Nombre</th>
            <th className={styles.empleadoCell}>Email</th>
            <th className={styles.empleadoCell}>Calificación</th>
            <th className={styles.empleadoCell}>Tickets Asignados</th>
          </tr>
        </thead>
        <tbody>
          {empleados && empleados.length > 0 ? (
            empleados.map((empleado, index) => (
              <tr key={index} className={styles.empleadoRow}>
                <td className={styles.empleadoCell}>
                  <a href="#" className={styles.nombreLink}>
                    {empleado.nombre}
                  </a>
                </td>
                <td className={styles.empleadoCell}>{empleado.email}</td>
                <td className={styles.empleadoCell}>{empleado.calificacion}</td>
                <td className={styles.empleadoCell}>{empleado.ticketsAsignados}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" style={{textAlign: 'center', padding: '20px'}}>
                No hay empleados disponibles
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoEmpleados;
