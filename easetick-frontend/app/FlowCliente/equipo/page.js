'use client'
import { useEffect, useState, useContext } from "react";
import useTitle from "@/hooks/useTitle";
import Titulo from "@/components/Titulo/Titulo";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import { TokenContext } from "@/context/TokenContext";
import styles from './page.module.css';

export default function Equipo() {
    const { setTitulo } = useTitle();
    const [equipo, setEquipo] = useState([]);
    const { userId } = useContext(TokenContext);
    
    useEffect(() => {
        setTitulo("Mi Equipo");
        
        const fetchEquipo = async () => {
            try {
                const response = await fetch(`http://localhost:5000/tickets/equipo/${userId}`);
                const data = await response.json();
                if (data.success) {
                    setEquipo(data.message);
                }
            } catch (error) {
                console.error("Error al obtener el equipo:", error);
            }
        };

        fetchEquipo();
    }, [setTitulo, userId]);

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div className={styles.pageWrapper}>
                <div className={styles.container}>
                    <div className={styles.header}>
                        <Titulo titulo={"Mi Equipo"} subtitulo={"Miembros de su empresa"} />
                    </div>
                    <div className={styles.equipoContainer}>
                        <div className={styles.equipoScrollContainer}>
                            {equipo.map((miembro, index) => (
                                <div key={index} className={styles.miembroCard}>
                                    <div className={styles.glassEffect}>
                                        <div className={styles.avatarContainer}>
                                            <div className={styles.initialsAvatar}>
                                                {miembro.nombre.charAt(0)}
                                            </div>
                                        </div>
                                        <div className={styles.memberInfo}>
                                            <h3>{miembro.nombre}</h3>
                                            <p>{miembro.correoelectronico}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedRoutes>
    );
}