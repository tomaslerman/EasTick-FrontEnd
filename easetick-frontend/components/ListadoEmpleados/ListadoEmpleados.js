import React from 'react';
import styles from './ListadoEmpleados.module.css'; // Archivo CSS para estilos
import Empleado from '../Empleado/Empleado';

const empleadosData = [
  {
    name: 'Sarah Gray',
    email: 'SarahGray@gmail.com',
    rating: '4/5',
    tickets: 3,
  },
  {
    name: 'John Doe',
    email: 'JohnDoe@gmail.com',
    rating: '5/5',
    tickets: 5,
  },
  // Puedes agregar más empleados aquí
];

const ListadoEmpleados = () => {
  return (
    <div className={styles.empleadosContainer}>
      {empleadosData.map((empleado, index) => (
        <Empleado
          key={index}
          name={empleado.name}
          email={empleado.email}
          rating={empleado.rating}
          tickets={empleado.tickets}
        />
      ))}
    </div>
  );
};

export default ListadoEmpleados;
