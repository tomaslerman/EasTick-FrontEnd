import React, { useContext } from 'react';
import { useRouter } from 'next/navigation';
import { TokenContext } from '@/context/TokenContext';
import styles from './Boton.module.css';

const Boton = ({ tipo = 'default', onClick }) => {
  const buttonClass = tipo === 'cerrarSesion' ? styles.botonRojo : styles.botonDefault;
  const buttonText = tipo === 'cerrarSesion' ? 'Cerrar sesión' : 'Acción por defecto';

  const { clearToken } = useContext(TokenContext);
  const router = useRouter();

  const handleClick = async () => {
    if (tipo === 'cerrarSesion') {
      try {
        await clearToken();
        await router.replace('/');
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
      }
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
