'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import Titulo from '@/components/Titulo/Titulo';
import axios from 'axios';

export default function PerfilEmpleado() {
    const params = useParams();
    const [empleado, setEmpleado] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmpleadoPerfil = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/usuarios/perfil-empleado/${params.id}`);
                
                if (response.data.success) {
                    setEmpleado(response.data.data);
                } else {
                    throw new Error(response.data.error || 'Error al cargar el perfil');
                }
            } catch (error) {
                console.error('Error:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchEmpleadoPerfil();
        }
    }, [params.id]);

    if (loading) return <div>Cargando...</div>;
    if (!empleado) return <div>No se encontró el empleado</div>;

    return (
        <ProtectedRoutes allowedRoles={[2]}>
            <div className={styles.container}>
                <Titulo 
                    titulo="Perfil del Empleado" 
                    subtitulo={`Información detallada de ${empleado.nombre}`} 
                />
                <div className={styles.profileCard}>
                    <div className={styles.infoGrid}>
                        <div className={styles.infoItem}>
                            <label>Nombre:</label>
                            <span>{empleado.nombre}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Email:</label>
                            <span>{empleado.correoelectronico}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Empresa:</label>
                            <span>{empleado.empresa?.nombre}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Calificación promedio:</label>
                            <span>{empleado.calificacion_promedio || 'Sin calificaciones'}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Tickets activos:</label>
                            <span>{empleado.tickets_activos || 0}</span>
                        </div>
                        <div className={styles.infoItem}>
                            <label>Tickets resueltos:</label>
                            <span>{empleado.tickets_resueltos || 0}</span>
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoutes>
    );
} 