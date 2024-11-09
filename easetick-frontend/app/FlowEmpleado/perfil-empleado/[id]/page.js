'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import Titulo from '@/components/Titulo/Titulo';
import axios from 'axios';
import Perfil from '@/components/Perfil/Perfil';

export default function PerfilEmpleado() {
    const params = useParams();
    const [empleado, setEmpleado] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEmpleadoPerfil = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/usuarios/perfil-empleado/${params.id}`);
                
                if (response.data.success) {
                    const empleadoData = {
                        nombre: response.data.data.nombre,
                        correoelectronico: response.data.data.correoelectronico,
                        empresa: {
                            nombre: response.data.data.empresa?.nombre || 'N/A',
                        },
                        rol: {
                            nombre: 'Empleado'
                        },
                        estadisticas: {
                            calificacion_promedio: response.data.data.calificacion_promedio || 'Sin calificaciones',
                            tickets_activos: response.data.data.tickets_activos || 0,
                            tickets_resueltos: response.data.data.tickets_resueltos || 0
                        }
                    };
                    setEmpleado(empleadoData);
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
        <ProtectedRoutes allowedRoles={[2, 3]}>
            <div className={styles.container}>
                <Titulo 
                    titulo="Perfil del Empleado" 
                    subtitulo={`Información detallada de ${empleado.nombre}`} 
                />
                <div className={styles.perfilWrapper}>
                    <Perfil 
                        data={empleado} 
                        showStatistics={true}
                    />
                </div>
            </div>
        </ProtectedRoutes>
    );
} 