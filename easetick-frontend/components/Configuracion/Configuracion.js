'use client'; // Asegura que el componente se renderiza en el cliente

import styles from './Configuracion.module.css';
import { useRouter } from 'next/navigation'; // Usa useRouter de 'next/navigation'
import stylesBoton from '../Boton/Boton.module.css';
import { useContext } from 'react';
import { TokenContext } from '@/context/TokenContext';

const Configuracion = () => {
    const router = useRouter(); // Este hook debe usarse dentro de un componente de cliente
    const { clearToken, userRole } = useContext(TokenContext);

    const handleClick = async (opcion) => {
        switch (opcion) {
            case "Cambiar de cuenta":
                await clearToken(); // Esperamos a que se limpie el token
                window.location.href = '/'; // Forzamos una recarga completa para ir al login
                break;
            case "Cambiar email":
                router.push('/cambiar-email');
                break;
            case "Cambiar contraseña":
                router.push('/reestablecer');
                break;
            case "Datos personales":
                // Redirigir según el rol del usuario
                if (userRole === 1) {
                    router.push('/FlowCliente/perfilCliente');
                } else if (userRole === 2 || userRole === 3) {
                    router.push('/FlowEmpleado/perfil');
                }
                break;
            default:
                console.log(`Opción no reconocida: ${opcion}`);
        }
    };

    const handleLogout = () => {
        clearToken();
        router.push('/');
    };

    const opciones = [
        {
            titulo: "Cambiar de cuenta",
            descripcion: "Gestiona múltiples cuentas y perfiles"
        },
        {
            titulo: "Cambiar email",
            descripcion: "Actualiza tu dirección de correo electrónico"
        },
        {
            titulo: "Cambiar contraseña",
            descripcion: "Mantén tu cuenta segura"
        },
        {
            titulo: "Datos personales",
            descripcion: "Gestiona tu información personal"
        }
    ];

    return (
        <div className={styles.configuracionContainer}>
            {opciones.map((opcion, index) => (
                <div
                    key={index}
                    className={styles.opcion}
                    onClick={() => handleClick(opcion.titulo)}
                >
                    <span className={styles.opcionTexto}>{opcion.titulo}</span>
                    <span className={styles.descripcion}>{opcion.descripcion}</span>
                    <span className={styles.arrow}>→</span>
                </div>
            ))}
            
        </div>
    );
};

export default Configuracion;
