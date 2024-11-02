'use client';
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import HelpCenter from "@/components/HelpCenter/HelpCenter";
import useTitle from "@/hooks/useTitle";
import { useEffect } from "react";
import styles from "./page.module.css";
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    const { setTitulo } = useTitle();
    
    useEffect(() => {
        setTitulo("Home");
    }, [setTitulo]);

    return (
        <ProtectedRoutes allowedRoles={[1]}> 
            <div className={styles.container}>
                <section className={styles.welcomeSection}>
                    <h1 className={styles.welcomeTitle}>Centro de Soporte</h1>
                    <p className={styles.welcomeText}>
                        Bienvenido a tu espacio personalizado de soporte. Aquí podrás gestionar tus tickets, 
                        consultar el estado de tus solicitudes y encontrar ayuda rápida para todas tus necesidades.
                    </p>
                </section>
                
                <div className={styles.actionCards}>
                    <Link href="/FlowCliente/nuevo-ticket" className={styles.actionCard}>
                        <div className={styles.actionIcon}>
                            <Image src="/imagenes/AgregarTicket.png" alt="Nuevo ticket" width={45} height={45} />
                        </div>
                        <h2 className={styles.actionTitle}>Enviar nuevo ticket</h2>
                    </Link>
                    
                    <Link href="/FlowCliente/verTicketsCliente" className={styles.actionCard}>
                        <div className={styles.actionIcon}>
                            <Image src="/imagenes/ticketBlanco.png" alt="Ver tickets" width={45} height={45} />
                        </div>
                        <h2 className={styles.actionTitle}>Ver mis tickets</h2>
                    </Link>
                </div>

                <div className={styles.helpSection}>
                    <HelpCenter />
                </div>
            </div>
        </ProtectedRoutes>
    );
}