import React from 'react';
import styles from './ListadoEmpleados.module.css';
import Empleado from '../Empleado/Empleado';

const ListadoEmpleados = ({ empleados }) => {
  return (
    <div className={styles.listadoContainer}>
      <div className={styles.header}>
        <div>Nombre</div>
        <div>Email</div>
        <div>Calificación</div>
        <div>Tickets Asignados</div>
      </div>
      {empleados.map((empleado) => (
        <Empleado
          key={empleado.id}
          id={empleado.id}
          name={empleado.nombre}
          email={empleado.correoelectronico}
          rating={empleado.calificacion}
          tickets={empleado.ticketsAsignados}
        />
      ))}
    </div>
  );
};

export default ListadoEmpleados;
