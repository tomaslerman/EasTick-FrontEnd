'use client'; // Asegura que el componente se renderiza en el cliente

import styles from './Configuracion.module.css';
import { useRouter } from 'next/navigation'; // Usa useRouter de 'next/navigation'
import stylesBoton from '../Boton/Boton.module.css';

const Configuracion = () => {
    const router = useRouter(); // Este hook debe usarse dentro de un componente de cliente

    const handleClick = (opcion) => {
        switch (opcion) {
            case "Cambiar de cuenta":
                router.push('/cambiar-cuenta');
                break;
            case "Cambiar email":
                router.push('/cambiar-email');
                break;
            case "Cambiar contraseña":
                router.push('/cambiar-contrasena');
                break;
            case "Interfaz":
                router.push('/interfaz');
                break;
            case "Datos personales":
                router.push('/datos-personales');
                break;
            case "Notificaciones":
                router.push('/notificaciones');
                break;
            default:
                console.log(`Opción no reconocida: ${opcion}`);
        }
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
            titulo: "Interfaz",
            descripcion: "Personaliza la apariencia de la aplicación"
        },
        {
            titulo: "Datos personales",
            descripcion: "Gestiona tu información personal"
        },
        {
            titulo: "Notificaciones",
            descripcion: "Configura tus preferencias de alertas"
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
