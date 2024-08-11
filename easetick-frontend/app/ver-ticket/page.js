'use client'
import Titulo from "@/components/Titulo/Titulo";
import { useTickets } from '@/hooks/useTickets';
import { useEffect } from "react";
import useTitle from "@/hooks/useTitle";

export default function VerTicket() {
    const { setTitulo } = useTitle();
    const { detalle = [] } = useTickets({ id: 2 }); // Asegúrate de pasar el ID correcto

    useEffect(() => {
        setTitulo("Tickets");
    }, [setTitulo]);

    useEffect(() => {
        console.log("Tickets asignados:", detalle);
    }, [detalle]);

    return (
        <div>
            <Titulo titulo={"Tus Tickets"} subtitulo={"Gestione sus tickets"} />
            <div>
                { (
                    detalle.map((ticket, index) => (
                        <div key={index} className="ticketRow">
                            <h2>{ticket.asunto}</h2>
                            <p>Estado: {ticket.estado.nombre}</p>
                            <p>Prioridad: {ticket.prioridad.nombre}</p>
                            <p>Tiempo de Respuesta: {ticket.fechacreacion}</p>
                            <p>Días de Vencimiento: {ticket.prioridad.caducidad}</p>
                            <p>Asignado a: {ticket.usuario.nombre}</p>
                            <a href={ticket.link}>Ver detalles</a>
                            <hr />
                        </div>
                    ))
                ) 
              }
            </div>
        </div>
    );
}
