'use client'; // Asegura que el componente se renderiza en el cliente

import styles from './Configuracion.module.css';
import { useRouter } from 'next/navigation'; // Usa useRouter de 'next/navigation'
import { logout } from '@/app/logout/actions';
import DemoClientComponent from '../DemoClientComponent';

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
        "Cambiar de cuenta",
        "Cambiar email",
        "Cambiar contraseña",
        "Interfaz",
        "Datos personales",
        "Notificaciones"
    ];

    return (
        <div className={styles.configuracionContainer}>
            {opciones.map((opcion, index) => (
                <div
                    key={index}
                    className={styles.opcion}
                    onClick={() => handleClick(opcion)}
                >
                    <span>{opcion}</span>
                    <span className={styles.arrow}>&#8250;</span>
                </div>
            ))}
            <DemoClientComponent />
            <div className={styles.logoutContainer}>
                <form action={logout}>
                    <button type="submit" className={styles.logoutButton}>
                        Logout
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Configuracion;