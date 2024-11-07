import React from 'react';
import styles from './Empleado.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Empleado = ({ id, name, email, rating, tickets }) => {
  const router = useRouter();

  const handleClick = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/usuarios/perfil-empleado/${id}`);
      
      if (response.data.success) {
        router.push(`/FlowEmpleado/perfil-empleado/${id}`);
      } else {
        console.error('Error al obtener el perfil:', response.data.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.empleadoRow}>
      <div className={styles.empleadoInfo}>
        <span 
          onClick={handleClick}
          className={styles.nameLink}
          style={{ cursor: 'pointer', color: '#0066cc' }}
        >
          {name}
        </span>
      </div>
      <div className={styles.email}>{email}</div>
      <div className={styles.rating}>{rating}</div>
      <div className={styles.tickets}>{tickets}</div>
    </div>
  );
};

export default Empleado;
