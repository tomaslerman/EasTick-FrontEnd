'use client'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import styles from './page.module.css';
import { ProtectedRoutes } from '@/app/utils/ProtectedRoutes';
import Titulo from '@/components/Titulo/Titulo';
import Perfil from '@/components/Perfil/Perfil';
import axios from 'axios';
import PerfilEmpresa from '@/components/PerfilEmpresa/PerfilEmpresa';

export default function PerfilCliente() {
    const params = useParams();
    const [cliente, setCliente] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchClientePerfil = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/usuarios/perfil-cliente/${params.id}`);
                
                if (response.data.success) {
                    const clienteData = {
                        nombre: response.data.data.nombre,
                        correoelectronico: response.data.data.correoelectronico,
                        telefono: response.data.data.telefono,
                        empresa: {
                            nombre: response.data.data.empresa.nombre,
                            correoelectronico: response.data.data.empresa.correoelectronico,
                            telefono: response.data.data.empresa.telefono,
                            tipo: response.data.data.empresa.tipo
                        }
                    };
                    setCliente(clienteData);
                    setError(null);
                } else {
                    setError(response.data.error || 'Error al cargar el perfil');
                    setCliente(null);
                }
            } catch (error) {
                console.error('Error:', error);
                setError(error.response?.data?.error || 'Error al cargar el perfil');
                setCliente(null);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchClientePerfil();
        }
    }, [params.id]);

    if (loading) return <div>Cargando...</div>;
    if (!cliente) return <div>No se encontró el cliente</div>;

    return (
        <ProtectedRoutes allowedRoles={[2]}>
            <div className={styles.container}>
                <Titulo 
                    titulo="Perfil del Cliente" 
                    subtitulo={`Información detallada de ${cliente.nombre}`} 
                />
                <div className={styles.perfilWrapper}>
                    <PerfilEmpresa data={cliente} />
                </div>
            </div>
        </ProtectedRoutes>
    );
} 