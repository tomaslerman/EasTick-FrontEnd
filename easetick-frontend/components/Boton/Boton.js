import React, { useContext } from 'react';
import { useRouter } from 'next/navigation'; // Para redirigir al login
import { TokenContext } from '@/context/TokenContext'; // Asegúrate de que el contexto esté importado correctamente
import styles from './Boton.module.css';

const Boton = ({ tipo = 'default', onClick }) => {
  const buttonClass = tipo === 'cerrarSesion' ? styles.botonRojo : styles.botonDefault;
  const buttonText = tipo === 'cerrarSesion' ? 'Cerrar sesión' : 'Acción por defecto';

  const { logout } = useContext(TokenContext); // Usar directamente la función logout del contexto
  const router = useRouter(); // Hook para redirigir al login

  const handleClick = () => {
    if (tipo === 'cerrarSesion') {
      // Lógica para cerrar sesión
      console.log('Cerrando sesión...');
      logout(); // Llamar a la función logout del contexto que elimina el token y actualiza el estado
      router.push('/login'); // Redirigir al usuario al login
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
