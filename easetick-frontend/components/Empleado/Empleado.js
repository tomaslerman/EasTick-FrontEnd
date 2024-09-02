import React from 'react';
import styles from './Empleado.module.css';

const Empleado = ({ name, email, rating, tickets }) => {
  return (
    <div className={styles.empleadoRow}>
      <div className={styles.empleadoInfo}>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.email}>{email}</div>
      <div className={styles.rating}>{rating}</div>
      <div className={styles.tickets}>{tickets}</div>
    </div>
  );
};

export default Empleado;
