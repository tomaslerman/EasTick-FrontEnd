import React from 'react';
import styles from './ListadoEmpleados.module.css';
import Empleado from '../Empleado/Empleado';

const ListadoEmpleados = ({ empleados }) => {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.listadoEmpleados}>
        <thead>
          <tr className={styles.headerRow}>
            <th>Nombre</th>
            <th>Email</th>
            <th>Calificación</th>
            <th>Tickets Asignados</th>
          </tr>
        </thead>
        <tbody>
          {empleados.map((empleado) => (
            <tr key={empleado.id} className={styles.empleadoRow}>
              <td className={styles.empleadoCell}>
                <a href={`/FlowEmpleado/perfil-empleado/${empleado.id}`} className={styles.nombreLink}>
                  {empleado.nombre}
                </a>
              </td>
              <td className={styles.empleadoCell}>{empleado.email}</td>
              <td className={styles.empleadoCell}>{empleado.calificacion}</td>
              <td className={styles.empleadoCell}>{empleado.ticketsAsignados}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListadoEmpleados;
