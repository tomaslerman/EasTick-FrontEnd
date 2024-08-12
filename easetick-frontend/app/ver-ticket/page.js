'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useTickets } from '@/hooks/useTickets';
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";
import TicketListado from "@/components/TicketListado/ticketListado";
import styles from './page.module.css';

export default function VerTicket() {
    const { setTitulo } = useTitle();
    const { detalle = [] } = useTickets({ id: 2 });

    useEffect(() => {
        setTitulo("Tickets");
    }, [setTitulo]);

    return (
        <div>
            <Titulo titulo={"Tus Tickets"} subtitulo={"Gestione sus tickets"} />
            <table className={styles.ticketTable}>
                <thead>
                    <tr className={styles.ticketHeader}>
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
                        <TicketListado ticket={ticket} index={index} key={index} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
