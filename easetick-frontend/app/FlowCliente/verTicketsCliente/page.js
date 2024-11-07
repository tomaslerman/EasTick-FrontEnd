'use client'
import { useEffect, useContext, useState, useCallback } from "react";
import { useTickets } from '@/hooks/useTickets';
import useTitle from "@/hooks/useTitle";
import { TokenContext } from "@/context/TokenContext";
import styles from './page.module.css';
import Titulo from "@/components/Titulo/Titulo";
import TicketListadoCliente from "@/components/TicketListadoCliente/TicketListadoCliente";
import { ProtectedRoutes } from "@/app/utils/ProtectedRoutes";
import FiltroTickets from "@/components/FiltroTickets/FiltroTickets";

export default function VerTicketsCliente() {
    const { userId, loading } = useContext(TokenContext);
    const { setTitulo } = useTitle();
    const { detalle = [] } = useTickets({ id: userId, isCliente: true });
    const [ticketsFiltrados, setTicketsFiltrados] = useState([]);
    
    useEffect(() => {
        if (detalle.length > 0) {
            setTicketsFiltrados(detalle);
        }
    }, [detalle]);

    const handleFiltroChange = useCallback(({ estado, prioridad }) => {
        setTicketsFiltrados(prevTickets => {
            let resultados = [...detalle];
            
            if (estado && estado !== 'todos') {
                resultados = resultados.filter(ticket => 
                    ticket.estado?.nombre === estado
                );
            }
            
            if (prioridad && prioridad !== 'todos') {
                resultados = resultados.filter(ticket => 
                    ticket.prioridad?.nombre === prioridad
                );
            }
            
            return resultados;
        });
    }, [detalle]);

    useEffect(() => {
        setTitulo("Mis Tickets");
    }, [setTitulo]);

    if (loading) return null;

    return (
        <ProtectedRoutes allowedRoles={[1]}>
            <div className={styles.container}>
                <Titulo titulo={"Mis Tickets"} subtitulo={"Revise el estado de sus tickets"} />
                <FiltroTickets onFilterChange={handleFiltroChange} />
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
                            {ticketsFiltrados.map((ticket, index) => (
                                <TicketListadoCliente ticket={ticket} index={index} key={ticket.id || index} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </ProtectedRoutes>
    );
}
