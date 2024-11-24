'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import Titulo from '@/components/Titulo/Titulo';
import axios from 'axios';
import PerfilEmpresa from '@/components/PerfilEmpresa/PerfilEmpresa';

export default function PerfilMiembro() {
    const params = useParams();
    const [miembro, setMiembro] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMiembroPerfil = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/usuarios/perfil-miembro/${params.id}`);
                
                if (response.data.success) {
                    const miembroData = {
                        nombre: response.data.data.nombre,
                        correoelectronico: response.data.data.correoelectronico,
                        empresa: {
                            nombre: response.data.data.empresa.nombre,
                            correoelectronico: response.data.data.empresa.correoelectronico,
                            telefono: response.data.data.empresa.telefono,
                            tipo: 'Empleado'
                        }
                    };
                    setMiembro(miembroData);

                    setError(null);
                } else {
                    setError(response.data.error || 'Error al cargar el perfil');
                    setMiembro(null);
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error.response?.data?.error || 'Error al cargar el perfil');
                setMiembro(null);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchMiembroPerfil();
        }
    }, [params.id]);

    if (loading) return <div>Cargando...</div>;
    if (!miembro) return <div>No se encontró el miembro del equipo</div>;

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div className={styles.container}>
                <Titulo 
                    titulo="Perfil del Miembro" 
                    subtitulo={`Información detallada de ${miembro.nombre}`} 
                />
                <div className={styles.perfilWrapper}>
                    <PerfilEmpresa data={miembro} />
                </div>
            </div>
        </ProtectedRoutes>
    );
}