'use client'
import { useEffect, useContext } from "react";
import { useTickets } from '@/hooks/useTickets';
import useTitle from "@/hooks/useTitle";
import { TokenContext } from "@/context/TokenContext";
import styles from './page.module.css';
import Titulo from "@/components/Titulo/Titulo";
import TicketListadoCliente from "@/components/TicketListadoCliente/TicketListadoCliente";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";

export default function VerTicketsCliente() {
    const { userId, loading } = useContext(TokenContext);
    const { setTitulo } = useTitle();
    
    // Asegúrate de que userId sea un número válido
    const { detalle = [] } = useTickets({ id: userId, isCliente: true });
    
    useEffect(() => {
        setTitulo("Mis Tickets");
    }, [setTitulo]);

    if (loading) return null;

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div className={styles.container}>
                <Titulo titulo={"Mis Tickets"} subtitulo={"Revise el estado de sus tickets"} />
                <div className={styles.tableWrapper}>
                    <table className={styles.ticketTable}>
                        <thead>
                            <tr>
                                <th>Asunto</th>
                                <th>Estado</th>
                                <th>Prioridad</th>
                                <th>Tipo</th>
                                <th>Fecha</th>
                                <th>Asignado a</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {detalle.map((ticket, index) => (
                                <TicketListadoCliente ticket={ticket} index={index} key={ticket.id || index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ProtectedRoutes>
    );
}
