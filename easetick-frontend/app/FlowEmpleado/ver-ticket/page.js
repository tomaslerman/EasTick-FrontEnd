'use client'
import { useEffect, useContext } from "react";
import { useTickets } from '@/hooks/useTickets';
import useTitle from "@/hooks/useTitle";
import { TokenContext } from "@/context/TokenContext";
import styles from './page.module.css';
import Titulo from "@/components/Titulo/Titulo";
import TicketListado from "@/components/TicketListado/ticketListado";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";

export default function VerTicket() {
    const { userId, loading } = useContext(TokenContext);
    const { setTitulo } = useTitle();
    
    const { detalle = [] } = useTickets({ id: userId || ''});
    
    useEffect(() => {
        setTitulo("Tickets");
    }, [setTitulo]);
    if (loading) return;
    return (
        <ProtectedRoutes allowedRoles={[2]}>
            <div className={styles.container}>
                <Titulo titulo={"Tus Tickets"} subtitulo={"Gestione sus tickets"} />
                <div className={styles.tableWrapper}>
                    <table className={styles.ticketTable}>
                        <thead>
                            <tr>
                                <th>Asunto</th>
                                <th>Estado</th>
                                <th>Prioridad</th>
                                <th>Fecha</th>
                                <th>Caducidad</th>
                                <th>Asignado</th>
                                <th>Empresa</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalle.map((ticket, index) => (
                                <TicketListado ticket={ticket} index={index} key={ticket.id || index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ProtectedRoutes>
    );
}