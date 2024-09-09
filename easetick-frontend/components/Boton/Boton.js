import React from 'react';
import styles from './Boton.module.css';

const Boton = ({ tipo }) => {
  
  const handleCerrarSesion = () => {
    // Función vacía
  };

  return (
    <div className={styles.contenedor}>
      <button 
        className={tipo === 'cerrarSesion' ? styles.botonRojo : styles.botonDefault}
        onClick={tipo === 'cerrarSesion' ? handleCerrarSesion : undefined}
      >
        {tipo === 'cerrarSesion' ? 'Cerrar sesión' : 'Acción por defecto'}
      </button>
    </div>
  );
};

export default Boton;
