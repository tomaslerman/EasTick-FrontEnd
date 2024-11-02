'use client';
import { useEffect, useState, useContext } from 'react';
import { TokenContext } from '@/context/TokenContext';
import styles from './Perfil.module.css';

export default function Perfil() {
    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const { userId } = useContext(TokenContext);

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const response = await fetch(`http://localhost:5000/users/perfil/${userId}`);
                const data = await response.json();
                if (data.success) {
                    setPerfil(data.data);
                }
            } catch (error) {
                console.error("Error al obtener perfil:", error);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchPerfil();
        }
    }, [userId]);

    if (loading) return <div className={styles.loading}>Cargando...</div>;
    if (!perfil) return <div className={styles.error}>No se pudo cargar el perfil</div>;

    return (
        <div className={styles.perfilContainer}>
            <div className={styles.perfilCard}>
                <div className={styles.avatarSection}>
                    <div className={styles.avatar}>
                        {perfil.nombre.charAt(0)}
                    </div>
                    <h2>{perfil.nombre}</h2>
                    <span className={styles.rolBadge}>{perfil.rol.nombre}</span>
                </div>
                
                <div className={styles.infoSection}>
                    <div className={styles.infoGroup}>
                        <h3>Información Personal</h3>
                        <div className={styles.infoItem}>
                            <span>Email:</span>
                            <p>{perfil.correoelectronico}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <span>Rol:</span>
                            <div className={styles.rolInfo}>
                                <p>{perfil.rol.nombre}</p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.infoGroup}>
                        <h3>Información de la Empresa</h3>
                        <div className={styles.infoItem}>
                            <span>Empresa:</span>
                            <p>{perfil.empresa.nombre}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <span>Email Empresarial:</span>
                            <p>{perfil.empresa.correoelectronico}</p>
                        </div>
                        <div className={styles.infoItem}>
                            <span>Teléfono:</span>
                            <p>{perfil.empresa.telefono}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 