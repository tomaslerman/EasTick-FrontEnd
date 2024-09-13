import React from 'react';
import styles from './Boton.module.css';

const Boton = ({ tipo = 'default', onClick }) => {
  const buttonClass = tipo === 'cerrarSesion' ? styles.botonRojo : styles.botonDefault;
  const buttonText = tipo === 'cerrarSesion' ? 'Cerrar sesión' : 'Acción por defecto';

  const handleClick = () => {
    if (tipo === 'cerrarSesion') {
      // Lógica para cerrar sesión
      console.log('Cerrando sesión...');
    }
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className={styles.contenedor}>
      <button 
        className={`${styles.boton} ${buttonClass}`}
        onClick={handleClick}
      >
        <span className={styles.buttonText}>{buttonText}</span>
      </button>
    </div>
  );
};

export default Boton;

/*const Boton = ({ tipo }) => {

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

export default Boton
*/
